import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import { useCS1Timeline } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip } from '../RechartsTheme'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function RevenueTimeline() {
  const data = useCS1Timeline()
  const theme = useChartTheme()

  if (!data) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={okabeIto[0]} stopOpacity={theme.isDark ? 0.4 : 0.25} />
            <stop offset="95%" stopColor={okabeIto[0]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <ThemedCartesianGrid />
        <ThemedXAxis
          dataKey="date"
          interval={12}
          tickFormatter={(v: string) => {
            const d = new Date(v)
            return `${MONTHS[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`
          }}
        />
        <ThemedYAxis
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          width={48}
        />
        <ThemedTooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={okabeIto[0]}
          strokeWidth={1.5}
          fill="url(#revenueGrad)"
          dot={false}
          activeDot={{ r: 4, fill: okabeIto[0] }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
