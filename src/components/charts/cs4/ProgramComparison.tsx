import { useMemo } from 'react'
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts'
import { useCS4Students } from '../../../data/loaders'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip, ThemedLegend } from '../RechartsTheme'

const PROGRAMS = ['Science', 'Mathematics', 'Technology']

export function ProgramComparison() {
  const data = useCS4Students()

  const chartData = useMemo(() => {
    if (!data) return null
    return PROGRAMS.map((prog, i) => {
      const students = data.filter(s => s.program === prog)
      const avgCompletion = students.reduce((s, x) => s + x.completion_rate, 0) / students.length
      const avgScore = students.reduce((s, x) => s + x.assessment_score, 0) / students.length
      const atRiskPct = (students.filter(s => s.at_risk).length / students.length) * 100
      return {
        program: prog,
        'Avg Completion %': parseFloat((avgCompletion * 100).toFixed(1)),
        'Avg Score': parseFloat(avgScore.toFixed(1)),
        'At-Risk %': parseFloat(atRiskPct.toFixed(1)),
        color: [okabeIto[0], okabeIto[4], okabeIto[2]][i],
      }
    })
  }, [data])

  if (!chartData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }} barGap={4}>
        <ThemedCartesianGrid />
        <ThemedXAxis dataKey="program" />
        <ThemedYAxis domain={[0, 100]} tickFormatter={(v: number) => `${v}`} />
        <ThemedTooltip />
        <ThemedLegend />
        <Bar dataKey="Avg Completion %" maxBarSize={36} radius={[4, 4, 0, 0]}>
          {chartData.map(d => <Cell key={d.program} fill={d.color} opacity={0.6} />)}
        </Bar>
        <Bar dataKey="Avg Score" maxBarSize={36} radius={[4, 4, 0, 0]}>
          {chartData.map(d => <Cell key={d.program} fill={d.color} opacity={0.95} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
