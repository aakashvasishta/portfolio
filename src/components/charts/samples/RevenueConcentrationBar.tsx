/**
 * Sample chart — Phase 2 end-to-end demo.
 * Shows revenue share by customer decile; top 20% highlighted.
 * Data is synthetic, matching the scale of the real CS1 dataset.
 */
import {
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { useChartTheme } from '../../../hooks/useChartTheme'
import {
  ThemedXAxis,
  ThemedYAxis,
  ThemedCartesianGrid,
  ThemedTooltip,
} from '../RechartsTheme'
import { okabeIto } from '../../../theme/chartTheme'

const data = [
  { decile: 'D1', label: 'Top 10%', share: 52 },
  { decile: 'D2', label: '11–20%', share: 28 },
  { decile: 'D3', label: '21–30%', share: 9 },
  { decile: 'D4', label: '31–40%', share: 5 },
  { decile: 'D5', label: '41–50%', share: 3 },
  { decile: 'D6', label: '51–60%', share: 1.5 },
  { decile: 'D7', label: '61–70%', share: 1 },
  { decile: 'D8', label: '71–100%', share: 0.5 },
]

const TOP_TWO_THRESHOLD = 2 // first 2 bars = top 20% of customers

export function RevenueConcentrationBar() {
  const theme = useChartTheme()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <ThemedCartesianGrid />
        <ThemedXAxis dataKey="decile" />
        <ThemedYAxis
          tickFormatter={(v: number) => `${v}%`}
          domain={[0, 60]}
          width={36}
        />
        <ThemedTooltip />

        {/* 80% cumulative reference — top 2 bars */}
        <ReferenceLine
          x="D2"
          stroke={theme.isDark ? '#818cf8' : '#6366f1'}
          strokeDasharray="4 4"
          strokeWidth={1.5}
          label={{
            value: '← 80% of revenue',
            position: 'insideTopRight',
            fill: theme.isDark ? '#818cf8' : '#6366f1',
            fontFamily: theme.fontFamily.data,
            fontSize: 10,
          }}
        />

        <Bar dataKey="share" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {data.map((entry, index) => (
            <Cell
              key={entry.decile}
              fill={index < TOP_TWO_THRESHOLD ? okabeIto[0] : `${okabeIto[0]}55`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
