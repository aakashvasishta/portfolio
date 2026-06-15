import { useMemo } from 'react'
import { BarChart, Bar, Cell, ResponsiveContainer, LabelList } from 'recharts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { okabeIto } from '../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip } from '../charts/RechartsTheme'
import type { CS2Employee } from '../../data/schemas'

interface Props { data: CS2Employee[] }

export function DashCompBandRisk({ data }: Props) {
  const theme = useChartTheme()

  const chartData = useMemo(() => {
    const bands = [1, 2, 3, 4, 5]
    return bands.map(band => {
      const emp = data.filter(e => e.comp_band === band)
      const rate = emp.length > 0
        ? parseFloat(((emp.filter(e => e.attrition).length / emp.length) * 100).toFixed(1))
        : 0
      return { band: `Band ${band}`, rate, n: emp.length }
    })
  }, [data])

  const max = Math.max(...chartData.map(d => d.rate))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <ThemedCartesianGrid />
        <ThemedXAxis dataKey="band" />
        <ThemedYAxis tickFormatter={(v: number) => `${v}%`} domain={[0, Math.ceil(max / 5) * 5 + 5]} />
        <ThemedTooltip />
        <Bar dataKey="rate" name="Attrition %" maxBarSize={52} radius={[4, 4, 0, 0]} isAnimationActive={false}>
          {chartData.map((d, i) => (
            <Cell key={i} fill={d.rate >= max * 0.8 ? okabeIto[5] : okabeIto[1]} opacity={0.85} />
          ))}
          <LabelList
            dataKey="rate"
            position="top"
            formatter={(v: unknown) => `${v}%`}
            style={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: 10 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
