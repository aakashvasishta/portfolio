# Data-Visualization Portfolio — Build Brief

A handoff spec for **Claude Code**. Goal: a React portfolio that proves **Aakash Vasishta** is an
excellent data-visualization analyst, targeting **Data Analyst roles**. Strategy: rebuild Aakash's
real, resume-backed projects as rich, interactive case studies — so the portfolio is authentic
(everything ties to work he actually did) *and* shows off a wide range of chart types and
interaction levels. The site itself also demonstrates React/D3/Plotly frontend skill that goes
beyond the Tableau on his resume.

---

## 1. Positioning & success criteria

- **Candidate strengths to foreground (from resume):** translating complex data into decisions for
  **non-technical stakeholders**, building **KPI frameworks**, root-cause analysis, and shipping
  dashboards business users can act on "without analyst support."
- **What it must prove:** (a) breadth of viz techniques, (b) turning messy real data into a clear
  narrative, (c) clean, fast, accessible frontend engineering.
- **Tone:** "fancy *and* educational." Every chart sits in a short narrative — **Question → Data →
  Method → Chart → Takeaway** — with a caption and a one-line insight. No naked charts.
- **Authenticity rule:** case studies are based on Aakash's actual projects. Where the original
  dataset isn't public, regenerate realistic data matching the described scale (see §6) and say so
  plainly. Never imply fabricated results are real outcomes.

## 2. Tech stack (locked)

- **Shell:** React 18 + **Vite** + TypeScript, **React Router**.
- **Styling:** Tailwind CSS. Read `/mnt/skills/public/frontend-design/SKILL.md` before writing UI.
- **Charting — right tool per job (using all three is part of the pitch):**
  - **Recharts** → standard charts (bar, line, area, scatter, Pareto, KPI sparklines). Default.
  - **Plotly (react-plotly.js)** → interactive scientific/analytic charts (heatmaps, box/violin,
    funnel, sankey, 3D) where hover/zoom/select matter out of the box.
  - **D3** → bespoke charts with no good default (cohort heatmap, slope chart, force network,
    brushable timeline, custom KPI scorecard).
- **Data:** static CSV/JSON in `/public/data`, parsed with **papaparse**. No backend.
- **Deploy:** Vercel (include working build config).

> The portfolio doubles as proof Aakash can do code-driven viz, not just Tableau — worth saying
> once on the About page.

## 3. Site architecture

```
/                     Hero + headline stats + featured case-study cards
/work                 Grid of all case studies (filter by technique tag)
/work/:slug           Individual case study (narrative + 4–7 charts)
/dashboard            One live, fully interactive multi-panel dashboard
/about                Bio, skills matrix, tech badges, contact, resume link
```

- Persistent nav + footer, dark-mode toggle. Charts interleaved in narrative, each captioned.

## 4. Case studies (grounded in the resume)

Four real-project studies that escalate in interactivity, plus an optional fifth for range.

### CS1 — E-Commerce Revenue & Customer Segmentation *(static → light interaction)*
*From resume: "Mined a 50,000+ transaction dataset… 20% of customers drive 80% of revenue."*
- **Story:** where revenue concentrates and which customer segments to prioritize.
- **Charts:** **Pareto chart** (80/20, Recharts) · **RFM segmentation bubble scatter**
  (recency/frequency/monetary, Plotly hover) · **Cohort retention heatmap** (D3) ·
  **Revenue treemap** by category (Plotly) · **Brushable revenue timeline** (D3).
- **Tags:** segmentation, Pareto, cohort, geospatial-optional.

### CS2 — HR Attrition Analytics *(interactive)*
*From resume: "attrition data across 1,400+ employee records… interactive dashboard… act without
analyst support."* This is the headline study — directly matches a delivered dashboard.
- **Story:** what drives churn (tenure, department, compensation, satisfaction) and who's at risk.
- **Charts:** **Churn-driver small multiples** (bar grid by dept/tenure/comp, Recharts) ·
  **Employee survival / tenure-to-attrition curves** (Kaplan–Meier style, Recharts/D3) ·
  **Satisfaction box + jitter** by outcome (Plotly) · **Driver correlation heatmap** (Plotly) ·
  **Risk-scored table** with inline sparklines (D3).
- **Tags:** statistical viz, survival, dashboard-ready.

### CS3 — Product Funnel & Engagement Teardown *(interactive)*
*From resume: product strategy teardown + Corizo "engagement drop-off in the learner journey."*
- **Story:** where users fall out of the journey and which fixes move the North Star metric.
- **Charts:** **Conversion funnel / drop-off** (Plotly) · **Sankey of user-journey paths**
  (Plotly/D3) · **North Star + supporting-KPI scorecard** (custom D3/React) ·
  **Engagement cohort curves** (Recharts) · **Before/after impact slope chart** for proposed fixes (D3).
- **Tags:** funnel, flow, KPI design.

### CS4 — Education Program Outcomes *(static → interactive)*
*From resume: current fellowship — "500+ students across 3 programs… intervention planning."*
- **Story:** comparing program outcomes and targeting student interventions.
- **Charts:** **Grouped/stacked program comparison** (Recharts) · **Intervention before/after slope
  chart** (D3) · **Outcome distribution by program** (Plotly violin/box) ·
  **Student-segment scatter** for at-risk flagging (Plotly).
