# Portfolio Redesign — Development Plan

Scope: responsive polish (320px → ultrawide), Recruiter Mode discoverability, richer bi-directional scroll animations. Stack stays as-is (React 19, Vite, Tailwind 3, GSAP + ScrollTrigger, Lenis, shadcn/radix).

---

## Phase 0 — Foundations (½ day)

Prerequisites that every later phase builds on.

1. **Tailwind config cleanup**
   - Add `xs: '475px'` screen to `tailwind.config.js` and delete the hand-rolled `xs:` media-query utilities in `index.css` (lines 128–133). Audit all `xs:` usages still resolve.
   - Add a `3xl: '1920px'` screen for ultrawide handling.
2. **Motion accessibility layer**
   - Create `src/hooks/use-reduced-motion.ts` (matchMedia `prefers-reduced-motion`).
   - Create `src/lib/animations.ts` — shared GSAP helpers: `fadeUp`, `staggerIn`, `scrubParallax`, all no-oping (or snapping to final state) when reduced motion is on. All sections migrate to these helpers instead of local `gsap.fromTo` copies.
   - Disable Lenis smooth scroll + CustomCursor when reduced motion / coarse pointer is detected.
3. **Bi-directional ScrollTrigger default**
   - Standard config: `toggleActions: 'play none none reverse'` (or `scrub` where appropriate) so animations replay when scrolling back up — this is the core of the "animate on scroll down AND up" requirement.

## Phase 1 — Recruiter Mode Highlighting (1 day)

Goal: recruiters instantly recognize the feature as an interactive tool.

1. **Button redesign (`App.tsx:69-80`)**
   - Replace the dark pill with a high-contrast gradient button (indigo→cyan, same brand gradient as CTAs) with an animated glowing border (slow rotating conic-gradient ring) so it reads as *the* accent element on the page.
   - Add label treatment: `For Recruiters` eyebrow + `Recruiter Mode →` text on ≥sm; icon-only FAB with a pulsing ring + tooltip ("Recruiter tools") on mobile, docked bottom-right above the mobile nav (current top-right placement collides with the progress bar and is thumb-unreachable).
   - Micro-interactions: magnetic hover (GSAP), pressed state, one-time "shine sweep" animation ~2s after load to draw the eye.
2. **First-visit attention nudge**
   - After the loading screen, show a small dismissible callout bubble anchored to the button ("Hiring? Try Recruiter Mode — JD matcher, resume, instant Q&A"). Persist dismissal in `localStorage` so returning visitors aren't nagged.
3. **Secondary entry points**
   - Hero: add a third ghost CTA "I'm a recruiter" that opens the panel.
   - Contact section: inline card linking to Recruiter Mode.
   - Navigation: desktop pill nav gets a distinct right-side "Recruiter" item separated by a divider.
4. **Panel (RecruiterMode.tsx) polish**
   - Responsive padding: `p-5 sm:p-8` (current `p-8 sm:p-10` is cramped at 360px); full-width sheet on mobile with a drag-to-close affordance (`vaul` drawer on <sm, Sheet on ≥sm).
   - Animate sections in with a small stagger when the sheet opens.
   - Add copy-email and LinkedIn quick actions next to the resume download.
   - JD analyzer: animate the score counting up + progress bar fill; add a "Copy summary" button producing a plain-text fit report.

## Phase 2 — Responsive Overhaul (1–2 days)

Audit and fix at 320, 375, 414, 640, 768, 1024, 1280, 1536, 1920+ widths.

1. **Hero (`Hero.tsx`)**
   - Fluid type: replace stepped `text-4xl md:text-5xl…` with `clamp()`-based sizes (e.g. `text-[clamp(1.75rem,6vw,4.5rem)]`) so the long "SOFTWARE DEVELOPMENT ENGINEER IN TEST" line never overflows at 320–380px (word spans are `nowrap` and currently can).
   - Reduce top padding on short viewports (`min-h-[100svh]`, use `svh` not `vh` for mobile browser chrome).
   - Move scroll indicator up on short screens so it doesn't overlap CTAs.
