/**
 * Hook for D3 charts — provides a container ref, measured dimensions, and
 * the active chart theme. Wires up a ResizeObserver so charts reflow on resize.
 *
 * Usage:
 *   const { containerRef, width, height, theme } = useD3(320)
 *   useEffect(() => { if (!width) return; d3Render(containerRef.current!, width, height) }, [width, theme.isDark])
 */
import { useRef, useState, useEffect } from 'react'
import { useChartTheme } from '../../hooks/useChartTheme'

export function useD3(fixedHeight: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const theme = useChartTheme()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    setWidth(el.clientWidth)

    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setWidth(w)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { containerRef, width, height: fixedHeight, theme }
}
