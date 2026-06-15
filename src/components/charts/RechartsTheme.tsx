/**
 * Themed Recharts primitive wrappers.
 * Drop-in replacements for XAxis, YAxis, CartesianGrid, and Tooltip that
 * automatically apply the shared chart theme and update on dark-mode toggle.
 *
 * Usage:
 *   import { ThemedXAxis, ThemedYAxis, ThemedCartesianGrid, ThemedTooltip } from '../RechartsTheme'
 */
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useChartTheme } from '../../hooks/useChartTheme'

type XAxisProps = React.ComponentProps<typeof XAxis>
type YAxisProps = React.ComponentProps<typeof YAxis>
type CartesianGridProps = React.ComponentProps<typeof CartesianGrid>
type TooltipProps = React.ComponentProps<typeof Tooltip>
type LegendProps = React.ComponentProps<typeof Legend>
type ResponsiveContainerProps = React.ComponentProps<typeof ResponsiveContainer>

export function ThemedXAxis(props: XAxisProps) {
  const theme = useChartTheme()
  return (
    <XAxis
      tick={{
        fill: theme.axis,
        fontFamily: theme.fontFamily.data,
        fontSize: theme.fontSize.tick,
      }}
      axisLine={{ stroke: theme.grid }}
      tickLine={false}
      {...props}
    />
  )
}

export function ThemedYAxis(props: YAxisProps) {
  const theme = useChartTheme()
  return (
    <YAxis
      tick={{
        fill: theme.axis,
        fontFamily: theme.fontFamily.data,
        fontSize: theme.fontSize.tick,
      }}
      axisLine={false}
      tickLine={false}
      width={40}
      {...props}
    />
  )
}

export function ThemedCartesianGrid(props: CartesianGridProps) {
  const theme = useChartTheme()
  return (
    <CartesianGrid
      stroke={theme.grid}
      strokeDasharray="3 3"
      vertical={false}
      {...props}
    />
  )
}

export function ThemedTooltip(props: TooltipProps) {
  const theme = useChartTheme()
  return (
    <Tooltip
      contentStyle={{
        backgroundColor: theme.tooltip.bg,
        border: `1px solid ${theme.tooltip.border}`,
        borderRadius: '8px',
        fontFamily: theme.fontFamily.data,
        fontSize: 12,
        color: theme.tooltip.text,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.12)',
        padding: '8px 12px',
      }}
      labelStyle={{ fontWeight: 600, marginBottom: 4 }}
      cursor={{ fill: theme.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}
      {...props}
    />
  )
}

export function ThemedLegend(props: LegendProps) {
  const theme = useChartTheme()
  return (
    <Legend
      wrapperStyle={{
        fontFamily: theme.fontFamily.data,
        fontSize: 11,
        color: theme.axis,
      }}
      {...props}
    />
  )
}

/** Full-width responsive container — use as the outermost wrapper for all Recharts charts. */
export function ChartResponsiveContainer(props: Omit<ResponsiveContainerProps, 'width'>) {
  return <ResponsiveContainer width="100%" {...props} />
}
