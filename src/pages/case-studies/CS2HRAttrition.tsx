import { ChartFrame } from '../../components/charts/ChartFrame'
import { ChartGlossary } from '../../components/ui/ChartGlossary'
import { AttritionByDept } from '../../components/charts/cs2/AttritionByDept'
import { RiskDistribution } from '../../components/charts/cs2/RiskDistribution'
import { SatisfactionScatter } from '../../components/charts/cs2/SatisfactionScatter'
import { TenureAttrition } from '../../components/charts/cs2/TenureAttrition'
import { DeptCompHeatmap } from '../../components/charts/cs2/DeptCompHeatmap'
import { CorrelationMatrix } from '../../components/charts/cs2/CorrelationMatrix'

export function CS2HRAttrition() {
  return (
    <div className="space-y-14 mt-6">

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Attrition by Department
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Sorting departments by attrition rate immediately separates high-risk functions (Customer
          Service, Sales) from stable ones, and anchors every subsequent analysis.
        </p>
        <ChartFrame
          figNum={1}
          title="Attrition Rate by Department — sorted high to low"
          question="Which departments have attrition rates significantly above the company average?"
          method="Attrition rate = employees who left ÷ total headcount per department over the observation period. Vermilion bars exceed the company average; green bars are below it."
          takeaway="Customer Service and Sales attrition is 2–3× higher than Engineering and Finance. A targeted retention programme for these two departments would cover the majority of avoidable attrition cost."
          height={320}
        >
          <AttritionByDept />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Risk Score Distribution
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Each employee has a composite risk score (0–100) derived from tenure, compensation band, and
          satisfaction. Stacking retained vs. departed employees shows how well the score predicts
          actual attrition.
        </p>
        <ChartFrame
          figNum={2}
          title="Risk Score Histogram — retained (light) vs. departed (solid)"
          question="Does the risk model score correctly separate employees who left from those who stayed?"
          method="Risk score buckets of 20 points. Each bar = total employees in bucket; darker segment = departed. A well-calibrated model should have high attrition in the 60–100 buckets."
          takeaway="The 60–100 risk band has a markedly higher proportion of actual attrition, validating that the composite score is predictive. Focus intervention programmes on employees scoring above 60."
          height={320}
        >
          <RiskDistribution />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Satisfaction vs Performance
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Plotting satisfaction against performance rating, coloured by whether the employee left,
          reveals whether attrition is driven by disengagement, underperformance, or both.
        </p>
        <ChartFrame
          figNum={3}
          title="Satisfaction × Performance — green stayed, vermilion left"
          question="Are employees who leave concentrated in a particular satisfaction–performance quadrant?"
          method="Each point is one employee. Satisfaction is a 0–10 survey score; performance is manager-rated 1–5. Colour indicates actual attrition outcome."
          takeaway="Departed employees are concentrated in the low-satisfaction region (below 5) across all performance levels — meaning even high performers leave when dissatisfied. The fix is not performance management; it is satisfaction and manager quality."
          height={320}
        >
          <SatisfactionScatter />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Tenure & Attrition Risk
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Grouping employees by tenure bucket shows the classic U-shaped attrition pattern — high
          early, declining with experience, then rising again near the 5-year mark.
        </p>
        <ChartFrame
          figNum={4}
          title="Attrition Rate by Tenure Bracket"
          question="Does attrition risk change with seniority, and if so when is the most vulnerable window?"
          method="Employees grouped into 5 tenure brackets. Attrition rate = departed ÷ headcount within each bracket. Bars highlight brackets above 80% of the peak rate."
          takeaway="The under-1-year cohort has the highest attrition rate, pointing to onboarding quality as the highest-leverage intervention. A second peak often emerges at the 3–5 year mark — targeting career development conversations at the 2.5-year milestone can pre-empt this."
          height={320}
        >
          <TenureAttrition />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Department × Compensation Band Risk
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          A two-dimensional heatmap shows which department–compensation combinations carry the highest
          attrition risk, enabling surgical budget adjustments.
        </p>
        <ChartFrame
          figNum={5}
          title="Attrition Rate Heatmap — Department × Comp Band"
          question="Are there specific department and compensation intersections with disproportionately high attrition?"
          method="Cells show attrition rate for each (department, comp band) combination. White/grey cells have too few employees for a reliable rate. Band 1 = lowest, Band 5 = highest pay."
          takeaway="Low comp bands in high-churn departments (Customer Service B1–B2, Sales B1–B2) are the hottest cells. A targeted comp adjustment for these specific intersections — rather than a blanket raise — would address most of the problem at a fraction of the cost."
          height={320}
        >
          <DeptCompHeatmap />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Feature Correlation Matrix
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          A pairwise Pearson correlation matrix across the four key numeric HR metrics reveals
          which variables move together — and which are genuinely independent signals.
        </p>
        <ChartFrame
          figNum={6}
          title="Pearson Correlation Matrix — HR numeric features"
          question="Are satisfaction, performance, risk score, and comp band correlated, or do they measure distinct dimensions?"
          method="Pearson correlation computed pairwise across all 1,400 employees. Values range from −1 (perfect inverse relationship) to +1 (perfect positive relationship). Diagonal is always 1 by definition."
          takeaway="Risk score is strongly negatively correlated with satisfaction — as expected, since satisfaction is a primary input to the risk model. Performance and comp band are weakly positive, confirming that higher performers tend to sit in higher pay bands. Satisfaction and performance are nearly uncorrelated, meaning dissatisfied employees are not necessarily underperformers."
          height={340}
        >
          <CorrelationMatrix />
        </ChartFrame>
      </section>

      <ChartGlossary rows={[
        {
          fig: 1,
          chartType: 'Horizontal Bar Chart',
          x: 'attrition rate % — continuous measure',
          y: 'department — nominal, sorted descending by rate',
          note: 'Ranked horizontal bars that surface which categories exceed a reference threshold. Colour encodes above/below-average status as a third binary dimension.',
        },
        {
          fig: 2,
          chartType: 'Stacked Histogram',
          x: 'risk score bucket — ordinal (5 bands of 20 points each)',
          y: 'employee count — discrete · colour: attrition outcome (binary, stacked)',
          note: 'Stacked frequency chart showing two groups within each bin. The relative size of the solid segment at each bin reveals how well a scoring model separates outcome classes.',
        },
        {
          fig: 3,
          chartType: 'Scatter Plot',
          x: 'satisfaction score — continuous (0–10)',
          y: 'performance rating — continuous (1–5) · colour: attrition (binary)',
          note: 'Bivariate scatter using colour as a third variable to reveal which region of a 2D feature space is most predictive of an outcome. Useful for identifying dominant drivers among correlated variables.',
        },
        {
          fig: 4,
          chartType: 'Bar Chart',
          x: 'tenure bracket — ordinal (5 career-stage groups)',
          y: 'attrition rate % — continuous',
          note: 'Ordered categorical bars showing how a rate metric varies across a natural sequence. Colour highlights bars above a threshold relative to the peak, not an absolute value.',
        },
        {
          fig: 5,
          chartType: 'D3 Heatmap (two-dimensional rate matrix)',
          x: 'compensation band — ordinal (1–5)',
          y: 'department — nominal (8 rows) · colour: attrition rate (continuous)',
          note: 'Two-dimensional rate matrix that reveals interaction effects invisible in separate univariate charts. Cells with insufficient data are suppressed to avoid misleading rates from small samples.',
        },
        {
          fig: 6,
          chartType: 'Correlation Matrix (annotated heatmap)',
          x: 'HR metric — nominal (axis label)',
          y: 'HR metric — nominal (axis label) · colour: Pearson r (continuous −1 to +1)',
          note: 'Symmetric heatmap where each cell encodes the linear relationship between a variable pair. A diverging colorscale centred at zero makes positive and negative correlations equally readable at a glance.',
        },
      ]} />

    </div>
  )
}
