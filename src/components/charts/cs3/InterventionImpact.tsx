import { BarChart, Bar, ResponsiveContainer, LabelList } from 'recharts'
import { useCS3Interventions } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip, ThemedLegend } from '../RechartsTheme'

const SHORT: Record<string, string> = {
  'Smarter Onboarding': 'Onboarding',
  'Week 2 Nudge Campaign': 'Week 2 Nudge',
  'Assessment Redesign': 'Assessment',
}

export function InterventionImpact() {
  const data = useCS3Interventions()
  const theme = useChartTheme()

  if (!data) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  const chartData = data.map(d => ({
    name: SHORT[d.intervention] ?? d.intervention,
    'Before (%)': Math.round(d.before * 100),
    'After (%)': Math.round(d.after * 100),
    delta: `+${Math.round((d.after - d.before) * 100)}pp`,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 24, right: 8, left: 0, bottom: 4 }} barCategoryGap="30%">
        <ThemedCartesianGrid />
        <ThemedXAxis dataKey="name" />
        <ThemedYAxis tickFormatter={(v: number) => `${v}%`} domain={[0, 100]} width={40} />
        <ThemedTooltip />
        <ThemedLegend />
        <Bar dataKey="Before (%)" maxBarSize={36} radius={[4, 4, 0, 0]} fill={okabeIto[1]} opacity={0.55} />
        <Bar dataKey="After (%)" maxBarSize={36} radius={[4, 4, 0, 0]} fill={okabeIto[2]} opacity={0.9}>
          <LabelList
            dataKey="delta"
            position="top"
            style={{ fill: theme.axis, fontFamily: theme.fontFamily.data, fontSize: 10 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
