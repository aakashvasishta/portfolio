// ── CS1 — E-Commerce Revenue & Segmentation ──────────────────────────────────

export interface CS1VolcanoPoint {
  id: string
  channel: string
  log2fc: number
  neg_log10_p: number
}

export interface CS1Customer {
  id: string
  decile: number
  total_revenue: number
  orders: number
  avg_order_value: number
  recency_days: number
  frequency: number
  monetary: number
  r_score: number
  f_score: number
  m_score: number
  rfm_score: number
  segment: string
  cohort_month: string
  category_preference: string
}

export interface CS1ParetoRow {
  decile: number
  label: string
  customers: number
  revenue: number
  revenue_share: number
  cumulative: number
}

export interface CS1CohortRow {
  cohort: string
  m0: number; m1: number; m2: number; m3: number; m4: number; m5: number
  m6: number; m7: number; m8: number; m9: number; m10: number; m11: number
}

export interface CS1TimelinePoint {
  date: string
  week: number
  revenue: number
  orders: number
}

export interface CS1CategoryNode {
  name: string
  revenue?: number
  children?: CS1CategoryNode[]
}

// ── CS2 — HR Attrition Analytics ─────────────────────────────────────────────

export type Role = 'IC' | 'Senior IC' | 'Team Lead' | 'Manager' | 'Director'

export interface CS2Employee {
  id: number
  department: string
  tenure_months: number
  comp_band: number
  satisfaction: number
  performance: number
  age: number
  role: Role
  attrition: boolean
  risk_score: number
}

// ── CS3 — Product Funnel & Engagement ────────────────────────────────────────

export interface CS3FunnelStage {
  stage: string
  users: number
  drop_off: number
  conversion_rate: number
  overall_rate: number
}

export interface CS3SankeyNode {
  id: string
  group: 'source' | 'journey' | 'outcome'
}

export interface CS3SankeyLink {
  source: string
  target: string
  value: number
}

export interface CS3Sankey {
  nodes: CS3SankeyNode[]
  links: CS3SankeyLink[]
}

export interface CS3KpiMetric {
  name: string
  value: number
  target: number
  unit: string
  trend: number[]
}

export interface CS3Kpis {
  north_star: CS3KpiMetric
  supporting: CS3KpiMetric[]
}

export interface CS3CohortRow {
  cohort: string
  size: number
  w0: number; w1: number; w2: number; w3: number; w4: number; w5: number
  w6: number; w7: number; w8: number; w9: number; w10: number; w11: number
}

export interface CS3Intervention {
  intervention: string
  metric: string
  before: number
  after: number
  delta_users: number
  stage: string
}

// ── CS4 — Education Program Outcomes ─────────────────────────────────────────

export type EngagementLevel = 'low' | 'medium' | 'high'

export interface CS4Student {
  id: string
  program: string
  completion_rate: number
  assessment_score: number
  sessions_attended: number
  engagement_level: EngagementLevel
  at_risk: boolean
  intervention_received: boolean
  pre_intervention_score: number | null
  post_intervention_score: number | null
}
