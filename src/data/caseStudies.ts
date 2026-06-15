export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  chartCount: number
  highlight: string
  libraries: string[]
  accentColor: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ecommerce-revenue',
    title: 'E-Commerce Revenue & Segmentation',
    subtitle: 'Where revenue concentrates and who drives it',
    description:
      '50,000+ transaction dataset mined to reveal that 20% of customers drive 80% of revenue. Pareto curves, cohort retention heatmaps, and RFM segmentation expose exactly which segments to prioritize.',
    tags: ['Pareto', 'Cohort', 'RFM', 'Segmentation', 'Treemap'],
    chartCount: 5,
    highlight: '20% of customers → 80% of revenue',
    libraries: ['Recharts', 'D3', 'Plotly'],
    accentColor: '#56B4E9',
  },
  {
    slug: 'hr-attrition',
    title: 'HR Attrition Analytics',
    subtitle: "What drives churn and who's at risk",
    description:
      '1,400+ employee records analyzed to understand what drives attrition across tenure, department, compensation, and satisfaction. Surfaced in a dashboard non-technical managers can act on without analyst support.',
    tags: ['Survival Analysis', 'Statistical Viz', 'Dashboard', 'Risk Scoring'],
    chartCount: 5,
    highlight: 'Attrition risk modeled by tenure, comp & department',
    libraries: ['Recharts', 'Plotly', 'D3'],
    accentColor: '#E69F00',
  },
  {
    slug: 'product-funnel',
    title: 'Product Funnel & Engagement',
    subtitle: 'Where users fall out and what fixes move the metric',
    description:
      'Funnel teardown of a learner journey to identify engagement drop-off and quantify the impact of proposed interventions. KPI scorecard ties every fix back to the North Star metric.',
    tags: ['Funnel', 'Sankey', 'KPI Design', 'Before/After'],
    chartCount: 5,
    highlight: 'Quantified impact of 3 intervention scenarios',
    libraries: ['Plotly', 'D3', 'Recharts'],
    accentColor: '#009E73',
  },
  {
    slug: 'education-outcomes',
    title: 'Education Program Outcomes',
    subtitle: 'Comparing programs, targeting interventions',
    description:
      '500+ student records across 3 programs compared on completion rates and outcomes, then segmented to flag at-risk students for early intervention planning.',
    tags: ['Comparison', 'Distributions', 'Segmentation', 'Interventions'],
    chartCount: 4,
    highlight: 'At-risk student segmentation across 3 programs',
    libraries: ['Recharts', 'D3', 'Plotly'],
    accentColor: '#0072B2',
  },
]
