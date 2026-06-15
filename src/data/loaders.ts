/**
 * Typed data-loading hooks — fetch JSON from /public/data and return typed arrays.
 *
 * Usage: const employees = useCS2Employees()
 * Returns null while loading; log errors to console (no UI error state for Phase 3).
 */
import { useState, useEffect } from 'react'
import type {
  CS1Customer, CS1ParetoRow, CS1CohortRow, CS1TimelinePoint, CS1CategoryNode,
  CS2Employee,
  CS3FunnelStage, CS3Sankey, CS3Kpis, CS3CohortRow, CS3Intervention,
  CS4Student,
} from './schemas'

function useJson<T>(path: string): T | null {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    let active = true
    fetch(path)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status} for ${path}`); return r.json() as Promise<T> })
      .then((d) => { if (active) setData(d) })
      .catch(console.error)
    return () => { active = false }
  }, [path])
  return data
}

// ── CS1 ───────────────────────────────────────────────────────────────────────
export const useCS1Customers    = () => useJson<CS1Customer[]>('/data/cs1-customers.json')
export const useCS1Pareto       = () => useJson<CS1ParetoRow[]>('/data/cs1-pareto.json')
export const useCS1Cohorts      = () => useJson<CS1CohortRow[]>('/data/cs1-cohort-retention.json')
export const useCS1Timeline     = () => useJson<CS1TimelinePoint[]>('/data/cs1-revenue-timeline.json')
export const useCS1Categories   = () => useJson<CS1CategoryNode>('/data/cs1-revenue-categories.json')

// ── CS2 ───────────────────────────────────────────────────────────────────────
export const useCS2Employees    = () => useJson<CS2Employee[]>('/data/cs2-employees.json')

// ── CS3 ───────────────────────────────────────────────────────────────────────
export const useCS3Funnel         = () => useJson<CS3FunnelStage[]>('/data/cs3-funnel.json')
export const useCS3Sankey         = () => useJson<CS3Sankey>('/data/cs3-sankey.json')
export const useCS3Kpis           = () => useJson<CS3Kpis>('/data/cs3-kpis.json')
export const useCS3Cohorts        = () => useJson<CS3CohortRow[]>('/data/cs3-cohorts.json')
export const useCS3Interventions  = () => useJson<CS3Intervention[]>('/data/cs3-interventions.json')

// ── CS4 ───────────────────────────────────────────────────────────────────────
export const useCS4Students     = () => useJson<CS4Student[]>('/data/cs4-students.json')
