import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { useCS1Customers } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip } from '../RechartsTheme'

const SEGMENT_ORDER = [
  'Champions', 'Loyal', 'Potential Loyalist',
  'Promising', 'Needs Attention', 'At Risk', 'Lost',
]

const HEALTHY = new Set(['Champions', 'Loyal', 'Potential Loyalist', 'Promising'])

export function SegmentProfile() {
  const data = useCS1Customers()
  const theme = useChartTheme()

  const segmentData = useMemo(() => {
    if (!data) return null
    const total = data.length
    const totRev = data.reduce((s, c) => s + c.total_revenue, 0)
    const map = new Map<string, { count: number; revenue: number }>()
    for (const c of data) {
      const e = map.get(c.segment) ?? { count: 0, revenue: 0 }
      e.count++
      e.revenue += c.total_revenue
      map.set(c.segment, e)
    }
    return SEGMENT_ORDER.filter(seg => map.has(seg)).map(seg => {
      const { count, revenue } = map.get(seg)!
      return {
        segment: seg,
        pctCustomers: parseFloat(((count / total) * 100).toFixed(1)),
        pctRevenue: parseFloat(((revenue / totRev) * 100).toFixed(1)),
      }
    })
  }, [data])

  if (!segmentData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={segmentData}
        layout="vertical"
        margin={{ top: 4, right: 64, left: 8, bottom: 4 }}
        barCategoryGap={8}
      >
        <ThemedCartesianGrid vertical />
        <ThemedYAxis
          dataKey="segment"
          type="category"
          width={112}
          tick={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: 10 }}
        />
        <ThemedXAxis
          type="number"
          tickFormatter={(v: number) => `${v}%`}
          domain={[0, 50]}
        />
        <ThemedTooltip />
        <Bar dataKey="pctCustomers" name="% Customers" maxBarSize={18} radius={[0, 3, 3, 0]}>
          {segmentData.map(row => (
            <Cell
              key={row.segment}
              fill={HEALTHY.has(row.segment) ? okabeIto[2] : okabeIto[5]}
              opacity={0.7}
            />
          ))}
          <LabelList
            dataKey="pctRevenue"
            position="right"
            formatter={(v: unknown) => `${v ?? ''}% rev`}
            style={{
              fill: theme.axis,
              fontFamily: theme.fontFamily.data,
              fontSize: 9,
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
