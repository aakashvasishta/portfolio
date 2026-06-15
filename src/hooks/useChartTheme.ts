import { useState, useEffect } from 'react'
import { getChartTheme } from '../theme/chartTheme'

/** Watches <html class="dark"> and returns the active chart theme values. */
export function useChartTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  return { ...getChartTheme(isDark ? 'dark' : 'light'), isDark }
}