2. **About (`About.tsx`)**
   - Portrait: fluid width `w-full max-w-[300px] md:max-w-[360px] lg:max-w-[440px]` instead of fixed `w-[300px]`; guard the absolutely-positioned "Rookie of the Year" badge against clipping at narrow widths.
   - Stats grid: `grid-cols-1 xs:grid-cols-3` so numbers don't crush at 320px.
3. **Skills (`Skills.tsx`)**
   - Grid: smooth column ramp `grid-cols-3 sm:grid-cols-4 lg:grid-cols-6` with tighter mobile gaps; alternatively `auto-fill minmax(96px,1fr)`.
   - Category filter row: horizontal scroll-snap strip on mobile instead of wrapping to 3 lines.
   - Disable the infinite floating tween and 3D tilt on touch devices (perf + no hover concept); replace hover-reveal color with tap-to-highlight.
4. **Experience (`Experience.tsx`)**
   - Consolidate the duplicated timeline line (one element, `left-4 sm:left-1/2`); verify card alternation collapses cleanly to single column under `sm`.
5. **Projects (`Projects.tsx`)**
   - Add `sm:grid-cols-2` intermediate step (currently jumps 1 → `md:` 2); equalize card heights; make hover-only overlays accessible on touch (always-visible action row on mobile).
6. **Contact (`Contact.tsx`)**
   - `lg:grid-cols-2` → add `md:grid-cols-2` if content allows; ensure form inputs are ≥16px font-size to prevent iOS zoom; 44px minimum touch targets.
7. **Ultrawide (1920px+)**
   - Bump section containers to `max-w-screen-2xl 3xl:max-w-[1600px]` with scaled-up padding; extend GradientBackground blobs to fill wide viewports; consider hero side-labels appearing further inboard.
8. **Navigation (`Navigation.tsx`)**
   - Tablet gap: desktop pill nav is `hidden md:flex`, mobile bar `md:hidden` — verify pill nav fits at exactly 768px with the new Recruiter item; if tight, icon+tooltip mode at `md`, full labels at `lg`.
   - Mobile bottom bar: confirm safe-area inset & active-arc render on iOS Safari and small Androids (320px → 6 items at ~53px each is tight; consider hiding labels at <360px).

## Phase 3 — Scroll Interactivity & Animation (1–2 days)

All effects built on the Phase 0 helpers → automatically reversible on scroll-up and reduced-motion-safe.

1. **Global**
   - Section reveals: consistent fade+rise with `toggleActions: 'play none none reverse'`.
   - Scroll progress bar stays; add subtle hue shift as you progress through sections.
   - Section headings: scrubbed letter/word reveal tied to scroll position (GSAP scrub) so they animate both directions.
2. **Hero**
   - Parallax exit: title/subtitle drift up + fade with `scrub` as you scroll away; background grid and blobs move at different speeds (depth).
3. **About**
   - Portrait parallax (slower than text column); stats count-up triggered on enter, reversing to 0 is skipped (count-up replays on re-enter).
4. **Skills**
   - Replace infinite float with a scrub-linked stagger wave on entry; category filter transitions use FLIP (GSAP Flip plugin, already available in gsap) for smooth reordering.
5. **Experience**
   - Timeline line "draws" with scrub as you scroll; dots pop when their card enters; cards slide in from their respective side (reversible).
6. **Projects**
   - Cards rise with stagger + slight scale; image inner-parallax on scroll; magnetic hover on desktop.
7. **Contact**
   - Form fields cascade in; ambient gradient intensifies near page bottom.
8. **Performance guardrails**
   - Only `transform`/`opacity` animations; `will-change` applied transiently; cap simultaneous tweens on mobile; test with 6× CPU throttle in DevTools.

## Phase 4 — JD Fit Analyzer v2 (1–1.5 days)

Rebuild the analyzer in `RecruiterMode.tsx` from a naive substring check into a detailed, higher-accuracy matching engine (still fully client-side, no API cost).

