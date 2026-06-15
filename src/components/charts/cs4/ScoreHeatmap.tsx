import { useMemo } from 'react'
import { useCS4Students } from '../../../data/loaders'
import { useChartTheme } from '../../../hooks/useChartTheme'
import { PlotlyChart } from '../PlotlyChart'
import type { Data, Layout } from 'plotly.js'

const PROGRAMS = ['Science', 'Math', 'Technology']
const BANDS    = ['80–100', '60–80', '40–60', '20–40', '0–20']

export function ScoreHeatmap() {
  const students = useCS4Students()
  const theme = useChartTheme()

  const { z, annotations } = useMemo(() => {
    if (!students) return { z: [] as number[][], annotations: [] }

    const z: number[][] = BANDS.map(band => {
      const [lo, hi] = band.split('–').map(Number)
      return PROGRAMS.map(prog =>
        students.filter(s =>
          s.program === prog &&
          s.assessment_score >= lo &&
          s.assessment_score < (hi === 100 ? 101 : hi)
        ).length
      )
    })

    const maxVal = Math.max(...z.flat(), 1)
    const annotations = BANDS.flatMap((band, bi) =>
      PROGRAMS.map((prog, pi) => ({
        x: prog,
        y: band,
        text: String(z[bi][pi]),
        showarrow: false,
        font: {
          size: 11,
          color: z[bi][pi] / maxVal > 0.6
            ? '#ffffff'
            : theme.isDark ? '#e2e8f0' : '#334155',
          family: "'JetBrains Mono', monospace",
        },
      }))
    )

    return { z, annotations }
  }, [students, theme.isDark])

  if (!students) {
    return <div className="w-full h-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  }

  const lowColor = theme.isDark ? '#1e293b' : '#f1f5f9'

  const trace: Data = {
    type: 'heatmap',
    z,
    x: PROGRAMS,
    y: BANDS,
    colorscale: [[0, lowColor], [1, '#0072B2']],
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
