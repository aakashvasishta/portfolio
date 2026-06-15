import { useMemo } from 'react'
import {
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { useCS4Students } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip, ThemedLegend } from '../RechartsTheme'

export function RiskScatter() {
  const data = useCS4Students()
  const theme = useChartTheme()

  const { safe, atRisk } = useMemo(() => {
    if (!data) return { safe: [], atRisk: [] }
    return {
      safe: data.filter(s => !s.at_risk).map(s => ({
        x: parseFloat((s.completion_rate * 100).toFixed(1)),
        y: s.assessment_score,
      })),
      atRisk: data.filter(s => s.at_risk).map(s => ({
        x: parseFloat((s.completion_rate * 100).toFixed(1)),
        y: s.assessment_score,
      })),
    }
  }, [data])

  if (!data) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  const indigo = theme.isDark ? '#818cf8' : '#6366f1'

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <ThemedCartesianGrid />
        <ThemedXAxis
          dataKey="x"
          type="number"
          name="Completion"
          domain={[0, 105]}
          tickFormatter={(v: number) => `${v}%`}
        />
        <ThemedYAxis
          dataKey="y"
          type="number"
          name="Score"
          domain={[40, 100]}
        />
        <ThemedTooltip
          cursor={{ strokeDasharray: '3 3' }}
        />
        <ThemedLegend />
        <ReferenceLine x={50} stroke={indigo} strokeDasharray="4 4" strokeWidth={1} />
        <ReferenceLine y={65} stroke={indigo} strokeDasharray="4 4" strokeWidth={1} />
        <Scatter name="On track" data={safe} fill={okabeIto[2]} opacity={0.45} />
        <Scatter name="At risk" data={atRisk} fill={okabeIto[5]} opacity={0.85} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
