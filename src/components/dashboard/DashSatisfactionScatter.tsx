import { useMemo } from 'react'
import { ScatterChart, Scatter, ResponsiveContainer } from 'recharts'
import { okabeIto } from '../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip, ThemedLegend } from '../charts/RechartsTheme'
import type { CS2Employee } from '../../data/schemas'

interface Props { data: CS2Employee[] }

export function DashSatisfactionScatter({ data }: Props) {
  const { safe, left } = useMemo(() => ({
    safe: data.filter(e => !e.attrition).map(e => ({ x: e.satisfaction, y: e.performance })),
    left: data.filter(e => e.attrition).map(e => ({ x: e.satisfaction, y: e.performance })),
  }), [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <ThemedCartesianGrid />
        <ThemedXAxis
          dataKey="x"
          type="number"
          name="Satisfaction"
          domain={[0, 10.5]}
          tickFormatter={(v: number) => v.toFixed(0)}
          label={{ value: 'Satisfaction (0–10)', position: 'insideBottom', offset: -2, fontSize: 10, fill: 'currentColor' }}
        />
        <ThemedYAxis dataKey="y" type="number" name="Performance" domain={[0.5, 5.5]} ticks={[1,2,3,4,5]} />
        <ThemedTooltip cursor={{ strokeDasharray: '3 3' }} />
        <ThemedLegend />
        <Scatter name="Stayed" data={safe} fill={okabeIto[2]} opacity={0.45} isAnimationActive={false} />
        <Scatter name="Left" data={left} fill={okabeIto[5]} opacity={0.75} isAnimationActive={false} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
