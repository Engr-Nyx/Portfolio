import { SKILLS, CATEGORIES, ROLE_CATEGORY_WEIGHTS, detectRoleType, type SkillCategory, type SkillDef } from './skills';

export type GradeBand = 'Strong fit' | 'Good fit' | 'Partial fit' | 'Stretch';

export interface SkillMatch {
  skill: SkillDef;
  matched: boolean;
  /** How strongly the JD emphasized this skill: required > preferred > mentioned. */
  strength: 'required' | 'preferred' | 'mentioned' | 'none';
  mentions: number;
  matchedPhrase?: string;
}

export interface CategoryBreakdown {
  category: SkillCategory;
  score: number; // 0-100
  matched: number;
  relevant: number;
}

export interface AnalysisResult {
  score: number; // 0-100 overall
  grade: GradeBand;
  roleType: string;
  yearsRequired: number | null;
  categories: CategoryBreakdown[];
  matches: SkillMatch[];
  gaps: SkillMatch[];
  highlightedTerms: string[];
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Builds a word/phrase-boundary regex so "js" doesn't match inside "json". */
function boundaryRegex(phrase: string): RegExp {
  const normalized = escapeRegExp(phrase).replace(/[\s/-]+/g, '[\\s/-]+');
  return new RegExp(`(?<![a-z0-9])${normalized}(?![a-z0-9])`, 'gi');
}

const REQUIRED_CONTEXT = /\b(required|must have|must-have|requirement|need to have|essential|mandatory|minimum qualification)\b/i;
const PREFERRED_CONTEXT = /\b(nice to have|nice-to-have|preferred|plus|bonus|a plus|good to have|advantageous|desirable)\b/i;

function contextWindow(text: string, index: number, radius = 90): string {
  return text.slice(Math.max(0, index - radius), Math.min(text.length, index + radius));
}

function classifyStrength(text: string, matchIndices: number[]): SkillMatch['strength'] {
  if (matchIndices.length === 0) return 'none';
  let sawPreferred = false;
  for (const idx of matchIndices) {
    const window = contextWindow(text, idx);
    if (REQUIRED_CONTEXT.test(window)) return 'required';
    if (PREFERRED_CONTEXT.test(window)) sawPreferred = true;
  }
  return sawPreferred ? 'preferred' : 'mentioned';
}

const STRENGTH_MULTIPLIER: Record<SkillMatch['strength'], number> = {
  required: 1.5,
  preferred: 1.1,
  mentioned: 1,
  none: 0,
};

export function extractYearsRequired(jd: string): number | null {
  const match = jd.match(/(\d+)\+?\s*(?:to\s*\d+\s*)?(?:years?|yrs?)\s*(?:of\s*)?experience/i);
  return match ? parseInt(match[1], 10) : null;
}

export function highlightMatches(jd: string, skills: SkillDef[]): string[] {
  const terms = new Set<string>();
  for (const skill of skills) {
    for (const alias of skill.aliases) {
      const re = boundaryRegex(alias);
      const found = jd.match(re);
      if (found) found.forEach((f) => terms.add(f));
    }
  }
  return Array.from(terms);
}

export function analyzeJD(jdText: string): AnalysisResult {
  const jdLower = jdText.toLowerCase();
  const roleType = detectRoleType(jdLower);
  const categoryWeights = ROLE_CATEGORY_WEIGHTS[roleType] ?? {};
  const yearsRequired = extractYearsRequired(jdText);

  const matches: SkillMatch[] = SKILLS.map((skill) => {
    let mentions = 0;
    let matchedPhrase: string | undefined;
    const indices: number[] = [];

    for (const alias of skill.aliases) {
      const re = boundaryRegex(alias);
      let m: RegExpExecArray | null;
      while ((m = re.exec(jdLower)) !== null) {
        mentions++;
        indices.push(m.index);
        if (!matchedPhrase) matchedPhrase = m[0];
      }
    }

    const strength = classifyStrength(jdLower, indices);

    return {
      skill,
      matched: mentions > 0,
      strength,
      mentions,
      matchedPhrase,
    };
  });

  // Only skills the JD actually references count toward the denominator —
  // scoring against the whole taxonomy would punish niche JDs unfairly.
  const relevantMatches = matches.filter((m) => m.matched);

  let earnedPoints = 0;
  let possiblePoints = 0;

  for (const m of relevantMatches) {
    const categoryMult = categoryWeights[m.skill.category] ?? 1;
    const weight = m.skill.weight * categoryMult * STRENGTH_MULTIPLIER[m.strength];
    possiblePoints += m.skill.weight * categoryMult * STRENGTH_MULTIPLIER.required;
    earnedPoints += weight;
  }

  const score = possiblePoints > 0 ? Math.round(Math.min(100, (earnedPoints / possiblePoints) * 100)) : 0;

  const grade: GradeBand = score >= 80 ? 'Strong fit' : score >= 60 ? 'Good fit' : score >= 40 ? 'Partial fit' : 'Stretch';

  const categories: CategoryBreakdown[] = CATEGORIES.map((category) => {
    const inCategory = relevantMatches.filter((m) => m.skill.category === category);
    const matchedCount = inCategory.filter((m) => m.matched).length;
    const relevant = inCategory.length;
    const catScore =
      relevant > 0
        ? Math.round(
            (inCategory.reduce((sum, m) => sum + m.skill.weight * STRENGTH_MULTIPLIER[m.strength], 0) /
              inCategory.reduce((sum, m) => sum + m.skill.weight * STRENGTH_MULTIPLIER.required, 0)) *
              100
          )
        : 0;
    return { category, score: Math.min(100, catScore), matched: matchedCount, relevant };
  }).filter((c) => c.relevant > 0);

  const gaps = matches.filter((m) => !m.matched && SKILLS.find((s) => s.id === m.skill.id));
  // Only surface gaps that the JD is likely to actually care about: skills in
  // categories the JD already touched, ranked by weight.
  const touchedCategories = new Set(relevantMatches.map((m) => m.skill.category));
  const relevantGaps = gaps
    .filter((g) => touchedCategories.has(g.skill.category))
    .sort((a, b) => b.skill.weight - a.skill.weight)
    .slice(0, 6);

  const highlightedTerms = highlightMatches(jdText, SKILLS);

  return {
    score,
    grade,
    roleType,
    yearsRequired,
    categories,
    matches: relevantMatches,
    gaps: relevantGaps,
    highlightedTerms,
  };
}

export function formatSummaryReport(result: AnalysisResult): string {
  const lines: string[] = [];
  lines.push(`JD Fit Analysis — Ramon Tomaquin`);
  lines.push(`Overall: ${result.score}% (${result.grade})`);
  if (result.yearsRequired) lines.push(`JD requests ${result.yearsRequired}+ years of experience`);
  lines.push('');
  lines.push('Category breakdown:');
  result.categories.forEach((c) => lines.push(`  - ${c.category}: ${c.score}% (${c.matched}/${c.relevant} relevant skills)`));
  lines.push('');
  lines.push('Matched skills:');
  result.matches.forEach((m) => lines.push(`  - ${m.skill.id}${m.strength === 'required' ? ' [required]' : ''}`));
  if (result.gaps.length > 0) {
    lines.push('');
    lines.push('Gaps / talking points:');
    result.gaps.forEach((g) => {
      const adj = g.skill.adjacentTo?.length ? ` (adjacent experience: ${g.skill.adjacentTo.join(', ')})` : '';
      lines.push(`  - ${g.skill.id}${adj}`);
    });
  }
  return lines.join('\n');
}
