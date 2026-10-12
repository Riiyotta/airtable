import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

// Per-route shell options (measured on the live pages):
// - NO_MAIN_PAD: live /pricing (FAQ -> footer 48) and /templates (CTA card -> footer 40) have no 64px
//   bottom padding under the page content; every other route keeps <main> pb-64.
// - FOOTER_VARIANT: live /pricing renders its own footer build (see Footer.jsx variant="pricing").
const NO_MAIN_PAD = new Set(['/pricing', '/templates'])
const FOOTER_VARIANT = { '/pricing': 'pricing' }
const normalize = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p)

// Shared shell for every route: Header + Footer are rendered once here.
export default function Layout() {
  const { pathname } = useLocation()
  const route = normalize(pathname)
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  // Components use plain <a href="/path">; route same-origin clicks client-side
  // and swallow '#' placeholders (former external links) so they don't jump to top.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href]')
      if (!a || a.target === '_blank') return
      const href = a.getAttribute('href')
      if (href === '#') { e.preventDefault(); return }
      if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault()
        navigate(href)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  return (
    <>
      <Header />
      {/* relative z-0 = stacking context (original .marketing-main z-0) so in-page z-indexes (hero pause button z-10) stay under the header drawers */}
      <main className={NO_MAIN_PAD.has(route) ? 'relative z-0' : 'relative z-0 pb-[64px]'}>
        <Outlet />
      </main>
      <Footer variant={FOOTER_VARIANT[route]} />
    </>
  )
}
