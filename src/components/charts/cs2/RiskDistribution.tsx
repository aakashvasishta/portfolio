import { useMemo } from 'react'
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts'
import { useCS2Employees } from '../../../data/loaders'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip, ThemedLegend } from '../RechartsTheme'

const BUCKETS = ['0–20', '20–40', '40–60', '60–80', '80–100']
const BUCKET_COLORS = [okabeIto[2], okabeIto[2], okabeIto[1], okabeIto[5], okabeIto[5]]

function bucketIndex(score: number): number {
  return Math.min(4, Math.floor(score / 20))
}

export function RiskDistribution() {
  const data = useCS2Employees()

  const chartData = useMemo(() => {
    if (!data) return null
    const buckets = BUCKETS.map((label, i) => ({
      bucket: label,
      retained: 0,
      attrited: 0,
      color: BUCKET_COLORS[i],
    }))
    for (const emp of data) {
      const b = bucketIndex(emp.risk_score)
      if (emp.attrition) buckets[b].attrited++
      else buckets[b].retained++
    }
    return buckets
  }, [data])

  if (!chartData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <ThemedCartesianGrid />
        <ThemedXAxis dataKey="bucket" />
        <ThemedYAxis />
        <ThemedTooltip />
        <ThemedLegend />
        <Bar dataKey="retained" name="Stayed" stackId="a" maxBarSize={52}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={BUCKET_COLORS[i]} opacity={0.45} />
          ))}
        </Bar>
        <Bar dataKey="attrited" name="Left" stackId="a" radius={[4, 4, 0, 0]} maxBarSize={52}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={BUCKET_COLORS[i]} opacity={0.9} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
