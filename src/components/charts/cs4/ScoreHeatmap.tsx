import { useMemo } from 'react'
import { useCS4Students } from '../../../data/loaders'
import { PlotlyChart } from '../PlotlyChart'
import type { Data, Layout } from 'plotly.js'

const PROGRAMS = ['Science', 'Math', 'Technology']
const BANDS    = ['80–100', '60–80', '40–60', '20–40', '0–20']

export function ScoreHeatmap() {
  const students = useCS4Students()

  const { z, annotations } = useMemo(() => {
    if (!students) return { z: [] as number[][], annotations: [] }

    const z: number[][] = BANDS.map(band => {
      const [lo, hi] = band.split('–').map(Number)
      return PROGRAMS.map(prog =>
        students.filter(s => s.program === prog && s.assessment_score >= lo && s.assessment_score < (hi === 100 ? 101 : hi)).length
      )
    })

    const annotations = BANDS.flatMap((band, bi) =>
      PROGRAMS.map((prog, pi) => ({
        x: prog,
        y: band,
        text: String(z[bi][pi]),
        showarrow: false,
        font: {
          size: 11,
          color: z[bi][pi] > 40 ? '#ffffff' : '#334155',
          family: "'JetBrains Mono', monospace",
        },
      }))
    )

    return { z, annotations }
  }, [students])

  if (!students) {
    return <div className="animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 h-full" />
  }

  const trace: Data = {
    type: 'heatmap',
    z,
    x: PROGRAMS,
    y: BANDS,
    colorscale: [[0, '#f1f5f9'], [1, '#0072B2']],
    showscale: true,
    colorbar: { thickness: 12, len: 0.9, tickfont: { size: 10 }, title: { text: 'Students', side: 'right' } },
    hovertemplate: '%{y} · %{x}: %{z} students<extra></extra>',
  } as Data

  return (
    <PlotlyChart
      data={[trace]}
      layout={{
        annotations: annotations as Partial<Layout>['annotations'],
        xaxis: { side: 'bottom' },
        margin: { l: 64, r: 56, t: 16, b: 48 },
      }}
      height={288}
    />
  )
}
