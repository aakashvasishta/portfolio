const skills = [
  { category: 'Analysis', items: ['SQL', 'Python', 'R', 'Excel'] },
  { category: 'Visualization', items: ['Tableau', 'D3.js', 'Recharts', 'Plotly'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
  { category: 'Methods', items: ['KPI Frameworks', 'Cohort Analysis', 'Funnel Analytics', 'Survival Analysis'] },
]

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">
        About
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-8">
        Aakash Vasishta
      </h1>

      {/* Bio */}
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-4">
          I'm a data analyst who specializes in translating complex datasets into clear,
          actionable decisions for non-technical stakeholders. My work spans e-commerce
          revenue analytics, HR attrition modeling, product funnel teardowns, and education
          program evaluation.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-4">
          I build dashboards and KPI frameworks that business users can act on without
          requiring ongoing analyst support. The goal is always to embed the insight into
          the workflow, not just the report.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          This portfolio doubles as a proof-of-concept for code-driven visualization: all
          charts are built in React with D3, Recharts, and Plotly, going beyond Tableau to
          demonstrate full-stack data storytelling.
        </p>
      </div>

      {/* Skills matrix */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Contact
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="mailto:aakashvht13@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
          </svg>
          aakashvht13@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/aakash-vasishta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
          </svg>
          LinkedIn
        </a>
        <a
          href="/resume"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
          </svg>
          Resume
        </a>
      </div>
    </div>
  )
}
