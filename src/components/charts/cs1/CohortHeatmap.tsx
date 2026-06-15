import { useEffect } from 'react'
import * as d3 from 'd3'
import { useD3 } from '../useD3'
import { useCS1Cohorts } from '../../../data/loaders'

const MONTH_KEYS = ['m0','m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11'] as const
const MONTH_LABELS = ['M0','M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11']
const CHART_H = 288

export function CohortHeatmap() {
  const data = useCS1Cohorts()
  const { containerRef, width, theme } = useD3(CHART_H)

  useEffect(() => {
    if (!data || width === 0) return
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''

    const margin = { top: 10, right: 16, bottom: 36, left: 72 }
    const innerW = width - margin.left - margin.right
    const innerH = CHART_H - margin.top - margin.bottom

    const svg = d3.select(el).append('svg').attr('width', width).attr('height', CHART_H)
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const cohorts = data.map(d => d.cohort)
    const x = d3.scaleBand().domain(MONTH_LABELS).range([0, innerW]).padding(0.06)
    const y = d3.scaleBand().domain(cohorts).range([0, innerH]).padding(0.06)

    const startColor = theme.isDark ? '#0F172A' : '#EFF6FF'
    const colorFn = (v: number) => d3.interpolateRgb(startColor, '#56B4E9')(v / 100)

    data.forEach(row => {
      MONTH_KEYS.forEach((mk, i) => {
        const val = row[mk as keyof typeof row] as number
        const cx = x(MONTH_LABELS[i])!
        const cy = y(row.cohort)!
        const bw = x.bandwidth()
        const bh = y.bandwidth()

        g.append('rect')
          .attr('x', cx).attr('y', cy)
          .attr('width', bw).attr('height', bh)
          .attr('fill', val > 0 ? colorFn(val) : (theme.isDark ? '#1E293B' : '#F1F5F9'))
          .attr('rx', 2)

        if (bw > 26 && bh > 13) {
          g.append('text')
            .attr('x', cx + bw / 2).attr('y', cy + bh / 2)
            .attr('dy', '0.35em').attr('text-anchor', 'middle')
            .attr('fill', val > 60 ? (theme.isDark ? '#0F172A' : '#FFFFFF') : theme.axis)
            .attr('font-size', '8px')
            .attr('font-family', theme.fontFamily.data)
            .text(val > 0 ? String(Math.round(val)) : '')
        }
      })
    })

    g.append('g')
      .attr('transform', `translate(0,${innerH + 4})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(ax => { ax.select('.domain').remove() })
      .call(ax => {
        ax.selectAll<SVGTextElement, string>('text')
          .attr('fill', theme.axis).attr('font-size', '9px').attr('font-family', theme.fontFamily.data)
      })

    g.append('g')
      .attr('transform', 'translate(-4,0)')
      .call(d3.axisLeft(y).tickSize(0))
      .call(ax => { ax.select('.domain').remove() })
      .call(ax => {
        ax.selectAll<SVGTextElement, string>('text')
          .attr('fill', theme.axis).attr('font-size', '10px')
          .attr('font-family', theme.fontFamily.data).attr('text-anchor', 'end')
      })

  }, [data, width, theme.isDark, containerRef, theme.axis, theme.fontFamily.data])

  return (
    <div ref={containerRef} className="w-full relative" style={{ height: CHART_H }}>
      {(!data || width === 0) && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      )}
    </div>
  )
}
