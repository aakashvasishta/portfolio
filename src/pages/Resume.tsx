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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 print:text-black mb-4">
          Aakash Vasishta
        </h1>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
          <span>(872) 664-2040</span>
          <a href="mailto:aakashvasishta@gmail.com" className="hover:text-indigo-600 print:no-underline">
            aakashvasishta@gmail.com
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
            href="https://github.com/aakashvasishta"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 print:no-underline"
          >
            github.com/aakashvasishta
          </a>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-3">
          Summary
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 print:text-slate-800 leading-relaxed">
          MS Computer Science graduate with experience in data science, software development, and business analysis.
          Proven ability to translate complex datasets into actionable insights for non-technical stakeholders,
          having delivered analytical frameworks across teams of 100+ users and datasets exceeding 50,000 records.
          Recognized for bridging technical and business contexts to drive informed decision-making.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-4">
          Experience
        </h2>
        <div className="space-y-6">
          <ExperienceItem
            role="Data Science Fellow"
            company="Chicago Education Advocacy Cooperative"
            period="Aug 2025 – Present"
            location="Chicago, IL"
            bullets={[
              'Led data science initiatives impacting 500+ students across 3 academic programs at an educational nonprofit.',
              'Partnered with cross-functional stakeholders to gather data requirements and streamline reporting workflows.',
              'Translated organizational challenges into analytical frameworks that directly informed program decision-making.',
              'Converted ambiguous organizational challenges into structured analytical models, equipping leadership with decision-ready insights for student intervention planning.',
            ]}
          />
          <ExperienceItem
            role="Data Science Intern"
            company="National Coaters"
            period="Jun 2023 – Aug 2023"
            location="Faridabad, India"
            bullets={[
              'Built KPI frameworks adopted by business stakeholders to track performance across 100,000+ customer records.',
              'Uncovered data-driven retention opportunities, contributing findings to a structured strategy proposal.',
              'Standardized business metrics and reporting workflows, improving consistency across cross-functional teams.',
            ]}
          />
          <ExperienceItem
            role="Software Development Intern"
            company="Corizo EduTech"
            period="Feb 2022 – May 2022"
            location="Noida, India"
            bullets={[
              'Engineered features for an educational platform serving 1,000+ students across STEM learning modules.',
              'Elicited user requirements and authored feature specifications directly adopted by the product team.',
              'Investigated engagement drop-off patterns in the learner journey, surfacing key bottlenecks for prioritization.',
            ]}
          />
          <ExperienceItem
            role="Technical Intern"
            company="Shri Kushambari Food LLP"
            period="Jun 2021 – Aug 2021"
            location="Delhi, India"
            bullets={[
              'Documented workflow pain points across 5 cross-functional teams of 100+ users, informing process redesign.',
              'Facilitated stakeholder interviews to surface communication bottlenecks and recommend targeted improvements.',
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
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-0.5">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                Illinois Institute of Technology
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 print:text-slate-500 tabular-nums">
                Aug 2023 – May 2025 · Chicago, IL
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 print:text-slate-700 italic">
              Master of Science in Computer Science
            </p>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-0.5">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                Amity University
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 print:text-slate-500 tabular-nums">
                Jul 2019 – Jun 2023 · Noida, India
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 print:text-slate-700 italic">
              Bachelor of Technology in Computer Science and Engineering
            </p>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-3">
          Technical Skills
        </h2>
        <div className="space-y-2 text-sm">
          {[
            { label: 'Languages', items: 'Python, C, C++, Java, SQL, JavaScript, TypeScript, HTML/CSS' },
            { label: 'Tools', items: 'Excel, Google Sheets, Microsoft Project, Git, Jupyter Notebook, Tableau' },
            { label: 'Concepts', items: 'Data Analysis, Requirements Gathering, KPI Tracking, Root Cause Analysis, Product Thinking, Stakeholder Communication' },
            { label: 'Libraries', items: 'Pandas, NumPy, scikit-learn, Docker' },
          ].map(({ label, items }) => (
            <div key={label} className="flex gap-2">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 font-medium w-20 flex-shrink-0">
                {label}
              </span>
              <span className="text-slate-700 dark:text-slate-300 print:text-slate-800">
                {items}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-indigo-700 mb-4">
          Projects
        </h2>
        <div className="space-y-5 text-sm">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-2 mb-1.5">
              <span className="font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                E-Commerce Sales Analysis
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 print:text-slate-500 italic">
                SQL, Python, Excel
              </span>
            </div>
            <ul className="space-y-1">
              {[
                'Mined a 50,000+ transaction dataset to uncover customer segmentation and revenue concentration patterns.',
                'Crafted SQL queries revealing that 20% of customers drive 80% of revenue, packaged into a business report with targeted sales strategy recommendations.',
              ].map((b, i) => <Bullet key={i} text={b} />)}
            </ul>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-2 mb-1.5">
              <span className="font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                Product Strategy Teardown
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 print:text-slate-500 italic">
                Product Analysis, Metrics Framework
              </span>
            </div>
            <ul className="space-y-1">
              {[
                'Conducted end-to-end product analysis of a top consumer app, charted the user journey, flagged drop-off points, and proposed 3 feature improvements with supporting business rationale.',
                'Defined North Star metric, 3 supporting KPIs, and measurable success criteria for each proposed product change.',
              ].map((b, i) => <Bullet key={i} text={b} />)}
            </ul>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-2 mb-1.5">
              <span className="font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                HR Analytics Dashboard
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 print:text-slate-500 italic">
                Python, Excel, Data Visualization
              </span>
            </div>
            <ul className="space-y-1">
              {[
                'Examined attrition data across 1,400+ employee records, isolating key churn drivers including tenure, department, and compensation band.',
                'Designed an interactive dashboard visualizing trends by role and satisfaction score, enabling non-technical stakeholders to act on retention gaps without analyst support.',
                'Delivered a one-page recommendation citing 3 data-backed policy changes projected to meaningfully reduce turnover.',
              ].map((b, i) => <Bullet key={i} text={b} />)}
            </ul>
          </div>
        </div>
      </section>

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
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-0.5">
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
      <ul className="mt-1.5 space-y-1">
        {bullets.map((bullet, i) => <Bullet key={i} text={bullet} />)}
      </ul>
    </div>
  )
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
      <span className="text-slate-300 dark:text-slate-600 print:text-slate-400 flex-shrink-0 mt-0.5">-</span>
      {text}
    </li>
  )
}
