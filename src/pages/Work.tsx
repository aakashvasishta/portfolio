import { useState } from 'react'
import { caseStudies } from '../data/caseStudies'
import { CaseStudyCard } from '../components/ui/CaseStudyCard'
import { Tag } from '../components/ui/Tag'

const allTags = Array.from(
  new Set(caseStudies.flatMap((s) => s.tags)),
).sort()

export function Work() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? caseStudies.filter((s) => s.tags.includes(activeTag))
    : caseStudies

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">
          Portfolio
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
          Case studies
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl text-base leading-relaxed">
          Four real-project studies rebuilt as interactive narratives —
          each with 5–6 charts across Recharts, Plotly, and D3, tied to
          actual analysis work.
        </p>
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTag(null)}
          className={[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
            activeTag === null
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
          ].join(' ')}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={[
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              activeTag === tag
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
            ].join(' ')}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((study) => (
            <CaseStudyCard key={study.slug} study={study} index={caseStudies.indexOf(study)} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          No case studies match that filter.
        </p>
      )}

      {/* Library key */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 font-medium uppercase tracking-wide">
          Chart libraries used
        </p>
        <div className="flex gap-2">
          {['Recharts', 'Plotly', 'D3'].map((lib) => (
            <Tag key={lib} label={lib} variant="library" />
          ))}
        </div>
      </div>
    </div>
  )
}
