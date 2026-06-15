interface TagProps {
  label: string
  variant?: 'default' | 'library'
}

export function Tag({ label, variant = 'default' }: TagProps) {
  const base = 'inline-block px-2 py-0.5 rounded text-xs font-medium'
  const styles =
    variant === 'library'
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'

  return <span className={`${base} ${styles}`}>{label}</span>
}
