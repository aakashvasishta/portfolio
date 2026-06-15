import { useEffect, useMemo } from 'react'
import * as d3 from 'd3'
import { useD3 } from '../useD3'
import { useCS4Students } from '../../../data/loaders'
import { okabeIto } from '../../../theme/chartTheme'

const PROGRAMS = ['Science', 'Mathematics', 'Technology']
const ENG_LEVELS = ['low', 'medium', 'high'] as const
type EngLevel = typeof ENG_LEVELS[number]
const ENG_COLORS: Record<EngLevel, string> = { low: okabeIto[5], medium: okabeIto[1], high: okabeIto[2] }

interface EngRow { program: string; low: number; medium: number; high: number }

const CHART_H = 220

export function EngagementBars() {
  const data = useCS4Students()
  const { containerRef, width, theme } = useD3(CHART_H)

  const engData = useMemo<EngRow[] | null>(() => {
    if (!data) return null
    return PROGRAMS.map(prog => {
      const students = data.filter(s => s.program === prog)
      return {
        program: prog,
        low: students.filter(s => s.engagement_level === 'low').length,
        medium: students.filter(s => s.engagement_level === 'medium').length,
        high: students.filter(s => s.engagement_level === 'high').length,
      }
    })
  }, [data])

  useEffect(() => {
    if (!engData || width === 0) return
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''

    const margin = { top: 16, right: 16, bottom: 40, left: 90 }
    const innerW = width - margin.left - margin.right
    const innerH = CHART_H - margin.top - margin.bottom

    const svg = d3.select(el).append('svg').attr('width', width).attr('height', CHART_H)
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const maxTotal = d3.max(engData, d => d.low + d.medium + d.high) ?? 200
    const x = d3.scaleLinear().domain([0, maxTotal]).range([0, innerW]).nice()
    const y = d3.scaleBand().domain(PROGRAMS).range([0, innerH]).padding(0.3)

    const stack = d3.stack<EngRow>().keys([...ENG_LEVELS])
    const layers = stack(engData)

    layers.forEach(layer => {
      const lvl = layer.key as EngLevel
      g.selectAll<SVGRectElement, d3.SeriesPoint<EngRow>>(`rect.${lvl}`)
        .data(layer)
        .join('rect')
        .attr('class', lvl)
        .attr('x', d => x(d[0]))
        .attr('y', d => y(d.data.program)!)
        .attr('width', d => Math.max(0, x(d[1]) - x(d[0])))
        .attr('height', y.bandwidth())
        .attr('fill', ENG_COLORS[lvl])
        .attr('opacity', 0.82)
        .attr('rx', 2)
    })

    g.append('g')
      .attr('transform', `translate(0,${innerH + 4})`)
      .call(d3.axisBottom(x).ticks(5).tickSize(0))
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
          .attr('fill', theme.axis).attr('font-size', '11px').attr('font-family', theme.fontFamily.data)
          .attr('text-anchor', 'end')
      })

    // Legend
    ENG_LEVELS.forEach((lvl, i) => {
      const lx = i * 80
      g.append('rect').attr('x', lx).attr('y', innerH + 22).attr('width', 10).attr('height', 10)
        .attr('fill', ENG_COLORS[lvl]).attr('rx', 2)
      g.append('text').attr('x', lx + 14).attr('y', innerH + 30).attr('fill', theme.axis)
        .attr('font-size', '10px').attr('font-family', theme.fontFamily.data).text(lvl)
    })

  }, [engData, width, theme.isDark, containerRef, theme.axis, theme.fontFamily.data])

  return (
    <div ref={containerRef} className="w-full relative" style={{ height: CHART_H }}>
      {(!data || !engData || width === 0) && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      )}
    </div>
  )
}
