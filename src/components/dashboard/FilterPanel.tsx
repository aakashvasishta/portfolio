import { useState } from 'react'
import { useChartTheme } from '../../hooks/useChartTheme'

const ALL_DEPTS = [
  'Engineering', 'Sales', 'Customer Service', 'Operations',
  'Marketing', 'Product', 'Finance', 'HR',
]

type AttritionFilter = 'all' | 'stayed' | 'left'

interface Props {
  deptFilter: string[]
  attritionFilter: AttritionFilter
  onToggleDept: (dept: string) => void
  onSetAttrition: (v: AttritionFilter) => void
  onClear: () => void
  isFiltered: boolean
}

export function FilterPanel({
  deptFilter,
  attritionFilter,
  onToggleDept,
  onSetAttrition,
  onClear,
  isFiltered,
}: Props) {
  const theme = useChartTheme()
  const [open, setOpen] = useState(false)

  const panelContent = (
    <div className="space-y-5">
      {/* Department filter */}
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${theme.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Department
          {deptFilter.length > 0 && (
            <span className="ml-1.5 text-indigo-500">({deptFilter.length})</span>
          )}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_DEPTS.map(dept => {
            const active = deptFilter.includes(dept)
            return (
              <button
                key={dept}
                onClick={() => onToggleDept(dept)}
                className={`px-2 py-0.5 text-xs rounded-full border transition-colors cursor-pointer ${
                  active
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : theme.isDark
                      ? 'border-slate-600 text-slate-300 hover:border-indigo-500 hover:text-indigo-400'
                      : 'border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {dept}
              </button>
            )
          })}
        </div>
      </div>

      {/* Attrition status */}
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${theme.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Attrition Status
        </p>
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          {(['all', 'stayed', 'left'] as AttritionFilter[]).map(v => (
            <button
              key={v}
              onClick={() => onSetAttrition(v)}
              className={`flex-1 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer ${
                attritionFilter === v
                  ? 'bg-indigo-600 text-white'
                  : theme.isDark
                    ? 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-white text-slate-500 hover:text-slate-700'
              }`}
            >
              {v === 'all' ? 'All' : v === 'stayed' ? 'Stayed' : 'Left'}
            </button>
          ))}
        </div>
      </div>

      {/* Clear button */}
      {isFiltered && (
        <button
          onClick={onClear}
          className="w-full py-2 text-xs font-medium text-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="lg:w-52 flex-shrink-0">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 mb-4 cursor-pointer"
      >
        <span>
          Filters
          {isFiltered && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-indigo-600 text-white rounded-full">
              {deptFilter.length + (attritionFilter !== 'all' ? 1 : 0)}
            </span>
          )}
        </span>
        <span>{open ? '↑' : '↓'}</span>
      </button>

      {/* Panel */}
      <div
        className={`${open ? 'block' : 'hidden'} lg:block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-4`}
      >
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Filters
        </p>
        {panelContent}
      </div>
    </div>
  )
}
