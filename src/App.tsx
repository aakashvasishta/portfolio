import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { CaseStudy } from './pages/CaseStudy'
import { Dashboard } from './pages/Dashboard'
import { About } from './pages/About'

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
