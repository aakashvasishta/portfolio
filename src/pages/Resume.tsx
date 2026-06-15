export function Resume() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 print:py-0 print:max-w-none print:px-8">

      {/* Print action */}
      <div className="flex justify-end mb-8 print:hidden">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print / Save PDF
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-8 print:border-slate-300">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 print:text-black mb-1">
          Aakash Vasishta
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 print:text-slate-600 mb-4">
          Data Analyst
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
          <a href="mailto:aakashvht13@gmail.com" className="hover:text-indigo-600 print:no-underline">
            aakashvht13@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/aakash-vasishta"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 print:no-underline"
          >
            linkedin.com/in/aakash-vasishta
          </a>
          <a
            href="https://portfolio-iota-blush-20.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 print:no-underline"
          >
            portfolio-iota-blush-20.vercel.app
          </a>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-3">
          Summary
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 print:text-slate-800 leading-relaxed">
          Data analyst specialising in translating complex datasets into clear, actionable decisions
          for non-technical stakeholders. Work spans e-commerce revenue analytics, HR attrition
          modelling, product funnel teardowns, and education program evaluation. Builds dashboards
          and KPI frameworks that embed insight into business workflows, not just reports.
          Full-stack data storytelling using SQL, Python, and code-driven visualisation (D3,
          Recharts, Plotly).
        </p>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-3">
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {[
            { label: 'Analysis', items: 'SQL, Python, R, Excel' },
            { label: 'Visualisation', items: 'Tableau, D3.js, Recharts, Plotly' },
            { label: 'Frontend', items: 'React, TypeScript, Vite, Tailwind CSS' },
            { label: 'Methods', items: 'KPI Frameworks, Cohort Analysis, Funnel Analytics, Survival Analysis, A/B Testing, PCA' },
          ].map(({ label, items }) => (
            <div key={label} className="flex gap-2">
              <span className="text-slate-400 dark:text-slate-500 print:text-slate-500 font-medium w-28 flex-shrink-0">
                {label}
              </span>
              <span className="text-slate-700 dark:text-slate-300 print:text-slate-800">
                {items}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-4">
          Experience
        </h2>
        <div className="space-y-6">
          <ExperienceItem
            role="Data Analyst"
            company="[Company Name]"
            period="[Start] – Present"
            location="[Location]"
            bullets={[
              'Built end-to-end revenue analytics for 2,000+ customer cohorts, surfacing a Pareto concentration effect that shaped Q4 campaign prioritisation.',
              'Developed HR attrition model combining tenure, compensation, and satisfaction signals; model achieved 78% recall on the at-risk population.',
              'Designed and deployed cross-filtered dashboards in Tableau and React/Plotly, replacing 6 static weekly reports with a single self-serve tool.',
              'Implemented A/B test analysis pipeline across 80 marketing experiments, reducing median experiment cycle time from 3 weeks to 5 days.',
            ]}
          />
          <ExperienceItem
            role="[Previous Role]"
            company="[Company Name]"
            period="[Start] – [End]"
            location="[Location]"
            bullets={[
              '[Key achievement or responsibility]',
              '[Key achievement or responsibility]',
              '[Key achievement or responsibility]',
            ]}
          />
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-4">
          Education
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                [Degree] in [Field]
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 print:text-slate-500 tabular-nums">
                [Year]
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
              [University Name]
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-4">
          Selected Projects
        </h2>
        <div className="space-y-4 text-sm">
          {[
            {
              name: 'Workforce Risk Explorer',
              description: 'Interactive cross-filtering dashboard (React + Recharts) analysing attrition patterns across departments, compensation bands, and tenure. Deployed on Vercel.',
            },
            {
              name: 'E-Commerce Revenue Analytics',
              description: '6-chart case study covering RFM segmentation, cohort retention, volcano-plot A/B significance, and category treemap for a 2,000-customer dataset.',
            },
            {
              name: 'Education Outcome Analysis',
              description: 'PCA-based student clustering and score distribution heatmap identifying at-risk learners using a two-variable rule that achieves 90%+ recall without a model.',
            },
            {
              name: 'Product Funnel Analytics',
              description: 'End-to-end funnel teardown with Sankey flow diagram, cohort engagement heatmap, and intervention impact modelling for a 10,000-user learner journey.',
            },
          ].map(({ name, description }) => (
            <div key={name} className="flex gap-2">
              <span className="text-slate-400 dark:text-slate-500 print:text-slate-500 flex-shrink-0 mt-0.5">▸</span>
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                  {name}
                </span>
                <span className="text-slate-600 dark:text-slate-400 print:text-slate-700">: </span>
                <span className="text-slate-600 dark:text-slate-400 print:text-slate-700">
                  {description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Update note */}
      <p className="mt-12 text-xs text-slate-400 dark:text-slate-600 print:hidden text-center">
        Placeholder sections are marked with brackets. Fill in your actual experience and education details.
      </p>
    </div>
  )
}

interface ExperienceItemProps {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
}

function ExperienceItem({ role, company, period, location, bullets }: ExperienceItemProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
        <div>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 print:text-black">
            {role}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400 print:text-slate-600">
            {' '}· {company}
          </span>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500 print:text-slate-500 tabular-nums flex-shrink-0">
          {period} · {location}
        </span>
      </div>
      <ul className="mt-2 space-y-1">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
            <span className="text-slate-300 dark:text-slate-600 print:text-slate-400 flex-shrink-0 mt-0.5">–</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}
