import { useMemo } from 'react'
import { useCS4Students } from '../../../data/loaders'
import { PlotlyChart } from '../PlotlyChart'
import { okabeIto } from '../../../theme/chartTheme'
import type { Data } from 'plotly.js'

const PROGRAMS = ['Science', 'Math', 'Technology'] as const

function computePCA2D(rows: number[][]): { pc1: number[]; pc2: number[]; var1: number; var2: number } {
  const n = rows.length
  if (n < 3) return { pc1: rows.map(r => r[0]), pc2: rows.map(r => r[1]), var1: 1, var2: 0 }

  const means = [0, 1].map(j => rows.reduce((s, r) => s + r[j], 0) / n)
  const stds  = [0, 1].map(j => {
    const v = rows.reduce((s, r) => s + (r[j] - means[j]) ** 2, 0) / n
    return Math.sqrt(v) || 1
  })
  const Z = rows.map(r => [(r[0] - means[0]) / stds[0], (r[1] - means[1]) / stds[1]])

  const c00 = Z.reduce((s, r) => s + r[0] * r[0], 0) / (n - 1)
  const c01 = Z.reduce((s, r) => s + r[0] * r[1], 0) / (n - 1)
  const c11 = Z.reduce((s, r) => s + r[1] * r[1], 0) / (n - 1)

  const tr   = c00 + c11
  const det  = c00 * c11 - c01 * c01
  const disc = Math.sqrt(Math.max(0, (tr / 2) ** 2 - det))
  const l1   = tr / 2 + disc
  const l2   = tr / 2 - disc
  const total = Math.max(l1 + l2, 1e-10)

  let e1x = 1, e1y = 0
  if (Math.abs(c01) > 1e-10) {
    const norm = Math.sqrt(c01 ** 2 + (l1 - c00) ** 2)
    e1x = c01 / norm
    e1y = (l1 - c00) / norm
  }
  const e2x = -e1y, e2y = e1x

  return {
    pc1:  Z.map(r => r[0] * e1x + r[1] * e1y),
    pc2:  Z.map(r => r[0] * e2x + r[1] * e2y),
    var1: l1 / total,
    var2: l2 / total,
  }
}

export function PCAScatter() {
  const students = useCS4Students()

  const traces = useMemo<Data[]>(() => {
    if (!students) return []

    const rows  = students.map(s => [s.completion_rate * 100, s.assessment_score])
    const { pc1, pc2, var1, var2 } = computePCA2D(rows)

    return PROGRAMS.map((prog, i) => {
      const idx = students.map((s, j) => s.program === prog ? j : -1).filter(j => j >= 0)
      return {
        type: 'scatter',
        mode: 'markers',
        name: prog,
        x: idx.map(j => pc1[j]),
        y: idx.map(j => pc2[j]),
        text: idx.map(j => `${students[j].program} · score ${students[j].assessment_score}`),
        hovertemplate: '%{text}<br>PC1: %{x:.2f}  PC2: %{y:.2f}<extra></extra>',
        marker: { color: okabeIto[i], size: 6, opacity: 0.65 },
        _var1: var1,
        _var2: var2,
      } as Data
    })
  }, [students])

  const { var1, var2 } = useMemo(() => {
    if (!students) return { var1: 0, var2: 0 }
    const rows = students.map(s => [s.completion_rate * 100, s.assessment_score])
    const r = computePCA2D(rows)
    return { var1: r.var1, var2: r.var2 }
  }, [students])

  return (
    <PlotlyChart
      data={traces}
      layout={{
        xaxis: { title: { text: `PC1 (${(var1 * 100).toFixed(0)}% variance)`, font: { size: 10 } } },
        yaxis: { title: { text: `PC2 (${(var2 * 100).toFixed(0)}% variance)`, font: { size: 10 } } },
        margin: { l: 56, r: 16, t: 16, b: 56 },
      }}
      height={288}
    />
  )
}
