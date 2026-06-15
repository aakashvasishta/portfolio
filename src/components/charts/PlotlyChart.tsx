/**
 * Themed Plotly wrapper — lazy-loaded (Plotly is large), dark-mode-aware.
 *
 * Usage:
 *   <PlotlyChart data={traces} layout={{ title: 'My chart' }} height={360} />
 */
import { Suspense, lazy, useMemo } from 'react'
import type { Data, Layout, Config } from 'plotly.js'
import { useChartTheme } from '../../hooks/useChartTheme'

const Plot = lazy(() => import('react-plotly.js'))

interface PlotlyChartProps {
  data: Data[]
  layout?: Partial<Layout>
  config?: Partial<Config>
  height?: number
  className?: string
}

/** Build a themed Plotly layout merged on top of user overrides */
function useThemedLayout(
  userLayout: Partial<Layout> = {},
  height: number,
): Partial<Layout> {
  const theme = useChartTheme()

  return useMemo(
    () => ({
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      height,
      font: {
        family: theme.fontFamily.data,
        size: theme.fontSize.tick,
        color: theme.axis,
      },
      xaxis: {
        gridcolor: theme.grid,
        linecolor: theme.grid,
        zerolinecolor: theme.grid,
        tickfont: { size: theme.fontSize.tick },
        ...((userLayout as Record<string, unknown>).xaxis as object | undefined),
      },
      yaxis: {
        gridcolor: theme.grid,
        linecolor: theme.grid,
        zerolinecolor: theme.grid,
        tickfont: { size: theme.fontSize.tick },
        ...((userLayout as Record<string, unknown>).yaxis as object | undefined),
      },
      legend: {
        font: { size: theme.fontSize.label },
        bgcolor: 'transparent',
        ...((userLayout as Record<string, unknown>).legend as object | undefined),
      },
      margin: { l: 48, r: 16, t: 24, b: 40 },
      ...userLayout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme.isDark, height, JSON.stringify(userLayout)],
  )
}

const defaultConfig: Partial<Config> = {
  displayModeBar: false,
  responsive: true,
}

export function PlotlyChart({
  data,
  layout = {},
  config = {},
  height = 320,
  className = '',
}: PlotlyChartProps) {
  const themedLayout = useThemedLayout(layout, height)

  return (
    <Suspense
      fallback={
        <div
          className="flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-mono"
          style={{ height }}
        >
          Loading chart…
        </div>
      }
    >
      <Plot
        data={data}
        layout={themedLayout}
        config={{ ...defaultConfig, ...config }}
        style={{ width: '100%', height }}
        className={className}
        useResizeHandler
      />
    </Suspense>
  )
}
