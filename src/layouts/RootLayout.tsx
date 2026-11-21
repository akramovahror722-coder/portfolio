import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BackToTop } from '../components/BackToTop'
import { ScrollToTop } from '../components/ScrollToTop'

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <ScrollToTop />
      <Navbar />
      <main key={location.pathname} className="page-enter flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
