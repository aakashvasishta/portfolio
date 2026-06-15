import { useMemo } from 'react'
import { useCS1Volcano } from '../../../data/loaders'
import { PlotlyChart } from '../PlotlyChart'
import type { Data } from 'plotly.js'

const FC_THRESH = 0.5
const P_THRESH = 1.301 // -log10(0.05)

const CHANNEL_COLORS: Record<string, string> = {
  Email: '#56B4E9',
  Social: '#E69F00',
  Display: '#CC79A7',
  Search: '#009E73',
  Content: '#0072B2',
}

export function VolcanoPlot() {
  const raw = useCS1Volcano()

  const traces = useMemo<Data[]>(() => {
    if (!raw) return []

    const notSig = raw.filter(d => !(Math.abs(d.log2fc) >= FC_THRESH && d.neg_log10_p >= P_THRESH))
    const sigUp  = raw.filter(d => d.log2fc >= FC_THRESH && d.neg_log10_p >= P_THRESH)
    const sigDn  = raw.filter(d => d.log2fc <= -FC_THRESH && d.neg_log10_p >= P_THRESH)

    return [
      {
        type: 'scatter',
        mode: 'markers',
        name: 'Not significant',
        x: notSig.map(d => d.log2fc),
        y: notSig.map(d => d.neg_log10_p),
        text: notSig.map(d => `${d.id} (${d.channel})`),
        hovertemplate: '%{text}<br>log₂FC: %{x:.2f}<br>-log₁₀p: %{y:.2f}<extra></extra>',
        marker: { color: '#94A3B8', size: 7, opacity: 0.55 },
      },
      {
        type: 'scatter',
        mode: 'markers',
        name: 'Higher conversion ↑',
        x: sigUp.map(d => d.log2fc),
        y: sigUp.map(d => d.neg_log10_p),
        text: sigUp.map(d => `${d.id} (${d.channel})`),
        hovertemplate: '%{text}<br>log₂FC: %{x:.2f}<br>-log₁₀p: %{y:.2f}<extra></extra>',
        marker: {
          color: sigUp.map(d => CHANNEL_COLORS[d.channel] ?? '#009E73'),
          size: 9,
          opacity: 0.88,
          line: { color: '#ffffff', width: 0.5 },
        },
      },
      {
        type: 'scatter',
        mode: 'markers',
        name: 'Lower conversion ↓',
        x: sigDn.map(d => d.log2fc),
        y: sigDn.map(d => d.neg_log10_p),
        text: sigDn.map(d => `${d.id} (${d.channel})`),
        hovertemplate: '%{text}<br>log₂FC: %{x:.2f}<br>-log₁₀p: %{y:.2f}<extra></extra>',
        marker: {
          color: sigDn.map(d => CHANNEL_COLORS[d.channel] ?? '#D55E00'),
          size: 9,
          opacity: 0.88,
          line: { color: '#ffffff', width: 0.5 },
        },
      },
    ] as Data[]
  }, [raw])

  return (
    <PlotlyChart
      data={traces}
      layout={{
        xaxis: { title: { text: 'log₂(fold change vs baseline)', font: { size: 10 } }, zeroline: true },
        yaxis: { title: { text: '−log₁₀(p-value)', font: { size: 10 } } },
        shapes: [
          { type: 'line', x0: FC_THRESH,  x1: FC_THRESH,  y0: P_THRESH, y1: 5, line: { dash: 'dot', color: '#6366f1', width: 1 } },
          { type: 'line', x0: -FC_THRESH, x1: -FC_THRESH, y0: P_THRESH, y1: 5, line: { dash: 'dot', color: '#6366f1', width: 1 } },
          { type: 'line', x0: -1.6,       x1: 1.6,        y0: P_THRESH, y1: P_THRESH, line: { dash: 'dot', color: '#6366f1', width: 1 } },
        ],
        margin: { l: 56, r: 16, t: 16, b: 56 },
      }}
      height={288}
    />
  )
}
