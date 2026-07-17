import { describe, it, expect } from 'vitest';
import { analyzeJD, extractYearsRequired } from './analyze';

const SDET_JD = `
We are looking for an SDET / Automation Engineer with strong Java and Appium experience.
Required: Selenium, Appium, CI/CD (GitHub Actions), 3+ years of experience in test automation.
Nice to have: Playwright, Docker, Gemini AI or other AI-assisted testing tools.
`;

const UNRELATED_JD = `
We need a professional chef with 5+ years experience in French cuisine and kitchen management.
Must have: knife skills, menu planning, food safety certification.
`;

const FRONTEND_JD = `
Frontend Engineer needed. Required: JavaScript, TypeScript, React, CSS.
Nice to have: testing experience with Cypress or Playwright.
`;

describe('analyzeJD', () => {
  it('scores a strong SDET match highly', () => {
    const result = analyzeJD(SDET_JD);
    expect(result.roleType).toBe('sdet');
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.grade).not.toBe('Stretch');
    const java = result.matches.find((m) => m.skill.id === 'Java');
    expect(java?.strength).toBe('required');
  });

  it('does not false-positive match "js" inside unrelated words', () => {
    const jd = 'We need someone who is happy to enjoy the job, json parsing is a plus.';
    const result = analyzeJD(jd);
    const javascript = result.matches.find((m) => m.skill.id === 'JavaScript');
    // "json" contains "js" but must not count as a JavaScript match
    expect(javascript).toBeUndefined();
  });

  it('does not false-positive match "py" inside "happy"', () => {
    const jd = 'The team is happy and productive, please apply if interested.';
    const result = analyzeJD(jd);
    const python = result.matches.find((m) => m.skill.id === 'Python');
    expect(python).toBeUndefined();
  });

  it('gives a low/stretch score for a wholly unrelated job description', () => {
    const result = analyzeJD(UNRELATED_JD);
    expect(result.score).toBeLessThan(40);
  });

  it('extracts years of experience requirement', () => {
    expect(extractYearsRequired('Looking for 3+ years of experience')).toBe(3);
    expect(extractYearsRequired('5 years experience required')).toBe(5);
    expect(extractYearsRequired('no years mentioned here')).toBeNull();
  });

  it('detects frontend role type and reweights accordingly', () => {
    const result = analyzeJD(FRONTEND_JD);
    expect(result.roleType).toBe('frontend');
  });

  it('surfaces gaps only within categories the JD actually touches', () => {
    const result = analyzeJD(SDET_JD);
    const gapCategories = new Set(result.gaps.map((g) => g.skill.category));
    const matchedCategories = new Set(result.matches.map((m) => m.skill.category));
    gapCategories.forEach((c) => expect(matchedCategories.has(c)).toBe(true));
  });
});
