import { useMemo } from 'react'
import { useCS1Categories } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { okabeIto } from '../../../theme/chartTheme'
import { PlotlyChart } from '../PlotlyChart'
import type { Data } from 'plotly.js'
import type { CS1CategoryNode } from '../../../data/schemas'

function flatten(
  node: CS1CategoryNode,
  parent: string,
  labels: string[],
  parents: string[],
  values: number[],
): void {
  labels.push(node.name)
  parents.push(parent)
  values.push(node.revenue ?? 0)
  if (node.children) {
    for (const child of node.children) flatten(child, node.name, labels, parents, values)
  }
}

const CATEGORY_COLORS = [
  okabeIto[0], okabeIto[1], okabeIto[2], okabeIto[4],
  okabeIto[5], okabeIto[6], '#8B5CF6', '#EC4899',
]

export function CategoryTreemap() {
  const raw = useCS1Categories()
  const theme = useChartTheme()

  const plotlyData = useMemo<Data[] | null>(() => {
    if (!raw?.children) return null

    const labels: string[] = []
    const parents: string[] = []
    const values: number[] = []
    flatten(raw, '', labels, parents, values)

    const colorMap: Record<string, string> = {}
    raw.children.forEach((cat, i) => {
      colorMap[cat.name] = CATEGORY_COLORS[i % CATEGORY_COLORS.length]
      cat.children?.forEach(sub => { colorMap[sub.name] = colorMap[cat.name] })
    })

    return [{
      type: 'treemap',
      labels,
      parents,
      values,
      branchvalues: 'remainder',
      textinfo: 'label+value' as 'label+value',
      textfont: { size: 11, family: theme.fontFamily.data },
      marker: {
        colors: labels.map(l => colorMap[l] ?? theme.isDark ? '#334155' : '#E2E8F0'),
        line: { width: 1, color: theme.isDark ? '#0F172A' : '#FFFFFF' },
      },
      hovertemplate: '<b>%{label}</b><br>Revenue: $%{value:,.0f}<br>%{percentParent:.1%} of parent<extra></extra>',
    }]
  }, [raw, theme.fontFamily.data, theme.isDark])

  if (!plotlyData) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  return (
    <PlotlyChart
      data={plotlyData}
      layout={{ margin: { l: 0, r: 0, t: 0, b: 0 } }}
      height={288}
    />
  )
}
