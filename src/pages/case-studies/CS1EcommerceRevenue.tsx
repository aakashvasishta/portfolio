import { ChartFrame } from '../../components/charts/ChartFrame'
import { ChartGlossary } from '../../components/ui/ChartGlossary'
import { ParetoChart } from '../../components/charts/cs1/ParetoChart'
import { CohortHeatmap } from '../../components/charts/cs1/CohortHeatmap'
import { RevenueTimeline } from '../../components/charts/cs1/RevenueTimeline'
import { SegmentProfile } from '../../components/charts/cs1/SegmentProfile'
import { CategoryTreemap } from '../../components/charts/cs1/CategoryTreemap'
import { VolcanoPlot } from '../../components/charts/cs1/VolcanoPlot'

export function CS1EcommerceRevenue() {
  return (
    <div className="space-y-14 mt-6">

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Revenue Concentration
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Ranking 2,000 customers by total spend and grouping them into deciles reveals an extreme
          Pareto effect — the top decile alone accounts for over three-quarters of all revenue.
        </p>
        <ChartFrame
          figNum={1}
          title="Customer Revenue Pareto — bars show decile share, line shows cumulative"
          question="How concentrated is revenue across the customer base?"
          method="Customers ranked by 2-year total spend and split into equal-sized deciles (200 each). Bars = revenue share per decile; line = running cumulative."
          takeaway="D1 (top 10%) holds 77% of revenue. Add D2 and you reach 84% — the entire bottom 80% of customers contributes just 16%. Retention strategy should be almost entirely focused on the top decile."
          height={320}
        >
          <ParetoChart />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Cohort Retention
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Tracking 10 monthly cohorts over 12 months shows when customers stop returning —
          a critical signal for lifecycle email and re-engagement campaign timing.
        </p>
        <ChartFrame
          figNum={2}
          title="Monthly Cohort Retention Heatmap — % of cohort still active"
          question="At which month do cohorts lose the most customers, and does this vary by cohort?"
          method="Each row is a customer cohort (acquisition month). Values show what % of the original cohort made a purchase in that subsequent month. M0 = 100% by definition."
          takeaway="The steepest drop occurs between M0 and M1 (roughly 35–40% of customers churn immediately). Cohorts that clear M2 stabilise at around 25–30%, suggesting a 60-day window is the key re-engagement target."
          height={320}
        >
          <CohortHeatmap />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Revenue Timeline
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Two years of weekly revenue shows a consistent Q4 seasonal spike, making
          inventory and campaign planning highly predictable.
        </p>
        <ChartFrame
          figNum={3}
          title="Weekly Revenue — 2022–2023"
          question="What is the underlying growth trend and how pronounced is Q4 seasonality?"
          method="104 weekly aggregates from transaction logs. Trend estimated visually; Q4 windows are October–December for both years."
          takeaway="Baseline revenue grew ~40% year-over-year. Q4 spikes reach 1.5–2× the off-peak baseline, confirming that capacity planning (inventory, support, fulfilment) should scale up from early October each year."
          height={320}
        >
          <RevenueTimeline />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          RFM Segment Profile
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          RFM scoring (Recency, Frequency, Monetary) partitions the customer base into seven
          actionable segments. Bar length shows % of customers; right label shows % of revenue.
        </p>
        <ChartFrame
          figNum={4}
          title="Segment Size vs Revenue Contribution"
          question="Which segments are over- or under-represented in revenue relative to their customer share?"
          method="Customers scored on R/F/M (1–5 each). Composite score maps to seven named segments. Bars = % customers; right labels = % revenue contributed."
          takeaway="Green segments (Champions, Loyal, Potential Loyalist, Promising) make up ~46% of customers but contribute the vast majority of revenue. The 'Promising' segment — the largest at 44% — represents the biggest growth lever: small increases in purchase frequency here move the top line significantly."
          height={320}
        >
          <SegmentProfile />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Revenue by Category
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          A two-level treemap breaks down revenue by the 8 top-level categories and their
          subcategories, revealing where category investments pay off most.
        </p>
        <ChartFrame
          figNum={5}
          title="Category Revenue Treemap — area proportional to revenue"
          question="Which categories and subcategories drive the most revenue?"
          method="Total 2-year revenue attributed to each category and subcategory from transaction records. Area is proportional to revenue."
          takeaway="Category concentration mirrors customer concentration — a handful of categories dominate. Hover to explore subcategory contributions. This informs assortment and promotional budget allocation."
          height={320}
        >
          <CategoryTreemap />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Channel A/B Test Significance
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Running 80 marketing experiments across five channels produces a distribution of
          effect sizes and p-values. A volcano plot separates the few truly effective variants
          from the noise in a single view.
        </p>
        <ChartFrame
          figNum={6}
          title="Marketing Experiment Volcano Plot — effect size vs statistical significance"
          question="Which channel experiments produced reliably higher conversion, and which variants should be killed?"
          method="Each point is one A/B test variant. X axis = log₂(conversion rate / baseline). Y axis = −log₁₀(p-value). Dashed lines mark significance threshold (p < 0.05) and minimum effect size (log₂FC > 0.5). Colour = marketing channel."
          takeaway="Search and Social variants cluster in the top-right (high lift, high confidence), making them the priority budget recipients. Several Display and Email variants fall below the significance line despite appearing to lift conversions — these should be paused rather than scaled."
          height={320}
        >
          <VolcanoPlot />
        </ChartFrame>
      </section>

      <ChartGlossary rows={[
        {
          fig: 1,
          chartType: 'Pareto Chart (bar + line composition)',
          x: 'customer decile — ordinal, 10 ranked groups',
          y: 'revenue share % (bars) and cumulative % (line, dual-axis)',
          note: 'Bar + line composition that reveals 80/20 concentration in ranked categorical data. The line\'s inflection point marks where marginal revenue contribution collapses.',
        },
        {
          fig: 2,
          chartType: 'Cohort Heatmap',
          x: 'months since acquisition M0–M11 — ordinal time axis',
          y: 'acquisition cohort — nominal (10 rows) · colour: retention rate (continuous 0–100%)',
          note: 'Matrix visualisation tracking how a single continuous metric evolves across two ordinal dimensions simultaneously. Best for spotting when and where a metric decays across cohorts.',
        },
        {
          fig: 3,
          chartType: 'Area Chart',
          x: 'calendar week — continuous time series (104 weeks)',
          y: 'weekly revenue — continuous monetary value',
          note: 'Time-series with gradient fill emphasising volume. Reveals trend, cyclical seasonality, and year-over-year growth rate in a single view.',
        },
        {
          fig: 4,
          chartType: 'Horizontal Bar Chart',
          x: 'customer count and revenue % — two continuous measures shown together',
          y: 'RFM segment — nominal (7 segments, health-grouped)',
          note: 'Dual-value horizontal bars surfacing the gap between segment size and revenue contribution. Colour encodes a third dimension (healthy vs. at-risk segment).',
        },
        {
          fig: 5,
          chartType: 'Treemap (hierarchical area chart)',
          x: 'revenue — continuous, encoded as tile area',
          y: 'product category → subcategory — nested nominal hierarchy',
          note: 'Part-to-whole visualisation for nested categorical data. Area is proportional to the measure, making dominant categories immediately visible without a sorted axis.',
        },
        {
          fig: 6,
          chartType: 'Volcano Plot (significance scatter)',
          x: 'log₂(fold change vs baseline) — continuous, signed effect size',
          y: '−log₁₀(p-value) — continuous statistical confidence',
          note: 'Bivariate scatter for multiple-hypothesis testing. The top-right and top-left quadrants (beyond both threshold lines) contain experiments that are both large in effect and statistically robust — safe to act on.',
        },
      ]} />

    </div>
  )
}
