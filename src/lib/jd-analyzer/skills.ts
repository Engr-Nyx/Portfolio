export type SkillCategory =
  | 'Languages'
  | 'Automation & QA'
  | 'CI/CD & DevOps'
  | 'Cloud & Platforms'
  | 'AI Tooling'
  | 'Process & Soft Skills';

export interface SkillDef {
  id: string;
  category: SkillCategory;
  /** Core skills carry more weight than secondary/nice-to-have tooling. */
  weight: 1 | 2 | 3;
  /** Literal phrases/aliases to match, checked as whole words/phrases. */
  aliases: string[];
  /** Shown in the results UI to give recruiters real context, not just a checkmark. */
  proficiencyNote: string;
  /** Suggested when this skill is missing but a close relative was matched. */
  adjacentTo?: string[];
}

export const SKILLS: SkillDef[] = [
  // Languages
  { id: 'Java', category: 'Languages', weight: 3, aliases: ['java', 'jdk', 'jvm'], proficiencyNote: '4+ yrs — Appium/Selenium automation at Waze & Globe Telecom' },
  { id: 'Python', category: 'Languages', weight: 2, aliases: ['python'], proficiencyNote: 'Backend APIs & Odoo development (WeSupport)' },
  { id: 'TypeScript', category: 'Languages', weight: 3, aliases: ['typescript'], proficiencyNote: 'Playwright frameworks & cross-platform mobile automation (Xcel Energy)' },
  { id: 'JavaScript', category: 'Languages', weight: 2, aliases: ['javascript', 'es6', 'ecmascript'], proficiencyNote: 'Core scripting across all automation frameworks' },
  { id: 'SQL', category: 'Languages', weight: 1, aliases: ['sql', 'postgresql', 'postgres', 'mysql'], proficiencyNote: 'PostgreSQL — Odoo ERP data layer' },
  { id: 'Bash/Shell', category: 'Languages', weight: 1, aliases: ['bash', 'shell scripting', 'shell script'], proficiencyNote: 'Linux tooling & CI pipeline scripting' },

  // Automation & QA
  { id: 'Selenium', category: 'Automation & QA', weight: 3, aliases: ['selenium', 'webdriver', 'selenium grid'], proficiencyNote: '95% proficiency — primary web automation tool, Globe Telecom' },
  { id: 'Appium', category: 'Automation & QA', weight: 3, aliases: ['appium'], proficiencyNote: '92% proficiency — mobile automation for Waze/Google apps', adjacentTo: ['Selenium', 'Playwright'] },
  { id: 'Playwright', category: 'Automation & QA', weight: 3, aliases: ['playwright'], proficiencyNote: 'Built AI-powered Playwright framework with Allure reporting', adjacentTo: ['Selenium', 'Cypress'] },
  { id: 'WebdriverIO', category: 'Automation & QA', weight: 1, aliases: ['webdriverio', 'wdio'], proficiencyNote: 'Familiar — WebDriver protocol experience via Selenium/Appium' },
  { id: 'Cypress', category: 'Automation & QA', weight: 1, aliases: ['cypress'], proficiencyNote: 'Not directly used — closest experience is Playwright & Selenium' },
  { id: 'Karate', category: 'Automation & QA', weight: 2, aliases: ['karate framework', 'karate'], proficiencyNote: 'API validation framework — Xcel Energy (Accenture)' },
  { id: 'API Testing', category: 'Automation & QA', weight: 3, aliases: ['api testing', 'rest api', 'rest assured', 'postman', 'api automation', 'restful'], proficiencyNote: 'REST API validation with Karate & Playwright' },
  { id: 'Mobile Testing', category: 'Automation & QA', weight: 3, aliases: ['mobile testing', 'mobile automation', 'ios testing', 'android testing', 'cross-platform mobile'], proficiencyNote: 'iOS/Android automation via Appium & Digital.ai device farm' },
  { id: 'Perfecto', category: 'Automation & QA', weight: 1, aliases: ['perfecto'], proficiencyNote: 'Cloud device testing — Globe Telecom' },
  { id: 'Digital.ai', category: 'Automation & QA', weight: 1, aliases: ['digital.ai', 'device farm', 'see-test', 'seetest'], proficiencyNote: 'Cross-device farm testing — Waze/Google' },
  { id: 'Performance Testing', category: 'Automation & QA', weight: 1, aliases: ['performance testing', 'load testing', 'stress testing', 'jmeter'], proficiencyNote: 'Load/stress testing — Globe Telecom' },
  { id: 'Test Planning', category: 'Automation & QA', weight: 2, aliases: ['test planning', 'test strategy', 'test case design', 'test plan'], proficiencyNote: 'Authored comprehensive test plans & schedules end-to-end' },
  { id: 'Defect Management', category: 'Automation & QA', weight: 1, aliases: ['jira', 'defect management', 'bug tracking', 'root cause analysis'], proficiencyNote: 'JIRA defect documentation & root-cause analysis, Xcel Energy' },
  { id: 'Visual Testing', category: 'Automation & QA', weight: 1, aliases: ['visual testing', 'visual regression', 'image recognition', 'computer vision'], proficiencyNote: 'Gemini AI-powered visual/image verification, Waze' },

  // CI/CD & DevOps
  { id: 'CI/CD', category: 'CI/CD & DevOps', weight: 3, aliases: ['ci/cd', 'ci cd', 'continuous integration', 'continuous delivery', 'continuous deployment', 'pipeline'], proficiencyNote: 'Built and maintained pipelines across GitHub Actions, GitLab CI, Kokoro/Fusion' },
  { id: 'GitHub Actions', category: 'CI/CD & DevOps', weight: 2, aliases: ['github actions'], proficiencyNote: 'Full CI/CD pipeline for personal AI-powered framework' },
  { id: 'GitLab CI', category: 'CI/CD & DevOps', weight: 1, aliases: ['gitlab ci', 'gitlab'], proficiencyNote: 'Automated pipeline integration — Xcel Energy' },
  { id: 'Jenkins', category: 'CI/CD & DevOps', weight: 1, aliases: ['jenkins'], proficiencyNote: 'Familiar via equivalent pipeline tooling (Kokoro, GitHub Actions)' },
  { id: 'Docker', category: 'CI/CD & DevOps', weight: 1, aliases: ['docker', 'container', 'containerization'], proficiencyNote: 'Working familiarity — containerized test execution' },
  { id: 'Kubernetes', category: 'CI/CD & DevOps', weight: 1, aliases: ['kubernetes', 'k8s'], proficiencyNote: 'Conceptual familiarity, not primary daily tool' },
  { id: 'Git', category: 'CI/CD & DevOps', weight: 2, aliases: ['git', 'version control'], proficiencyNote: 'Daily use across all roles' },
  { id: 'Linux', category: 'CI/CD & DevOps', weight: 1, aliases: ['linux', 'unix'], proficiencyNote: 'Server management & CLI-driven test environments' },

  // Cloud & Platforms
  { id: 'Cloud Testing', category: 'Cloud & Platforms', weight: 1, aliases: ['lambdatest', 'browserstack', 'sauce labs', 'cloud testing', 'cloud device'], proficiencyNote: 'Cloud grid execution — LambdaTest framework project' },
  { id: 'Odoo/ERP', category: 'Cloud & Platforms', weight: 1, aliases: ['odoo', 'erp'], proficiencyNote: 'ERP backend & frontend development, WeSupport' },

  // AI Tooling
  { id: 'AI-Assisted Testing', category: 'AI Tooling', weight: 3, aliases: ['ai testing', 'gemini', 'openai', 'llm', 'ai-powered testing', 'ai-driven testing', 'artificial intelligence', 'chatgpt', 'generative ai'], proficiencyNote: 'Gemini AI visual verification (Waze) + OpenAI-integrated Playwright framework' },
  { id: 'Prompt Engineering', category: 'AI Tooling', weight: 1, aliases: ['prompt engineering'], proficiencyNote: 'Applied via OpenAI-integrated test generation workflows' },

  // Process & Soft Skills
  { id: 'Agile/Scrum', category: 'Process & Soft Skills', weight: 2, aliases: ['agile', 'scrum', 'sprint'], proficiencyNote: 'Agile Scrum delivery — Xcel Energy (Accenture)' },
  { id: 'Cross-functional Collaboration', category: 'Process & Soft Skills', weight: 1, aliases: ['cross-functional', 'stakeholder', 'client liaison', 'collaboration'], proficiencyNote: 'Primary technical/client liaison, WeSupport' },
];

