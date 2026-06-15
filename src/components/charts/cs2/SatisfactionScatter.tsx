import { useMemo } from 'react'
import { useCS2Employees } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { PlotlyChart } from '../PlotlyChart'
import type { Data } from 'plotly.js'

export function SatisfactionScatter() {
  const data = useCS2Employees()
  const theme = useChartTheme()

  const plotlyData = useMemo<Data[] | null>(() => {
    if (!data) return null

    const stayed = data.filter(e => !e.attrition)
    const left = data.filter(e => e.attrition)

    return [
      {
        type: 'scatter',
        mode: 'markers',
        name: 'Stayed',
        x: stayed.map(e => e.satisfaction),
        y: stayed.map(e => e.performance),
        marker: { color: okabeIto[2], size: 5, opacity: 0.45 },
        hovertemplate: 'Sat: %{x:.1f} · Perf: %{y}<extra>Stayed</extra>',
      },
      {
        type: 'scatter',
        mode: 'markers',
        name: 'Left',
        x: left.map(e => e.satisfaction),
        y: left.map(e => e.performance),
        marker: { color: okabeIto[5], size: 5, opacity: 0.7 },
        hovertemplate: 'Sat: %{x:.1f} · Perf: %{y}<extra>Left</extra>',
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
        xaxis: { title: { text: 'Satisfaction (0–10)', font: { size: 11, color: theme.axis } }, range: [0, 10.5] },
        yaxis: { title: { text: 'Performance (1–5)', font: { size: 11, color: theme.axis } }, range: [0.5, 5.5], dtick: 1 },
        legend: { x: 0.01, y: 0.99 },
      }}
      height={288}
    />
  )
}
