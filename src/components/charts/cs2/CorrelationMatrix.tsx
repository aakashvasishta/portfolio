import { useMemo } from 'react'
import { useCS2Employees } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { PlotlyChart } from '../PlotlyChart'
import type { Data, Layout } from 'plotly.js'

const VARS = ['satisfaction', 'performance', 'risk_score', 'comp_band'] as const
const LABELS = ['Satisfaction', 'Performance', 'Risk Score', 'Comp Band']

function pearson(xs: number[], ys: number[]): number {
  const n = xs.length
  const mx = xs.reduce((s, v) => s + v, 0) / n
  const my = ys.reduce((s, v) => s + v, 0) / n
  const num = xs.reduce((s, v, i) => s + (v - mx) * (ys[i] - my), 0)
  const dx = Math.sqrt(xs.reduce((s, v) => s + (v - mx) ** 2, 0))
  const dy = Math.sqrt(ys.reduce((s, v) => s + (v - my) ** 2, 0))
  return dx * dy === 0 ? 0 : num / (dx * dy)
}

export function CorrelationMatrix() {
  const employees = useCS2Employees()
  const theme = useChartTheme()

  const { matrix, annotations } = useMemo(() => {
    if (!employees) return { matrix: [] as number[][], annotations: [] }
    const n = VARS.length
    const cols = VARS.map(v => employees.map(e => e[v] as number))
    const matrix: number[][] = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (__, j) => pearson(cols[i], cols[j]))
    )
    const annotations = LABELS.flatMap((row, i) =>
      LABELS.map((col, j) => ({
        x: col,
        y: row,
        text: matrix[i][j].toFixed(2),
        showarrow: false,
        font: {
          size: 12,
          color: Math.abs(matrix[i][j]) > 0.45
            ? '#ffffff'
            : theme.isDark ? '#e2e8f0' : '#334155',
          family: "'JetBrains Mono', monospace",
        },
      }))
    )
    return { matrix, annotations }
  }, [employees, theme.isDark])

  if (!employees) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  const midColor = theme.isDark ? '#1e293b' : '#f1f5f9'

  const trace: Data = {
    type: 'heatmap',
    z: matrix,
    x: LABELS,
    y: LABELS,
    colorscale: [[0, '#0072B2'], [0.5, midColor], [1, '#D55E00']],
    zmin: -1,
    zmax: 1,
    showscale: true,
    colorbar: { thickness: 12, len: 0.9, tickfont: { size: 10 } },
    hovertemplate: '%{y} × %{x}: %{z:.3f}<extra></extra>',
  } as Data

  return (
    <PlotlyChart
      data={[trace]}
      layout={{
        annotations: annotations as Partial<Layout>['annotations'],
        margin: { l: 88, r: 56, t: 16, b: 72 },
        xaxis: { side: 'bottom', tickangle: -20 },
      }}
      height={300}
    />
  )
}
