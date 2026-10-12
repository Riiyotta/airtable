import { Link, useLocation } from 'react-router-dom'
import CtaBox from '../components/CtaBox.jsx'

// Shared placeholder for routes that aren't built out yet.
function titleFromPath(pathname) {
  const last = pathname.split('/').filter(Boolean).pop() || 'Page'
  return last.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

export default function StubPage() {
  const { pathname } = useLocation()

  return (
    <>
      <section className="mx-6 md:mx-8 pt-[64px] pb-[96px] text-center">
        <h1 className="mx-auto max-w-[760px] font-display text-[40px] leading-[48px] font-medium">
          {titleFromPath(pathname)}
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-[27px] opacity-70">
          This page is part of the local clone and hasn&apos;t been built out yet.
        </p>
        <Link to="/" className="mt-8 inline-block underline underline-offset-4">
          Back to home
        </Link>
      </section>
      <CtaBox />
    </>
  )
}
