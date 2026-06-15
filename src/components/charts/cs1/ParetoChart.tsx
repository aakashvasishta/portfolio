import {
  ComposedChart,
  Bar,
  Line,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  YAxis,
} from 'recharts'
import { useCS1Pareto } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedCartesianGrid, ThemedTooltip } from '../RechartsTheme'

export function ParetoChart() {
  const data = useCS1Pareto()
  const theme = useChartTheme()

  if (!data) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  const indigo = theme.isDark ? '#818cf8' : '#6366f1'

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 8, right: 56, left: 0, bottom: 4 }}>
        <ThemedCartesianGrid />
        <ThemedXAxis dataKey="label" />
        <YAxis
          yAxisId="pct"
          tickFormatter={(v: number) => `${v}%`}
          domain={[0, 85]}
          width={40}
          tick={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: theme.fontSize.tick }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="cum"
          orientation="right"
          tickFormatter={(v: number) => `${v}%`}
          domain={[0, 108]}
          width={44}
          tick={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: theme.fontSize.tick }}
          axisLine={false}
          tickLine={false}
        />
        <ThemedTooltip />
        <ReferenceLine
          yAxisId="cum"
          y={80}
          stroke={indigo}
          strokeDasharray="4 4"
          strokeWidth={1.5}
          label={{
            value: '80% threshold',
            position: 'insideTopRight',
            fill: indigo,
            fontFamily: theme.fontFamily.data,
            fontSize: 10,
          }}
        />
        <Bar yAxisId="pct" dataKey="revenue_share" radius={[4, 4, 0, 0]} maxBarSize={56}>
          {data.map((row, i) => (
            <Cell key={row.label} fill={i === 0 ? okabeIto[0] : `${okabeIto[0]}44`} />
          ))}
        </Bar>
        <Line
          yAxisId="cum"
          dataKey="cumulative"
          stroke={okabeIto[4]}
          strokeWidth={2}
          dot={{ r: 3, fill: okabeIto[4], strokeWidth: 0 }}
          type="monotone"
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
