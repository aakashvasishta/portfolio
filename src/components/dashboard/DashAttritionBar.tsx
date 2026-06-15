import { useMemo } from 'react'
import { BarChart, Bar, Cell, LabelList, ResponsiveContainer } from 'recharts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { okabeIto } from '../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip } from '../charts/RechartsTheme'
import type { CS2Employee } from '../../data/schemas'

interface DeptRow { dept: string; rate: number; n: number }

interface Props {
  allData: CS2Employee[]
  activeDepts: string[]
  onDeptClick: (dept: string) => void
}

export function DashAttritionBar({ allData, activeDepts, onDeptClick }: Props) {
  const theme = useChartTheme()

  const deptData = useMemo<DeptRow[]>(() => {
    const map = new Map<string, { total: number; attrited: number }>()
    for (const emp of allData) {
      const e = map.get(emp.department) ?? { total: 0, attrited: 0 }
      e.total++
      if (emp.attrition) e.attrited++
      map.set(emp.department, e)
    }
    const overall = allData.filter(e => e.attrition).length / allData.length
    return Array.from(map.entries())
      .map(([dept, { total, attrited }]) => ({
        dept,
        rate: parseFloat(((attrited / total) * 100).toFixed(1)),
        n: total,
        aboveAvg: attrited / total > overall,
      }))
      .sort((a, b) => b.rate - a.rate) as DeptRow[]
  }, [allData])

  const hasFilter = activeDepts.length > 0
  const isActive = (dept: string) => activeDepts.includes(dept)

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
          width={122}
          tick={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: 10 }}
        />
        <ThemedXAxis
          type="number"
          tickFormatter={(v: number) => `${v}%`}
          domain={[0, 25]}
        />
        <ThemedTooltip />
        <Bar
          dataKey="rate"
          name="Attrition %"
          maxBarSize={22}
          radius={[0, 4, 4, 0]}
          cursor="pointer"
          onClick={(barData) => {
            const row = barData as unknown as DeptRow
            if (row?.dept) onDeptClick(row.dept)
          }}
          isAnimationActive={false}
        >
          {deptData.map(row => (
            <Cell
              key={row.dept}
              fill={
                hasFilter
                  ? isActive(row.dept)
                    ? '#6366f1'
                    : theme.isDark ? '#334155' : '#CBD5E1'
                  : okabeIto[5]
              }
              opacity={hasFilter && !isActive(row.dept) ? 0.35 : 0.9}
            />
          ))}
          <LabelList
            dataKey="rate"
            position="right"
            formatter={(v: unknown) => `${v}%`}
            style={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: 10 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
