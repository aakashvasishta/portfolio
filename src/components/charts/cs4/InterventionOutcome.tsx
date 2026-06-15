import { useMemo } from 'react'
import { useCS4Students } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { PlotlyChart } from '../PlotlyChart'
import type { Data } from 'plotly.js'

export function InterventionOutcome() {
  const data = useCS4Students()
  const theme = useChartTheme()

  const plotlyData = useMemo<Data[] | null>(() => {
    if (!data) return null
    const intervened = data.filter(
      s => s.intervention_received && s.pre_intervention_score !== null && s.post_intervention_score !== null,
    )
    if (intervened.length === 0) return null

    return [
      {
        type: 'box',
        name: 'Before',
        y: intervened.map(s => s.pre_intervention_score!),
        marker: { color: okabeIto[5] },
        line: { color: okabeIto[5] },
        fillcolor: `${okabeIto[5]}33`,
        boxpoints: 'suspectedoutliers' as const,
        jitter: 0.3,
        whiskerwidth: 0.5,
        hovertemplate: 'Before: %{y}<extra></extra>',
      },
      {
        type: 'box',
        name: 'After',
        y: intervened.map(s => s.post_intervention_score!),
        marker: { color: okabeIto[2] },
        line: { color: okabeIto[2] },
        fillcolor: `${okabeIto[2]}33`,
        boxpoints: 'suspectedoutliers' as const,
        jitter: 0.3,
        whiskerwidth: 0.5,
        hovertemplate: 'After: %{y}<extra></extra>',
      },
    ]
  }, [data])

  if (!plotlyData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <PlotlyChart
      data={plotlyData}
      layout={{
        yaxis: {
          title: { text: 'Assessment Score', font: { size: 11, color: theme.axis } },
          range: [40, 105],
        },
        margin: { l: 56, r: 16, t: 8, b: 40 },
        boxmode: 'group',
      }}
      height={288}
    />
  )
}
