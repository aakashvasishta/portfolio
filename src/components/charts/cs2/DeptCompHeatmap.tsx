import { useEffect, useMemo } from 'react'
import * as d3 from 'd3'
import { useD3 } from '../useD3'
import { useCS2Employees } from '../../../data/loaders'

const DEPTS = ['Engineering','Sales','Customer Service','Operations','Marketing','Product','Finance','HR']
const BANDS = [1, 2, 3, 4, 5]
const CHART_H = 288

export function DeptCompHeatmap() {
  const data = useCS2Employees()
  const { containerRef, width, theme } = useD3(CHART_H)

  const cells = useMemo(() => {
    if (!data) return null
    return DEPTS.flatMap(dept =>
      BANDS.map(band => {
        const emp = data.filter(e => e.department === dept && e.comp_band === band)
        return {
          dept,
          band,
          rate: emp.length > 0 ? emp.filter(e => e.attrition).length / emp.length : -1,
          count: emp.length,
        }
      }),
    )
  }, [data])

  useEffect(() => {
    if (!cells || width === 0) return
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''

    const margin = { top: 28, right: 16, bottom: 24, left: 130 }
    const innerW = width - margin.left - margin.right
    const innerH = CHART_H - margin.top - margin.bottom

    const svg = d3.select(el).append('svg').attr('width', width).attr('height', CHART_H)
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand().domain(BANDS.map(String)).range([0, innerW]).padding(0.08)
    const y = d3.scaleBand().domain(DEPTS).range([0, innerH]).padding(0.08)
    const colorFn = d3.scaleSequential([0, 0.35], d3.interpolateRgb(
      theme.isDark ? '#0F172A' : '#FFF7ED',
      '#D55E00',
    ))

    cells.forEach(({ dept, band, rate, count }) => {
      const cx = x(String(band))!
      const cy = y(dept)!
      const bw = x.bandwidth()
      const bh = y.bandwidth()
      const noData = rate < 0 || count < 3

      g.append('rect')
        .attr('x', cx).attr('y', cy)
        .attr('width', bw).attr('height', bh)
        .attr('fill', noData ? (theme.isDark ? '#1E293B' : '#F1F5F9') : colorFn(rate))
        .attr('rx', 3)

      if (!noData && bw > 20 && bh > 14) {
        g.append('text')
          .attr('x', cx + bw / 2).attr('y', cy + bh / 2)
          .attr('dy', '0.35em').attr('text-anchor', 'middle')
          .attr('fill', rate > 0.2 ? '#FFFFFF' : theme.axis)
          .attr('font-size', '9px').attr('font-family', theme.fontFamily.data)
          .text(`${Math.round(rate * 100)}%`)
      }
    })

    // Column header: "Comp Band"
    g.append('text')
      .attr('x', innerW / 2).attr('y', -14).attr('text-anchor', 'middle')
      .attr('fill', theme.axis).attr('font-size', '10px').attr('font-family', theme.fontFamily.data)
      .text('← Comp Band →')

    g.append('g')
      .attr('transform', `translate(0,${innerH + 4})`)
      .call(d3.axisBottom(x).tickSize(0).tickFormat(d => `B${d}`))
      .call(ax => { ax.select('.domain').remove() })
      .call(ax => {
        ax.selectAll<SVGTextElement, string>('text')
          .attr('fill', theme.axis).attr('font-size', '10px').attr('font-family', theme.fontFamily.data)
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

  }, [cells, width, theme.isDark, containerRef, theme.axis, theme.fontFamily.data])

  return (
    <div ref={containerRef} className="w-full relative" style={{ height: CHART_H }}>
      {(!data || !cells || width === 0) && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      )}
    </div>
  )
}
