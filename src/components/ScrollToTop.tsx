import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // "smooth" scroll-behavior CSS tufayli sahifa o'tishi sekin bo'lmasligi uchun
    // aniq "instant" bilan yuqoriga qaytariladi.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}