export function skillById(id: string): SkillDef | undefined {
  return SKILLS.find((s) => s.id === id);
}

export const CATEGORIES: SkillCategory[] = [
  'Languages',
  'Automation & QA',
  'CI/CD & DevOps',
  'Cloud & Platforms',
  'AI Tooling',
  'Process & Soft Skills',
];

/** Category weight multipliers applied when the JD signals a given role type. */
export const ROLE_CATEGORY_WEIGHTS: Record<string, Partial<Record<SkillCategory, number>>> = {
  sdet: { 'Automation & QA': 1.3, 'CI/CD & DevOps': 1.15, Languages: 1.1 },
  qa: { 'Automation & QA': 1.35, 'Process & Soft Skills': 1.1 },
  frontend: { Languages: 1.2, 'Automation & QA': 0.85 },
  backend: { Languages: 1.15, 'Cloud & Platforms': 1.1, 'Automation & QA': 0.85 },
  fullstack: { Languages: 1.15 },
  general: {},
};

export function detectRoleType(jdLower: string): keyof typeof ROLE_CATEGORY_WEIGHTS {
  if (/\bsdet\b|software development engineer in test/.test(jdLower)) return 'sdet';
  if (/\bqa\b|quality assurance|test engineer|automation engineer|automation tester/.test(jdLower)) return 'qa';
  if (/full[\s-]?stack/.test(jdLower)) return 'fullstack';
  if (/front[\s-]?end/.test(jdLower)) return 'frontend';
  if (/back[\s-]?end/.test(jdLower)) return 'backend';
  return 'general';
}
