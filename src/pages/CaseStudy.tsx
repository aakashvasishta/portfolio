import { useParams, Link } from 'react-router-dom'
import { caseStudies } from '../data/caseStudies'
import { Tag } from '../components/ui/Tag'
import { CS1EcommerceRevenue } from './case-studies/CS1EcommerceRevenue'
import { CS2HRAttrition } from './case-studies/CS2HRAttrition'
import { CS3ProductFunnel } from './case-studies/CS3ProductFunnel'
import { CS4EducationOutcomes } from './case-studies/CS4EducationOutcomes'

function CaseStudyContent({ slug }: { slug: string }) {
  switch (slug) {
    case 'ecommerce-revenue': return <CS1EcommerceRevenue />
    case 'hr-attrition':      return <CS2HRAttrition />
    case 'product-funnel':    return <CS3ProductFunnel />
    case 'education-outcomes': return <CS4EducationOutcomes />
    default: return null
  }
}

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-slate-500 dark:text-slate-400">Case study not found.</p>
        <Link to="/work" className="mt-4 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to work
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/work" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Work
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 dark:text-slate-100">{study.title}</span>
      </nav>

      {/* Header */}
      <div
        className="h-1 w-16 rounded-full mb-6"
        style={{ backgroundColor: study.accentColor }}
      />
      <p className="text-sm font-mono text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wide">
        Case study
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
        {study.title}
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">
        {study.subtitle}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {study.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
        {study.libraries.map((lib) => (
          <Tag key={lib} label={lib} variant="library" />
        ))}
      </div>

      {/* Dataset disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-300 mb-2">
        <strong>Dataset note:</strong> Dataset regenerated to match the original
        project's scale; figures are illustrative. The analysis approach and
        findings reflect real work.
      </div>

      {/* Case study charts */}
      <CaseStudyContent slug={study.slug} />
    </div>
  )
}