1. **Skill taxonomy expansion**
   - Move `SKILL_KEYWORDS` into `src/lib/jd-analyzer/skills.ts` as a structured taxonomy: each skill gets `aliases`, `category` (Languages, Automation/QA, CI-CD, Cloud, AI/Tooling, Soft skills), `weight` (core vs. secondary), and `proficiencyNote` (e.g. "3 yrs — Waze mobile automation") for the detail view.
   - Cover the real resume surface: Appium, Selenium, Playwright, REST/API testing, Kokoro/Jenkins/GitHub Actions, Gemini AI/visual verification, SQL, Git, Agile/Scrum, test planning, defect management, etc.
2. **Accurate matching engine (`src/lib/jd-analyzer/analyze.ts`)**
   - Tokenize the JD (lowercase, strip punctuation) and match on **word boundaries**, not `includes()` — today `"js"` matches inside "json" and `"py"` inside "happy", inflating scores.
   - Multi-word phrase matching (e.g. "continuous integration", "end-to-end testing") with normalization of separators (`CI/CD`, `CI-CD`, `ci cd`).
   - Detect requirement strength from context: skills near "required/must have" vs. "nice to have/preferred/bonus" get different weights; count mention frequency as an emphasis signal.
   - Extract years-of-experience requirements (`(\d+)\+?\s*(?:years|yrs)`) and compare against actual experience per skill.
   - Detect role type (SDET/QA/frontend/backend/fullstack) from title keywords and reweight categories accordingly.
3. **Scoring model**
   - Replace the current normalized ratio (which caps out too easily) with a weighted score: `Σ(matched weight × requirement strength) / Σ(JD-relevant weight)`, so the score reflects what *the JD asks for*, not the whole skill list.
   - Output sub-scores per category plus an overall grade band (Strong fit ≥80, Good fit 60–79, Partial fit 40–59, Stretch <40) with honest copy for each band.
4. **Detailed results UI**
   - Per-category breakdown bars, not just one number; matched skills shown as chips with the `proficiencyNote` on hover/tap.
   - "Gaps & talking points" section: JD-required skills not matched, each with an adjacent/transferable-skill note where one exists (e.g. Cypress → "adjacent: Playwright, Selenium").
   - Highlight the matched keywords inline in the pasted JD (toggleable) so recruiters can verify the analysis themselves.
   - "Copy summary" (from Phase 1) upgraded to output the full detailed report; keep the animated count-up score.
5. **Verification**
   - Unit tests (`vitest`) for the engine: fixture JDs (real SDET/QA postings, one frontend, one unrelated role) asserting expected grade bands, no false positives from substrings, and correct strength/years extraction.

## Phase 5 — QA & Verification (½–1 day)

- **Viewports:** Chrome DevTools device sweep (iPhone SE 320/375, iPhone 14 Pro, Pixel 7, iPad Mini 768, iPad Pro 1024, laptop 1280/1440, desktop 1920, ultrawide 2560). Zero horizontal scroll at every width (the `overflow-x: hidden` band-aids in `index.css` should become unnecessary — keep but verify nothing depends on them masking bugs).
- **Interaction:** keyboard-only pass (focus states on nav, recruiter button, FAQ buttons); recruiter panel scroll-lock with Lenis verified both open paths (button + hero CTA).
- **Motion:** `prefers-reduced-motion: reduce` pass — page must be fully readable with animations disabled.
- **Perf:** Lighthouse mobile ≥ 90 performance; check GSAP tween counts; lazy-mount GradientBackground/three.js extras if any land.
- **Build:** `npm run build` + `vite preview`, spot-check GitHub Pages base-path assets (resume.pdf link).

---

## Sequencing & Estimates

| Phase | Effort | Depends on |
|---|---|---|
| 0 Foundations | 0.5 day | — |
| 1 Recruiter Mode | 1 day | 0 |
| 2 Responsive | 1–2 days | 0 |
| 3 Animations | 1–2 days | 0, 2 |
| 4 JD Analyzer v2 | 1–1.5 days | — (UI polish depends on 1) |
| 5 QA | 0.5–1 day | all |

Total: ~5–7.5 working days. Phases 1 and 2 can proceed in parallel; Phase 3 should land after Phase 2 so animations are tuned against final layouts. Phase 4's engine work is independent and can run in parallel with anything; its results UI should land after Phase 1's panel polish.
