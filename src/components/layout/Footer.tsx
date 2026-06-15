export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            AV
          </span>
          <span>Aakash Vasishta</span>
        </div>
        <p>Built with React · D3 · Recharts · Plotly</p>
        <p>&copy; {new Date().getFullYear()} Aakash Vasishta</p>
      </div>
    </footer>
  )
}
