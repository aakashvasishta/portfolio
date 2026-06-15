import { LineChart, Line } from 'recharts'
import { useCS3Kpis } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import type { CS3KpiMetric } from '../../../data/schemas'

function formatValue(m: CS3KpiMetric): string {
  if (m.unit === '%') return `${(m.value * 100).toFixed(0)}%`
  if (m.unit === 'min') return `${m.value.toFixed(1)} min`
  return m.value.toLocaleString()
}

function formatTarget(m: CS3KpiMetric): string {
  if (m.unit === '%') return `${(m.target * 100).toFixed(0)}%`
  if (m.unit === 'min') return `${m.target.toFixed(0)} min`
  return m.target.toLocaleString()
}

function pct(m: CS3KpiMetric): number {
  return Math.min(100, (m.value / m.target) * 100)
}

function Sparkline({ trend, color }: { trend: number[]; color: string }) {
  const pts = trend.map((v, i) => ({ i, v }))
  return (
    <LineChart width={80} height={28} data={pts}>
      <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
    </LineChart>
  )
}

function KpiTile({ metric, accent, isLarge }: { metric: CS3KpiMetric; accent: string; isLarge?: boolean }) {
  const theme = useChartTheme()
  const progress = pct(metric)
  const onTrack = progress >= 80

  return (
    <div
      className={`rounded-xl border p-4 flex flex-col gap-2 ${
        theme.isDark
          ? 'bg-slate-800/60 border-slate-700/60'
          : 'bg-white border-slate-200'
      }`}
    >
      <p className={`text-xs font-medium ${theme.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {metric.name}
      </p>
      <div className="flex items-end justify-between gap-2">
        <span
          className={`font-bold tracking-tight ${isLarge ? 'text-3xl' : 'text-xl'}`}
          style={{ color: accent, fontFamily: theme.fontFamily.data }}
        >
          {formatValue(metric)}
        </span>
        <Sparkline trend={metric.trend} color={accent} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs" style={{ fontFamily: theme.fontFamily.data }}>
          <span className={theme.isDark ? 'text-slate-500' : 'text-slate-400'}>
            Target {formatTarget(metric)}
          </span>
          <span className={onTrack ? 'text-green-500' : 'text-amber-500'}>
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className={`w-full h-1 rounded-full ${theme.isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <div
            className="h-1 rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: onTrack ? okabeIto[2] : okabeIto[1] }}
          />
        </div>
      </div>
    </div>
  )
}

export function KpiScorecard() {
  const data = useCS3Kpis()

  if (!data) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-auto">
      <KpiTile metric={data.north_star} accent={okabeIto[2]} isLarge />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.supporting.map((m, i) => (
          <KpiTile key={m.name} metric={m} accent={[okabeIto[0], okabeIto[1], okabeIto[4], okabeIto[2]][i % 4]} />
        ))}
      </div>
    </div>
  )
}
