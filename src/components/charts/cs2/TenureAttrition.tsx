import { useMemo } from 'react'
import { BarChart, Bar, Cell, ResponsiveContainer, LabelList } from 'recharts'
import { useCS2Employees } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip } from '../RechartsTheme'

const BUCKETS = [
  { label: '< 1 yr', min: 0, max: 12 },
  { label: '1–2 yr', min: 12, max: 24 },
  { label: '2–3 yr', min: 24, max: 36 },
  { label: '3–5 yr', min: 36, max: 60 },
  { label: '5+ yr', min: 60, max: Infinity },
]

export function TenureAttrition() {
  const data = useCS2Employees()
  const theme = useChartTheme()

  const chartData = useMemo(() => {
    if (!data) return null
    return BUCKETS.map(b => {
      const emp = data.filter(e => e.tenure_months >= b.min && e.tenure_months < b.max)
      const rate = emp.length > 0
        ? parseFloat(((emp.filter(e => e.attrition).length / emp.length) * 100).toFixed(1))
        : 0
      return { label: b.label, rate, n: emp.length }
    })
  }, [data])

  if (!chartData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  const max = Math.max(...chartData.map(d => d.rate))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <ThemedCartesianGrid />
        <ThemedXAxis dataKey="label" />
        <ThemedYAxis tickFormatter={(v: number) => `${v}%`} domain={[0, Math.ceil(max / 5) * 5 + 5]} />
        <ThemedTooltip />
        <Bar dataKey="rate" name="Attrition rate %" maxBarSize={56} radius={[4, 4, 0, 0]}>
          {chartData.map((d, i) => (
            <Cell key={i} fill={d.rate >= max * 0.8 ? okabeIto[5] : okabeIto[1]} opacity={0.85} />
          ))}
          <LabelList
            dataKey="rate"
            position="top"
            formatter={(v: unknown) => `${v ?? ''}%`}
            style={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: 10 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
