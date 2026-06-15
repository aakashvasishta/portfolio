/**
 * Seeded, reproducible synthetic datasets for all four case studies.
 * Run: npm run generate
 *
 * Each dataset matches the described project scale from the resume:
 * CS1 — 50,000+ transactions (represented as 2,000 customer aggregates)
 * CS2 — 1,400 employee records
 * CS3 — product funnel + engagement data
 * CS4 — 520+ student records across 3 programs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Seeded PRNG — mulberry32 (no external deps, reproducible) ───────────────
class RNG {
  private s: number
  constructor(seed: number) { this.s = seed >>> 0 }

  next(): number {
    this.s = (this.s + 0x6D2B79F5) >>> 0
    let t = Math.imul(this.s ^ (this.s >>> 15), 1 | this.s)
    t = Math.imul(t ^ (t >>> 7), 61 | t) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  int(lo: number, hi: number): number { return lo + Math.floor(this.next() * (hi - lo + 1)) }
  float(lo: number, hi: number): number { return lo + this.next() * (hi - lo) }
  bool(p: number): boolean { return this.next() < p }
  pick<T>(arr: readonly T[]): T { return arr[Math.floor(this.next() * arr.length)] }
  clamp(v: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, v)) }
  round2(v: number): number { return Math.round(v * 100) / 100 }

  normal(mean: number, sd: number): number {
    const u = Math.max(1e-10, 1 - this.next())
    const v = this.next()
    return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
  }
}

// ── Output ────────────────────────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dir, '../public/data')
mkdirSync(OUT, { recursive: true })

function write(name: string, data: unknown): void {
  const json = JSON.stringify(data, null, 2)
  writeFileSync(join(OUT, name), json)
  const kb = Math.round(Buffer.byteLength(json) / 1024)
  console.log(`  ✓  ${name}  (${kb} KB)`)
}

// ═══════════════════════════════════════════════════════════════════════════════
// CS1 — E-Commerce Revenue & Segmentation
// Resume: "mined a 50,000+ transaction dataset … 20% of customers drive 80% of revenue"
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\nCS1 — E-Commerce Revenue & Segmentation')

const CATEGORIES = [
  { name: 'Electronics',    sub: ['Smartphones', 'Laptops', 'Audio', 'Accessories'],       weight: 0.28 },
  { name: 'Clothing',       sub: ["Women's", "Men's", "Kids'", 'Footwear'],                weight: 0.22 },
  { name: 'Home & Garden',  sub: ['Furniture', 'Decor', 'Kitchen', 'Garden'],              weight: 0.16 },
  { name: 'Sports',         sub: ['Equipment', 'Apparel', 'Footwear', 'Nutrition'],        weight: 0.12 },
  { name: 'Beauty',         sub: ['Skincare', 'Haircare', 'Makeup', 'Fragrance'],          weight: 0.10 },
  { name: 'Books & Media',  sub: ['Books', 'Music', 'Movies', 'Games'],                    weight: 0.07 },
  { name: 'Toys',           sub: ['Educational', 'Action Figures', 'Outdoor', 'Games'],    weight: 0.03 },
  { name: 'Food & Gourmet', sub: ['Snacks', 'Beverages', 'Organic', 'International'],      weight: 0.02 },
] as const

const COHORT_MONTHS = ['2022-01','2022-02','2022-03','2022-04','2022-05','2022-06',
                       '2022-07','2022-08','2022-09','2022-10','2022-11','2022-12'] as const

const NUM_CUSTOMERS = 2000
const TOTAL_REVENUE = 3_200_000

{
  const r = new RNG(0xCAFEBABE)

  // Power-law revenue distribution (Pareto 80/20)
  const rawPowers = Array.from({ length: NUM_CUSTOMERS }, (_, i) =>
    Math.pow(NUM_CUSTOMERS / (i + 1), 1.05) * r.float(0.7, 1.3)
  ).sort((a, b) => b - a)

  const totalPower = rawPowers.reduce((s, v) => s + v, 0)
  const scale = TOTAL_REVENUE / totalPower

  const customers = rawPowers.map((pow, i) => {
    const total_revenue = r.round2(pow * scale)
    const decile = Math.ceil((i + 1) / (NUM_CUSTOMERS / 10))
    const orders = r.clamp(Math.round(r.normal(1.2, 0.5) * Math.pow(total_revenue / 120, 0.38)), 1, 90)
    const avg_order_value = r.round2(total_revenue / orders)

    // Recency: top customers more likely to have purchased recently
    const recencyMean = Math.max(8, 400 - i * 0.18)
    const recency_days = r.clamp(Math.round(r.normal(recencyMean, recencyMean * 0.45)), 1, 730)

    const r_score = recency_days < 30 ? 5 : recency_days < 90 ? 4 : recency_days < 180 ? 3 : recency_days < 365 ? 2 : 1
    const f_score = orders > 20 ? 5 : orders > 10 ? 4 : orders > 5 ? 3 : orders > 2 ? 2 : 1
    const m_score = total_revenue > 2000 ? 5 : total_revenue > 500 ? 4 : total_revenue > 200 ? 3 : total_revenue > 50 ? 2 : 1
    const rfm_score = r_score + f_score + m_score

    const segment =
      rfm_score >= 13                       ? 'Champions'
      : rfm_score >= 10 && r_score >= 3     ? 'Loyal'
      : rfm_score >= 9  && r_score >= 4     ? 'Potential Loyalist'
      : r_score <= 2    && rfm_score >= 8   ? 'At Risk'
      : r_score <= 1                        ? 'Lost'
      : rfm_score >= 7                      ? 'Promising'
      :                                       'Needs Attention'

    return {
      id: `C${String(i + 1).padStart(5, '0')}`,
      decile,
      total_revenue,
      orders,
      avg_order_value,
      recency_days,
      frequency: orders,
      monetary: total_revenue,
      r_score, f_score, m_score, rfm_score,
      segment,
      cohort_month: r.pick(COHORT_MONTHS),
      category_preference: r.pick(CATEGORIES).name,
    }
  })

  write('cs1-customers.json', customers)

  // Verify Pareto property
  const top20Rev = customers.slice(0, NUM_CUSTOMERS * 0.2).reduce((s, c) => s + c.total_revenue, 0)
  console.log(`     Top 20% → ${(top20Rev / TOTAL_REVENUE * 100).toFixed(1)}% of revenue (target ~80%)`)

  // Pre-aggregated Pareto data for the Pareto chart
  const paretoRows = Array.from({ length: 10 }, (_, d) => {
    const group = customers.filter(c => c.decile === d + 1)
    const rev = group.reduce((s, c) => s + c.total_revenue, 0)
    return { decile: d + 1, label: `D${d + 1}`, customers: group.length, revenue: Math.round(rev), revenue_share: r.round2(rev / TOTAL_REVENUE * 100) }
  })
  let cum = 0
  const paretoData = paretoRows.map(row => { cum += row.revenue_share; return { ...row, cumulative: r.round2(cum) } })
  write('cs1-pareto.json', paretoData)

  // Cohort retention matrix (10 cohorts × 12 periods, retention %)
  const rc = new RNG(0xDEADBEEF)
  const cohortRetention = COHORT_MONTHS.slice(0, 10).map((cohort, ci) => {
    const row: Record<string, unknown> = { cohort }
    let rate = 1.0
    for (let p = 0; p <= 11; p++) {
      if (p === 0) { row[`m${p}`] = 100; continue }
      const decay = p === 1 ? rc.float(0.57, 0.68)
                  : p <= 3  ? rc.float(0.80, 0.90)
                  :           rc.float(0.88, 0.96)
      rate *= decay
      row[`m${p}`] = +(rate * 100 + ci * 0.4).toFixed(1)
    }
    return row
  })
  write('cs1-cohort-retention.json', cohortRetention)

  // Weekly revenue timeline (104 weeks = 2 years)
  const rt = new RNG(0xFEEDFACE)
  const baseDate = new Date('2022-01-03')
  const timeline = Array.from({ length: 104 }, (_, w) => {
    const d = new Date(baseDate); d.setDate(d.getDate() + w * 7)
    const weekInYear = w % 52
    const seasonal = weekInYear >= 39 && weekInYear <= 51 ? 1.38
                   : weekInYear <= 7                       ? 0.84
                   :                                         1.0
    const trend = 1 + (w / 103) * 0.16
    const noise = rt.float(0.88, 1.12)
    const revenue = Math.round((TOTAL_REVENUE / 104) * trend * seasonal * noise)
    return { date: d.toISOString().slice(0, 10), week: w + 1, revenue, orders: Math.round(revenue / rt.float(55, 70)) }
  })
  write('cs1-revenue-timeline.json', timeline)

  // Revenue by category (treemap)
  const rcat = new RNG(0xBEEFCAFE)
  const categoryTree = {
    name: 'All Revenue',
    children: CATEGORIES.map(cat => {
      const catRev = TOTAL_REVENUE * cat.weight
      const subW = cat.sub.map(() => rcat.float(0.5, 1.5))
      const swSum = subW.reduce((s, w) => s + w, 0)
      return {
        name: cat.name,
        revenue: Math.round(catRev),
        children: cat.sub.map((sub, si) => ({ name: sub, revenue: Math.round(catRev * subW[si] / swSum) })),
      }
    }),
  }
  write('cs1-revenue-categories.json', categoryTree)
}

// ═══════════════════════════════════════════════════════════════════════════════
// CS2 — HR Attrition Analytics
// Resume: "attrition data across 1,400+ employee records"
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\nCS2 — HR Attrition Analytics')

{
  const r = new RNG(0xABCDEF01)

  const DEPTS = [
    { name: 'Engineering',        size: 250, base_attrition: 0.06 },
    { name: 'Sales',              size: 220, base_attrition: 0.15 },
    { name: 'Customer Service',   size: 220, base_attrition: 0.17 },
    { name: 'Operations',         size: 200, base_attrition: 0.12 },
    { name: 'Marketing',          size: 140, base_attrition: 0.10 },
    { name: 'Product',            size: 140, base_attrition: 0.07 },
    { name: 'Finance',            size: 120, base_attrition: 0.05 },
    { name: 'HR',                 size: 110, base_attrition: 0.09 },
  ] as const // Total = 1400

  const ROLES = ['IC', 'Senior IC', 'Team Lead', 'Manager', 'Director'] as const
  const ROLE_PROBS = [0.40, 0.30, 0.15, 0.12, 0.03]

  const employees = DEPTS.flatMap((dept, _di) => {
    const results = []
    let id = 1 + DEPTS.slice(0, _di).reduce((s, d) => s + d.size, 0)

    for (let j = 0; j < dept.size; j++, id++) {
      // Role
      let role = ROLES[0], cum = 0
      const roll = r.next()
      for (let ri = 0; ri < ROLES.length; ri++) { cum += ROLE_PROBS[ri]; if (roll < cum) { role = ROLES[ri]; break } }
      const roleIdx = ROLES.indexOf(role)

      const age = r.clamp(Math.round(r.normal(26 + roleIdx * 5, 5)), 21, 65)
      const tenure_months = r.clamp(Math.round(r.normal([18, 36, 60, 84, 120][roleIdx], [12, 20, 28, 36, 48][roleIdx])), 1, 240)
      const comp_band = r.clamp(Math.round(r.normal([2, 3, 3, 4, 5][roleIdx], 0.7)), 1, 5)
      const satisfaction = +r.clamp(r.normal(6.4, 1.9), 1, 10).toFixed(1)
      const performance = r.clamp(Math.round(r.normal(3.1, 0.9)), 1, 5)

      // Attrition probability — correlated with tenure, comp, satisfaction
      const tenureFactor = tenure_months < 12  ? 1.9
                         : tenure_months < 24  ? 1.4
                         : tenure_months < 48  ? 0.85
                         : tenure_months < 120 ? 0.90
                         :                       1.0
      const compFactor = [1.8, 1.3, 1.0, 0.70, 0.40][comp_band - 1]
      const satisfFactor = satisfaction < 5 ? 2.0 : satisfaction < 7 ? 1.3 : satisfaction < 8.5 ? 1.0 : 0.65
      const attritionProb = r.clamp(dept.base_attrition * tenureFactor * compFactor * satisfFactor, 0, 0.92)
      const attrition = r.bool(attritionProb)

      const risk_score = Math.round(r.clamp(
        (tenureFactor - 0.5) * 28 + (compFactor - 0.5) * 26 + (satisfFactor - 0.5) * 26 + r.float(-8, 8), 0, 100
      ))

      results.push({ id, department: dept.name, tenure_months, comp_band, satisfaction, performance, age, role, attrition, risk_score })
    }
    return results
  })

  const attrCount = employees.filter(e => e.attrition).length
  console.log(`     ${employees.length} employees, ${attrCount} attritions (${(attrCount / employees.length * 100).toFixed(1)}%)`)

  write('cs2-employees.json', employees)
}

// ═══════════════════════════════════════════════════════════════════════════════
// CS3 — Product Funnel & Engagement
// Resume: "engagement drop-off in the learner journey"
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\nCS3 — Product Funnel & Engagement')

{
  const r = new RNG(0x12345678)

  // Funnel — biggest drop at registration → onboarding (28%), then week-2 (31%)
  const funnelRaw = [
    { stage: 'Registration',          users: 10000 },
    { stage: 'Onboarding Complete',   users: 7200  },
    { stage: 'First Lesson',          users: 5500  },
    { stage: 'Week 2 Active',         users: 3800  },
    { stage: 'Module 1 Complete',     users: 2600  },
    { stage: 'Module 2 Complete',     users: 1800  },
    { stage: 'Assessment Passed',     users: 1200  },
    { stage: 'Certified',             users: 900   },
  ]
  const funnel = funnelRaw.map((f, i) => ({
    ...f,
    drop_off: i === 0 ? 0 : funnelRaw[i - 1].users - f.users,
    conversion_rate: i === 0 ? 1.0 : +(f.users / funnelRaw[i - 1].users).toFixed(3),
    overall_rate: +(f.users / funnelRaw[0].users).toFixed(3),
  }))
  write('cs3-funnel.json', funnel)

  // Sankey — user journey flows (source→journey→outcome)
  write('cs3-sankey.json', {
    nodes: [
      { id: 'Organic Search',  group: 'source'  },
      { id: 'Paid Ads',        group: 'source'  },
      { id: 'Referral',        group: 'source'  },
      { id: 'Active Learners', group: 'journey' },
      { id: 'Passive Viewers', group: 'journey' },
      { id: 'Certified',       group: 'outcome' },
      { id: 'Ongoing',         group: 'outcome' },
      { id: 'Dropped Out',     group: 'outcome' },
    ],
    links: [
      { source: 'Organic Search',  target: 'Active Learners', value: 3800 },
      { source: 'Organic Search',  target: 'Passive Viewers', value: 1100 },
      { source: 'Paid Ads',        target: 'Active Learners', value: 2900 },
      { source: 'Paid Ads',        target: 'Passive Viewers', value: 800  },
      { source: 'Referral',        target: 'Active Learners', value: 800  },
      { source: 'Referral',        target: 'Passive Viewers', value: 600  },
      { source: 'Active Learners', target: 'Certified',       value: 900  },
      { source: 'Active Learners', target: 'Ongoing',         value: 1300 },
      { source: 'Active Learners', target: 'Dropped Out',     value: 5300 },
      { source: 'Passive Viewers', target: 'Ongoing',         value: 420  },
      { source: 'Passive Viewers', target: 'Dropped Out',     value: 2080 },
    ],
  })

  // KPI scorecard
  write('cs3-kpis.json', {
    north_star: { name: 'Weekly Active Learners', value: 3240, target: 5000, unit: '', trend: [2820, 2890, 3010, 3100, 3180, 3240] },
    supporting: [
      { name: 'Completion Rate',   value: 0.31, target: 0.50, unit: '%',   trend: [0.24, 0.26, 0.27, 0.28, 0.30, 0.31] },
      { name: 'Avg Session (min)', value: 18.5, target: 25.0, unit: 'min', trend: [16.2, 17.0, 17.4, 17.8, 18.2, 18.5] },
      { name: 'NPS',               value: 42,   target: 60,   unit: '',    trend: [35, 37, 38, 40, 41, 42]              },
      { name: 'Wk-2 Retention',    value: 0.69, target: 0.80, unit: '%',   trend: [0.61, 0.63, 0.65, 0.66, 0.68, 0.69] },
    ],
  })

  // Engagement cohort curves (6 weekly cohorts × 12 weeks)
  const rc = new RNG(0x9ABCDEF0)
  const cohortData = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'].map((label, ci) => {
    const row: Record<string, unknown> = { cohort: label, size: rc.int(270, 360) }
    let rate = 1.0
    for (let w = 0; w <= 11; w++) {
      if (w === 0) { row[`w${w}`] = 100; continue }
      const decay = w === 1 ? rc.float(0.54, 0.67) : w <= 3 ? rc.float(0.76, 0.88) : rc.float(0.89, 0.95)
      rate *= decay
      row[`w${w}`] = +Math.min(100, rate * 100 + ci * 1.1).toFixed(1)
    }
    return row
  })
  write('cs3-cohorts.json', cohortData)

  // Before/after interventions for slope chart
  write('cs3-interventions.json', [
    { intervention: 'Smarter Onboarding',    metric: 'Onboarding Rate', before: 0.72, after: 0.84, delta_users: 1200, stage: 'Onboarding Complete' },
    { intervention: 'Week 2 Nudge Campaign', metric: 'Wk-2 Retention',  before: 0.69, after: 0.80, delta_users: 840,  stage: 'Week 2 Active'       },
    { intervention: 'Assessment Redesign',   metric: 'Pass Rate',        before: 0.67, after: 0.81, delta_users: 780,  stage: 'Assessment Passed'   },
  ])

  void r // suppress unused warning
}

// ═══════════════════════════════════════════════════════════════════════════════
// CS4 — Education Program Outcomes
// Resume: "500+ students across 3 programs … intervention planning"
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\nCS4 — Education Program Outcomes')

{
  const r = new RNG(0x87654321)

  const PROGRAMS = [
    { name: 'Science',      size: 182, completion_mean: 0.67, score_mean: 75, score_sd: 11 },
    { name: 'Mathematics',  size: 174, completion_mean: 0.78, score_mean: 81, score_sd: 9  },
    { name: 'Technology',   size: 164, completion_mean: 0.58, score_mean: 72, score_sd: 15 },
  ] as const // Total = 520

  let sid = 1

  // Pass 1: generate raw records + risk score
  type RawStudent = { program: string; completion_rate: number; assessment_score: number; sessions_attended: number; engagement_level: string; risk_score: number }
  const raw: RawStudent[] = PROGRAMS.flatMap(prog =>
    Array.from({ length: prog.size }, () => {
      const completion_rate = +r.clamp(r.normal(prog.completion_mean, 0.16), 0, 1).toFixed(2)
      const assessment_score = Math.round(r.clamp(r.normal(prog.score_mean, prog.score_sd), 38, 100))
      const sessions_attended = r.clamp(Math.round(r.normal(completion_rate * 22, 3)), 0, 24)
      const engagement_level = completion_rate > 0.75 ? 'high' : completion_rate > 0.45 ? 'medium' : 'low'
      // Risk score: higher = more at-risk (completion and score each contribute)
      const risk_score = (1 - completion_rate) * 60 + (1 - assessment_score / 100) * 40
      return { program: prog.name, completion_rate, assessment_score, sessions_attended, engagement_level, risk_score }
    })
  )

  // Pass 2: flag top 10% by risk score as at-risk, then add intervention
  const riskThreshold = [...raw].sort((a, b) => b.risk_score - a.risk_score)[Math.floor(raw.length * 0.10)].risk_score
  const students = raw.map(s => {
    const at_risk = s.risk_score >= riskThreshold
    const intervention_received = at_risk && r.bool(0.62)
    const pre_score = intervention_received ? s.assessment_score : null
    const post_score = intervention_received ? Math.round(r.clamp(s.assessment_score + r.normal(13, 5), 50, 100)) : null
    return {
      id: `S${String(sid++).padStart(4, '0')}`,
      program: s.program,
      completion_rate: s.completion_rate,
      assessment_score: s.assessment_score,
      sessions_attended: s.sessions_attended,
      engagement_level: s.engagement_level,
      at_risk,
      intervention_received,
      pre_intervention_score: pre_score,
      post_intervention_score: post_score,
    }
  })

  const atRisk = students.filter(s => s.at_risk).length
  const intervened = students.filter(s => s.intervention_received).length
  console.log(`     ${students.length} students, ${atRisk} at-risk, ${intervened} received intervention`)

  write('cs4-students.json', students)
}

console.log('\n✅  All datasets written to public/data/\n')
