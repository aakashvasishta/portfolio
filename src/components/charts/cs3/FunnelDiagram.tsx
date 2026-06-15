import { useMemo } from 'react'
import { useCS3Funnel } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { PlotlyChart } from '../PlotlyChart'
import type { Data } from 'plotly.js'

export function FunnelDiagram() {
  const data = useCS3Funnel()
  const theme = useChartTheme()

  const plotlyData = useMemo<Data[] | null>(() => {
    if (!data) return null
    return [{
      type: 'funnel',
      y: data.map(s => s.stage),
      x: data.map(s => s.users),
      textposition: 'inside',
      textinfo: 'value+percent' as 'value+percent',
      textfont: { size: 11, family: theme.fontFamily.data, color: '#FFFFFF' },
      connector: { line: { color: 'transparent' } },
      marker: {
        color: data.map((_, i) => {
          const opacity = 1 - i * 0.08
          return `rgba(0,158,115,${opacity.toFixed(2)})`
        }),
        line: { width: 0 },
      },
      hovertemplate: '<b>%{y}</b><br>Users: %{x:,}<br>%{percentInitial:.1%} of start<extra></extra>',
    }]
  }, [data, theme.fontFamily.data])

  if (!plotlyData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <PlotlyChart
      data={plotlyData}
      layout={{
        margin: { l: 160, r: 16, t: 8, b: 8 },
        yaxis: { autorange: 'reversed' as const },
        font: { color: theme.axis },
      }}
      height={288}
    />
  )
}
