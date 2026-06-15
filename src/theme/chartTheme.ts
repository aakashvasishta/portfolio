/** Okabe-Ito colorblind-safe palette — use in this order for all charts */
export const okabeIto = [
  '#56B4E9', // sky blue
  '#E69F00', // orange
  '#009E73', // green
  '#F0E442', // yellow
  '#0072B2', // blue
  '#D55E00', // vermilion
  '#CC79A7', // pink
] as const

export const chartTheme = {
  colors: okabeIto,

  /** Shared chart background / grid colors */
  background: { light: 'transparent', dark: 'transparent' },
  grid: { light: '#E2E8F0', dark: '#1E293B' },
  axis: { light: '#64748B', dark: '#94A3B8' },
  text: { light: '#0F172A', dark: '#F1F5F9' },

  /** Consistent typography across all three libraries */
  fontFamily: {
    ui: "'Inter', system-ui, sans-serif",
    data: "'JetBrains Mono', monospace",
  },
  fontSize: { label: 11, tick: 10 },

  /** Tooltip styling for Recharts custom tooltips */
  tooltip: {
    light: { bg: '#FFFFFF', border: '#E2E8F0', text: '#0F172A' },
    dark: { bg: '#1E293B', border: '#334155', text: '#F1F5F9' },
  },
} as const

export type ChartMode = 'light' | 'dark'

/** Returns theme values for the current mode */
export function getChartTheme(mode: ChartMode) {
  return {
    colors: chartTheme.colors,
    background: chartTheme.background[mode],
    grid: chartTheme.grid[mode],
    axis: chartTheme.axis[mode],
    text: chartTheme.text[mode],
    fontFamily: chartTheme.fontFamily,
    fontSize: chartTheme.fontSize,
    tooltip: chartTheme.tooltip[mode],
  }
}
