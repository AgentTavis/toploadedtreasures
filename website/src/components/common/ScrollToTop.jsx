import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset scroll on route change (Home <-> Shop).
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
