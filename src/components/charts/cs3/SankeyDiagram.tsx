import { useMemo } from 'react'
import { useCS3Sankey } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { PlotlyChart } from '../PlotlyChart'
import type { Data } from 'plotly.js'

const GROUP_COLORS: Record<string, string> = {
  source: okabeIto[0],
  journey: okabeIto[2],
  outcome: okabeIto[4],
}

function alpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

export function SankeyDiagram() {
  const data = useCS3Sankey()
  const theme = useChartTheme()

  const plotlyData = useMemo<Data[] | null>(() => {
    if (!data) return null
    const ids = data.nodes.map(n => n.id)
    const idx = (id: string) => ids.indexOf(id)

    return [{
      type: 'sankey',
      orientation: 'h',
      node: {
        label: ids,
        pad: 16,
        thickness: 18,
        color: data.nodes.map(n => GROUP_COLORS[n.group] ?? okabeIto[0]),
        line: { color: 'transparent', width: 0 },
      },
      link: {
        source: data.links.map(l => idx(l.source)),
        target: data.links.map(l => idx(l.target)),
        value: data.links.map(l => l.value),
        color: data.links.map(l => {
          if (l.target === 'Dropped Out') return alpha(okabeIto[5], 0.22)
          if (l.target === 'Certified') return alpha(okabeIto[2], 0.28)
          return alpha(okabeIto[0], 0.18)
        }),
        hovertemplate: '%{source.label} → %{target.label}: %{value:,}<extra></extra>',
      },
    }]
  }, [data])

  if (!plotlyData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <PlotlyChart
      data={plotlyData}
      layout={{
        margin: { l: 8, r: 8, t: 8, b: 8 },
        font: { color: theme.axis, family: theme.fontFamily.data },
      }}
      height={288}
    />
  )
}
