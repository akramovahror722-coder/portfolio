import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LangProvider, useLang } from './context/LangContext'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { SkillsPage } from './pages/SkillsPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { JourneyPage } from './pages/JourneyPage'
import { CertificatesPage } from './pages/CertificatesPage'
import { FaqPage } from './pages/FaqPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

/** Blog alohida yuklanadi — bosh sahifa tezroq ochiladi. */
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
)

function PageLoader() {
  const { lang } = useLang()
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex items-center gap-3 text-sm text-slate-400">
        <span className="size-4 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
        {lang === 'uz'
          ? 'Yuklanmoqda...'
          : lang === 'ru'
            ? 'Загрузка...'
            : 'Loading...'}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:id" element={<ProjectDetailPage />} />
                <Route path="journey" element={<JourneyPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="certificates" element={<CertificatesPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  )
}