- **Tags:** comparison, distributions, segmentation.

### CS5 (optional) — Range piece
One stretch study to show domain adaptability. Two options to pick from:
- **(a) Scientific-data demo** (lightweight genomics/biology with clearly-labeled synthetic data) —
  use this *only if* still targeting a bio lab; keep it honest about being a skills demo.
- **(b) Public-dataset deep dive** (e.g., climate, census, or public-health open data) — usually the
  safer "breadth" signal since it uses real, verifiable data.

### The `/dashboard` page *(full dashboard)*
Promote **CS2 (HR attrition)** into a live "Workforce Risk Explorer": global controls (department
filter, tenure range slider, comp-band selector) drive **3–4 linked panels** (filtered driver
chart, dynamic survival curve, KPI tiles, at-risk table). This is the cross-filtering showpiece and
maps cleanly to a dashboard Aakash already described shipping.

## 5. Chart inventory (quick reference)

| # | Chart | Library | Where | Interactivity |
|---|-------|---------|-------|---------------|
| 1 | Pareto (80/20) | Recharts | CS1 | static |
| 2 | RFM segmentation bubble | Plotly | CS1 | hover |
| 3 | Cohort retention heatmap | D3 | CS1 | hover |
| 4 | Revenue treemap | Plotly | CS1 | drilldown |
| 5 | Brushable revenue timeline | D3 | CS1 | brush |
| 6 | Churn-driver small multiples | Recharts | CS2 | static |
| 7 | Survival / tenure curves | Recharts/D3 | CS2 | hover |
| 8 | Satisfaction box + jitter | Plotly | CS2 | hover |
| 9 | Driver correlation heatmap | Plotly | CS2 | hover |
| 10 | Risk-scored table + sparklines | D3 | CS2 | sort |
| 11 | Conversion funnel | Plotly | CS3 | hover |
| 12 | User-journey Sankey | Plotly/D3 | CS3 | hover |
| 13 | KPI scorecard | D3/React | CS3 | live |
| 14 | Engagement cohort curves | Recharts | CS3 | hover |
| 15 | Before/after slope chart | D3 | CS3 | static |
| 16 | Program comparison bars | Recharts | CS4 | static |
| 17 | Intervention slope chart | D3 | CS4 | hover |
| 18 | Outcome violin/box | Plotly | CS4 | hover |
| 19 | At-risk student scatter | Plotly | CS4 | select |
| 20–23 | Linked dashboard panels | mixed | /dashboard | cross-filter |

~20+ visualizations across 3 libraries and 3 interactivity tiers, all tied to real projects.

## 6. Data strategy

The original datasets aren't public, so write **`scripts/generate-data.ts`** (seeded RNG,
reproducible) that synthesizes data matching each project's described scale — 50k+ transactions,
1,400 employee records, etc. — with realistic distributions (Pareto-shaped revenue, attrition
correlated with tenure/comp, funnel decay). Each case study carries a short honest note: *"Dataset
regenerated to match the original project's scale; figures are illustrative."* Leave a clean seam to
drop in real exports later.

## 7. Design system

- Read `/mnt/skills/public/frontend-design/SKILL.md`; choose an intentional, non-template look.
- Colorblind-safe palette (Okabe-Ito / Viridis), one restrained accent.
- One clean sans for UI + a mono for data labels; generous whitespace.
- **Shared chart theme module** so Recharts, Plotly, and D3 all match (fonts, grid weight,
  tooltips) — that consistency is itself a portfolio signal.
- Responsive (stack panels on mobile) + accessible (aria labels, keyboard controls, contrast).

## 8. Suggested folder structure

```
src/
  components/charts/   # one wrapper per chart type, consistent props
  components/layout/   # nav, footer, page shell
  components/ui/       # buttons, tags, cards, toggle
  data/                # loaders + typed schemas
  case-studies/        # narrative per study (mdx or tsx)
  pages/
  theme/               # shared chart + tailwind theme
public/data/           # generated datasets
scripts/generate-data.ts
```

## 9. Build phases (sequence for Claude Code)

1. **Scaffold** — Vite + TS + Tailwind + Router; nav/footer/shell; deploy a "hello" build.
2. **Design system** — theme module, shared chart wrappers, dark mode, one sample chart end-to-end.
3. **Data** — `generate-data.ts`; datasets to `/public/data`; typed loaders.
4. **Case studies** — CS1→CS4 one at a time, each fully done before the next.
5. **Dashboard** — the linked Workforce Risk Explorer with cross-filtering.
6. **Polish** — responsive, a11y, lazy-load Plotly/D3, SEO meta, deploy.

Ship something deployable at the end of every phase.

---

## 10. Kickoff prompt to paste into Claude Code

> Build a React + Vite + TypeScript data-visualization portfolio per the attached
> `PORTFOLIO_BRIEF.md`. Start with **Phase 1 (scaffold)** only and stop for my review before
> Phase 2. Use Tailwind, React Router, Recharts, react-plotly.js, and D3. Read the
> `frontend-design` skill before writing UI. Keep each charting library behind a consistent
> wrapper component. After scaffolding, give me an `npm run dev` showing the nav, footer, and a
> placeholder home page.
