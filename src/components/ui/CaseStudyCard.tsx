import { Link } from 'react-router-dom'
import type { CaseStudy } from '../../data/caseStudies'
import { Tag } from './Tag'

interface CaseStudyCardProps {
  study: CaseStudy
  index: number
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link
      to={`/work/${study.slug}`}
      className="group block bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-50 dark:hover:shadow-indigo-950 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
    >
      {/* Accent bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: study.accentColor }}
      />

      <div className="p-6">
        {/* Number + chart count */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
            CS{num}
          </span>
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
            {study.chartCount} charts
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {study.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          {study.description}
        </p>

        {/* Highlight callout */}
        <div
          className="text-xs font-mono px-3 py-2 rounded-md mb-4 border-l-2"
          style={{ borderLeftColor: study.accentColor, backgroundColor: `${study.accentColor}12` }}
        >
          <span className="text-slate-600 dark:text-slate-400">→ </span>
          {study.highlight}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
          {study.libraries.map((lib) => (
            <Tag key={lib} label={lib} variant="library" />
          ))}
        </div>
      </div>
    </Link>
  )
}
