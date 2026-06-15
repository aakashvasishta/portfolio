import { useMemo } from 'react'
import type { CS2Employee } from '../../data/schemas'

interface Props {
  data: CS2Employee[]
  total: number
}

function KpiTile({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 px-5 py-4 flex flex-col gap-1">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </p>
      <p
        className="text-2xl font-bold tracking-tight"
        style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {value}
      </p>
      {sub && (
        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">{sub}</p>
      )}
    </div>
  )
}

export function DashKpiStrip({ data, total }: Props) {
  const stats = useMemo(() => {
    const n = data.length
    const attrited = data.filter(e => e.attrition).length
    const rate = n > 0 ? (attrited / n) * 100 : 0
    const avgRisk = n > 0 ? data.reduce((s, e) => s + e.risk_score, 0) / n : 0
    return { n, attrited, rate, avgRisk }
  }, [data])

  const isFiltered = data.length < total
  const filterSuffix = isFiltered ? ` of ${total.toLocaleString()}` : ''

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <KpiTile
        label="Employees"
        value={stats.n.toLocaleString()}
        sub={isFiltered ? `${filterSuffix.trim()} total` : undefined}
        accent="#6366f1"
      />
      <KpiTile
        label="Attrited"
        value={stats.attrited.toLocaleString()}
        sub={isFiltered ? undefined : 'in period'}
        accent="#D55E00"
      />
      <KpiTile
        label="Attrition Rate"
        value={`${stats.rate.toFixed(1)}%`}
        accent={stats.rate > 18 ? '#D55E00' : '#009E73'}
      />
      <KpiTile
        label="Avg Risk Score"
        value={stats.avgRisk.toFixed(0)}
        sub="(0 = safe · 100 = high risk)"
        accent={stats.avgRisk > 60 ? '#D55E00' : stats.avgRisk > 40 ? '#E69F00' : '#009E73'}
      />
    </div>
  )
}
