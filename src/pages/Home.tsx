import { Link } from 'react-router-dom'
import { caseStudies } from '../data/caseStudies'
import { CaseStudyCard } from '../components/ui/CaseStudyCard'
import { ChartFrame } from '../components/charts/ChartFrame'
import { RevenueConcentrationBar } from '../components/charts/samples/RevenueConcentrationBar'

const stats = [
  { value: '25+', label: 'Visualizations' },
  { value: '4', label: 'Case studies' },
  { value: '3', label: 'Chart libraries' },
  { value: '50K+', label: 'Transactions analyzed' },
]

export function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient decoration */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100/60 dark:bg-indigo-950/40 blur-3xl" />
          <div className="absolute top-20 -left-24 w-[400px] h-[400px] rounded-full bg-sky-100/50 dark:bg-sky-950/30 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-4 tracking-wide uppercase">
              Data Analyst Portfolio
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight tracking-tight mb-6">
              Aakash
              <br />
              Vasishta
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl">
              Turning messy, real-world data into decisions that non-technical
              teams can act on — backed by KPI frameworks, root-cause analysis,
              and dashboards built to last.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
              >
                View case studies
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors"
              >
                Live dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured insight — Phase 2 design-system demo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            Featured insight
          </p>
          <Link
            to="/work/ecommerce-revenue"
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            E-Commerce Revenue & Segmentation →
          </Link>
        </div>
        <ChartFrame
          title="Revenue concentration by customer decile"
          question="Where does revenue actually come from — and how concentrated is it?"
          method="Customer base ranked by revenue and split into 10 equal-sized groups (deciles); revenue share calculated per group."
          takeaway="The top 20% of customers generate 80% of total revenue — the canonical Pareto finding, confirmed in a 50,000+ transaction dataset."
          showDataNote
          height={280}
        >
          <RevenueConcentrationBar />
        </ChartFrame>
      </section>

      {/* Case study grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Case studies
          </h2>
          <Link
            to="/work"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </section>

      {/* Dashboard promo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          to="/dashboard"
          className="group block rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 p-8 text-center transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Workforce Risk Explorer
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            A fully interactive, cross-filtered dashboard — filter by department,
            tenure range, and comp band to drive linked panels live.
          </p>
        </Link>
      </section>
    </>
  )
}
