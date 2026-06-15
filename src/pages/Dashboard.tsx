import { useMemo, useCallback, useState } from 'react'
import { useCS2Employees } from '../data/loaders'
import { FilterPanel } from '../components/dashboard/FilterPanel'
import { DashKpiStrip } from '../components/dashboard/DashKpiStrip'
import { DashAttritionBar } from '../components/dashboard/DashAttritionBar'
import { DashRiskHistogram } from '../components/dashboard/DashRiskHistogram'
import { DashSatisfactionScatter } from '../components/dashboard/DashSatisfactionScatter'
import { DashCompBandRisk } from '../components/dashboard/DashCompBandRisk'

type AttritionFilter = 'all' | 'stayed' | 'left'

function DashCard({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-4 flex flex-col ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">
        {title}
      </p>
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <div className="h-full w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-700" />
  )
}

export function Dashboard() {
  const allData = useCS2Employees()

  const [deptFilter, setDeptFilter] = useState<string[]>([])
  const [attritionFilter, setAttritionFilter] = useState<AttritionFilter>('all')

  const toggleDept = useCallback((dept: string) => {
    setDeptFilter(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    )
  }, [])

  const clearFilters = useCallback(() => {
    setDeptFilter([])
    setAttritionFilter('all')
  }, [])

  const isFiltered = deptFilter.length > 0 || attritionFilter !== 'all'

  const filteredData = useMemo(() => {
    if (!allData) return null
    return allData.filter(emp => {
      if (deptFilter.length > 0 && !deptFilter.includes(emp.department)) return false
      if (attritionFilter === 'stayed' && emp.attrition) return false
      if (attritionFilter === 'left' && !emp.attrition) return false
      return true
    })
  }, [allData, deptFilter, attritionFilter])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">
          Live dashboard
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
          Workforce Risk Explorer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed text-sm">
          Cross-filtered dashboard on the HR attrition dataset. Click any department bar to filter
          all panels, or use the sidebar to slice by attrition status.
        </p>
        {isFiltered && (
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-400 dark:text-slate-500">Active filters:</span>
            {deptFilter.map(d => (
              <button
                key={d}
                onClick={() => toggleDept(d)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
              >
                {d} ✕
              </button>
            ))}
            {attritionFilter !== 'all' && (
              <button
                onClick={() => setAttritionFilter('all')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer"
              >
                Status: {attritionFilter} ✕
              </button>
            )}
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <FilterPanel
          deptFilter={deptFilter}
          attritionFilter={attritionFilter}
          onToggleDept={toggleDept}
          onSetAttrition={setAttritionFilter}
          onClear={clearFilters}
          isFiltered={isFiltered}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* KPI Strip */}
          {filteredData && allData ? (
            <DashKpiStrip data={filteredData} total={allData.length} />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[0,1,2,3].map(i => (
                <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 px-5 py-4 h-20">
                  <div className="animate-pulse h-full rounded bg-slate-100 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          )}

          {/* Row 1: Attrition by Dept (wider) + Risk Histogram */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <DashCard title="Attrition rate by department — click to filter" className="lg:col-span-3 h-72">
              {allData && filteredData ? (
                <DashAttritionBar
                  allData={allData}
                  activeDepts={deptFilter}
                  onDeptClick={toggleDept}
                />
              ) : <Skeleton />}
            </DashCard>
            <DashCard title="Risk score distribution" className="lg:col-span-2 h-72">
              {filteredData ? <DashRiskHistogram data={filteredData} /> : <Skeleton />}
            </DashCard>
          </div>

          {/* Row 2: Satisfaction scatter + Comp band risk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <DashCard title="Satisfaction vs performance" className="h-72">
              {filteredData ? <DashSatisfactionScatter data={filteredData} /> : <Skeleton />}
            </DashCard>
            <DashCard title="Attrition rate by comp band" className="h-72">
              {filteredData ? <DashCompBandRisk data={filteredData} /> : <Skeleton />}
            </DashCard>
          </div>

          {/* Data note */}
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono text-right">
            Figures are illustrative. Simulated dataset for portfolio purposes.
          </p>
        </div>
      </div>
    </div>
  )
}
