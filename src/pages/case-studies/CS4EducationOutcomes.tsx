import { ChartFrame } from '../../components/charts/ChartFrame'
import { RiskScatter } from '../../components/charts/cs4/RiskScatter'
import { ProgramComparison } from '../../components/charts/cs4/ProgramComparison'
import { InterventionOutcome } from '../../components/charts/cs4/InterventionOutcome'
import { EngagementBars } from '../../components/charts/cs4/EngagementBars'
import { PCAScatter } from '../../components/charts/cs4/PCAScatter'
import { ScoreHeatmap } from '../../components/charts/cs4/ScoreHeatmap'

export function CS4EducationOutcomes() {
  return (
    <div className="space-y-14 mt-6">

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          At-Risk Student Segmentation
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Plotting completion rate against assessment score creates a two-dimensional view of the
          student population that separates at-risk students without requiring a complex model.
        </p>
        <ChartFrame
          title="Completion Rate × Assessment Score — at-risk flagged in vermilion"
          question="Do at-risk students cluster predictably in completion–score space, and does this hold across all programs?"
          method="Each point is one of 520 students. At-risk = top 10% by composite risk score (60% weight completion, 40% weight score). Reference lines show the median thresholds used in the initial screening."
          takeaway="At-risk students form a distinct lower-left cluster: below 50% completion AND below 65 score. This means a simple two-variable rule captures the at-risk population accurately enough for early intervention — no black-box model required. The cluster is consistent across all three programs."
          height={320}
        >
          <RiskScatter />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Program Comparison
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Comparing average completion rate and assessment score across the three programs reveals
          whether outcome differences are real or within normal variation.
        </p>
        <ChartFrame
          title="Average Completion Rate and Score — by program"
          question="Does program choice predict materially different outcomes, or are students performing similarly across programs?"
          method="Averages computed over all students in each program. Completion rate is expressed as a percentage; assessment score is on a 0–100 scale. Both metrics shown side-by-side for direct comparison."
          takeaway="All three programs perform within a similar range on both metrics — no program is systematically failing. This is a positive finding: the at-risk problem is not program-specific but individual, meaning a universal early-warning system can work across all three programs."
          height={320}
        >
          <ProgramComparison />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Intervention Effectiveness
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          For the 28 at-risk students who received intervention, comparing pre- and post-intervention
          assessment scores shows the distribution of outcomes — not just the average.
        </p>
        <ChartFrame
          title="Assessment Score — before and after intervention (box plots)"
          question="Does intervention consistently improve scores, or are gains concentrated in a subset of students?"
          method="Box plots show distribution of pre- and post-intervention assessment scores for students who received support. Outlier points shown individually. Plotly — hover for quartile details."
          takeaway="The entire post-intervention distribution shifts upward: the median improves by around 15 points and the lower quartile rises substantially. This indicates broad-based improvement rather than a few outliers pulling the average — the intervention is working consistently."
          height={320}
        >
          <InterventionOutcome />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Engagement Profile
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          The proportion of low-, medium-, and high-engagement students varies across programs,
          which influences how to calibrate support resources per program.
        </p>
        <ChartFrame
          title="Engagement Level Distribution — stacked by program"
          question="Is the mix of engagement levels similar across programs, or does one program have a disproportionately disengaged cohort?"
          method="Each student classified as low / medium / high engagement based on session attendance and interaction frequency. Bars are stacked horizontally showing count per program."
          takeaway="Low engagement is distributed fairly evenly across programs. No program carries a dramatically higher disengagement burden, confirming that engagement interventions can be deployed platform-wide rather than targeted at one specific program."
          height={252}
        >
          <EngagementBars />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          PCA — Student Feature Space
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Principal Component Analysis reduces completion rate and assessment score to orthogonal
          components, revealing how programs cluster in the underlying feature space.
        </p>
        <ChartFrame
          title="PCA Scatter — PC1 vs PC2, coloured by program"
          question="Do the three programs separate into distinct clusters in reduced feature space, or do they overlap substantially?"
          method="Features: completion rate (%) and assessment score. Both standardised to unit variance before PCA. PC1 and PC2 are the first two principal components; variance explained shown on each axis."
          takeaway="The three programs overlap considerably in PCA space, confirming that program membership is not a strong predictor of performance. The primary axis of variation (PC1) aligns with overall performance — a single continuous dimension separates high- from low-performing students across all programs, supporting a universal early-warning system."
          height={320}
        >
          <PCAScatter />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Score Distribution Heatmap
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          A frequency heatmap of assessment score bands by program shows whether each program's
          student population is spread evenly or concentrated at particular performance levels.
        </p>
        <ChartFrame
          title="Student Count Heatmap — Program × Score Band"
          question="Are students concentrated at specific score bands, and does this differ across programs?"
          method="Students binned into 20-point score bands. Cell value = number of students in each (program, band) combination. Colour intensity proportional to count."
          takeaway="The 60–80 band is the modal range across all three programs, with relatively few students at either extreme. The broadly similar distributions confirm that no program is systematically producing very high or very low scorers — supporting the finding that the at-risk problem is individual rather than program-level."
          height={320}
        >
          <ScoreHeatmap />
        </ChartFrame>
      </section>

    </div>
  )
}
