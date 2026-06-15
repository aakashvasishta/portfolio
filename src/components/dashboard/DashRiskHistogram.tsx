import { useMemo } from 'react'
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts'
import { okabeIto } from '../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip, ThemedLegend } from '../charts/RechartsTheme'
import type { CS2Employee } from '../../data/schemas'

const BUCKETS = ['0–20', '20–40', '40–60', '60–80', '80–100']
const BUCKET_COLORS = [okabeIto[2], okabeIto[2], okabeIto[1], okabeIto[5], okabeIto[5]]

interface Props { data: CS2Employee[] }

export function DashRiskHistogram({ data }: Props) {
  const chartData = useMemo(() => {
    const buckets = BUCKETS.map((label, i) => ({
      bucket: label,
      retained: 0,
      attrited: 0,
      color: BUCKET_COLORS[i],
    }))
    for (const emp of data) {
      const b = Math.min(4, Math.floor(emp.risk_score / 20))
      if (emp.attrition) buckets[b].attrited++
      else buckets[b].retained++
    }
    return buckets
  }, [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <ThemedCartesianGrid />
        <ThemedXAxis dataKey="bucket" tick={{ fontSize: 9 }} />
        <ThemedYAxis />
        <ThemedTooltip />
        <ThemedLegend />
        <Bar dataKey="retained" name="Stayed" stackId="a" maxBarSize={48} isAnimationActive={false}>
          {chartData.map((d, i) => <Cell key={i} fill={d.color} opacity={0.4} />)}
        </Bar>
        <Bar dataKey="attrited" name="Left" stackId="a" maxBarSize={48} radius={[4, 4, 0, 0]} isAnimationActive={false}>
          {chartData.map((d, i) => <Cell key={i} fill={d.color} opacity={0.9} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
