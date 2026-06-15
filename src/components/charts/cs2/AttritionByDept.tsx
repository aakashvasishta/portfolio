import { useMemo } from 'react'
import { BarChart, Bar, Cell, ResponsiveContainer, LabelList } from 'recharts'
import { useCS2Employees } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip } from '../RechartsTheme'

export function AttritionByDept() {
  const data = useCS2Employees()
  const theme = useChartTheme()

  const deptData = useMemo(() => {
    if (!data) return null
    const map = new Map<string, { total: number; attrited: number }>()
    for (const emp of data) {
      const e = map.get(emp.department) ?? { total: 0, attrited: 0 }
      e.total++
      if (emp.attrition) e.attrited++
      map.set(emp.department, e)
    }
    return Array.from(map.entries())
      .map(([dept, { total, attrited }]) => ({
        dept,
        rate: parseFloat(((attrited / total) * 100).toFixed(1)),
        n: total,
      }))
      .sort((a, b) => b.rate - a.rate)
  }, [data])

  if (!deptData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  const overall = data
    ? parseFloat(((data.filter(e => e.attrition).length / data.length) * 100).toFixed(1))
    : 0

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={deptData}
        layout="vertical"
        margin={{ top: 4, right: 56, left: 8, bottom: 4 }}
      >
        <ThemedCartesianGrid vertical />
        <ThemedYAxis
          dataKey="dept"
          type="category"
          width={120}
          tick={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: 10 }}
        />
        <ThemedXAxis
          type="number"
          tickFormatter={(v: number) => `${v}%`}
          domain={[0, 30]}
        />
        <ThemedTooltip />
        <Bar dataKey="rate" name="Attrition rate %" maxBarSize={22} radius={[0, 4, 4, 0]}>
          {deptData.map(row => (
            <Cell
              key={row.dept}
              fill={row.rate > overall ? okabeIto[5] : okabeIto[2]}
              opacity={0.8}
            />
          ))}
          <LabelList
            dataKey="rate"
            position="right"
            formatter={(v: unknown) => `${v ?? ''}%`}
            style={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: 10 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
