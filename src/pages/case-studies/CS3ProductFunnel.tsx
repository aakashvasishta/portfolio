import { ChartFrame } from '../../components/charts/ChartFrame'
import { FunnelDiagram } from '../../components/charts/cs3/FunnelDiagram'
import { SankeyDiagram } from '../../components/charts/cs3/SankeyDiagram'
import { KpiScorecard } from '../../components/charts/cs3/KpiScorecard'
import { CohortEngagement } from '../../components/charts/cs3/CohortEngagement'
import { InterventionImpact } from '../../components/charts/cs3/InterventionImpact'

export function CS3ProductFunnel() {
  return (
    <div className="space-y-14 mt-6">

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Learner Journey Funnel
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          The funnel traces 10,000 registrations through eight stages to 900 certified completers
          — a 9% end-to-end conversion rate with predictable drop-off points.
        </p>
        <ChartFrame
          title="Registration → Certified Funnel — % of original cohort shown"
          question="Where in the learner journey does the greatest volume of drop-off occur?"
          method="Each stage tracks users who completed that milestone. Drop-off = users who did not reach the next stage. Percentages are relative to the Registration cohort."
          takeaway="The largest absolute drop is between Registration and Onboarding Complete (28% drop, 2,800 learners lost). This is the highest-leverage fix: a smarter onboarding flow that gets users to their first lesson has more impact than any downstream optimisation."
          height={320}
        >
          <FunnelDiagram />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Traffic Source → Outcome Flow
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          A Sankey diagram maps acquisition channels through engagement behaviour to final outcomes,
          showing which sources produce engaged learners vs. passive viewers.
        </p>
        <ChartFrame
          title="Sankey: Source → Journey Type → Outcome"
          question="Which acquisition channels produce learners who complete vs. drop out?"
          method="Flow width is proportional to learner count. Source nodes = acquisition channels; journey nodes = behavioural segment; outcome nodes = final status. Hover for exact counts."
          takeaway="Organic Search delivers more Active Learners proportionally than Paid Ads, despite similar volume. Paid Ads over-index on Passive Viewers who overwhelmingly drop out. Shifting ad spend toward organic lookalike audiences or content-led acquisition could improve certified completion rate significantly."
          height={320}
        >
          <SankeyDiagram />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          KPI Dashboard
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Every intervention maps to the North Star metric — Weekly Active Learners — via a set of
          supporting KPIs that show current performance, target, and trend direction.
        </p>
        <ChartFrame
          title="North Star + Supporting KPIs — current vs. target with 6-week trend"
          question="Which leading indicators are furthest from target and have the fastest-improving trend?"
          method="North Star = 7-day active learner count. Supporting KPIs selected for causal proximity to the North Star. Sparklines show 6-week rolling values. Progress bar = current ÷ target."
          takeaway="Completion Rate (31% vs. 50% target) and NPS (42 vs. 60 target) are the most off-track metrics — and both have stalled trends. Week-2 Retention is closest to target with the most consistent improvement, suggesting the retention loop improvements are working."
          height={380}
        >
          <KpiScorecard />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Cohort Engagement Retention
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Tracking six learner cohorts across 12 weeks reveals when engagement drops and whether
          later cohorts are improving — the key signal that product changes are working.
        </p>
        <ChartFrame
          title="Weekly Engagement Heatmap — % of cohort still active"
          question="Do later cohorts retain better than earlier ones, and when does the steepest drop occur?"
          method="Each row = a 6-week learner cohort. Values show % still engaging in that subsequent week. W0 = 100% by definition."
          takeaway="All cohorts lose 35–40% of learners in Week 1 — a consistent early-churn signal that pre-dates any product change. The drop stabilises around 25–30% by Week 4. Later cohorts show marginally better retention in Weeks 3–6, an early sign that the Week 2 nudge campaign is having an effect."
          height={280}
        >
          <CohortEngagement />
        </ChartFrame>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Intervention Impact
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Three proposed interventions were modelled against their target stage metric. The delta
          shows the incremental rate improvement and translates to the North Star via causal pathway.
        </p>
        <ChartFrame
          title="Before / After — Rate improvement per intervention"
          question="Which intervention produces the largest metric movement at its target stage?"
          method="Before = observed rate at the target funnel stage. After = projected rate based on intervention design and historical analogues. Delta shown in percentage points (pp)."
          takeaway="Assessment Redesign produces the largest relative improvement (+14pp pass rate), but Smarter Onboarding unlocks the most incremental learners in absolute terms (+1,200) because it acts at the widest funnel stage. Prioritising onboarding is the highest-ROI first move."
          height={320}
        >
          <InterventionImpact />
        </ChartFrame>
      </section>

    </div>
  )
}
