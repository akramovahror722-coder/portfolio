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
import { AppsPage } from './pages/AppsPage'
import { JourneyPage } from './pages/JourneyPage'
import { CertificatesPage } from './pages/CertificatesPage'
import { FaqPage } from './pages/FaqPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

/** Mini-ilovalar va blog alohida yuklanadi — bosh sahifa tezroq ochiladi. */
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
)
const WeatherApp = lazy(() =>
  import('./apps/weather/WeatherApp').then((m) => ({ default: m.WeatherApp })),
)
const RecipesApp = lazy(() =>
  import('./apps/recipes/RecipesApp').then((m) => ({ default: m.RecipesApp })),
)
const NotesApp = lazy(() =>
  import('./apps/notes/NotesApp').then((m) => ({ default: m.NotesApp })),
)
const FitnessApp = lazy(() =>
  import('./apps/fitness/FitnessApp').then((m) => ({ default: m.FitnessApp })),
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
                <Route path="apps" element={<AppsPage />} />
                <Route path="apps/weather" element={<WeatherApp />} />
                <Route path="apps/recipes" element={<RecipesApp />} />
                <Route path="apps/notes" element={<NotesApp />} />
                <Route path="apps/fitness" element={<FitnessApp />} />
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
