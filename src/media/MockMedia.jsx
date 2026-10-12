import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { SCENES, KINDS } from './scenes.jsx'
import { THEMES } from './palette.js'
import { makeRng } from './rng.js'
import { pickKind } from './pickKind.js'
import './media.css'

// <MockMedia kind seed theme hint ratio bare />
// Original inline-SVG illustration that fills 100% of its (positioned) parent. The parent keeps its
// own measured size, radius and background; this layer is absolutely positioned so it never
// affects layout.
//   kind:  one of KINDS (grid, kanban, calendar, gallery, timeline, dashboard, form, interface,
//          automation, ai, hub, gradient, bars, story, glyph). Omit to pick from `hint`.
//   seed:  number | string — same seed → same scene.
//   theme: 'light' | 'dark'
//   hint:  copy describing the slot (title/label) used when `kind` is omitted.
//   ratio: initial aspect ("892/383" or number) used before the box is measured.
//   bare:  product window fills the box edge-to-edge (no backdrop / inset).
// Static: no animation, so prefers-reduced-motion needs nothing extra.
export { KINDS }

function parseRatio(ratio) {
  if (typeof ratio === 'number') return ratio
  if (typeof ratio === 'string') {
    const [a, b] = ratio.split('/').map(Number)
    if (a > 0 && b > 0) return a / b
    if (a > 0 && !b) return a
  }
  return 4 / 3
}

// viewBox height follows the box height (clamped) so labels stay a readable, consistent size;
// width follows the box aspect so scenes lay out for the actual slot shape.
function toBox(w, h) {
  const H = Math.round(Math.min(560, Math.max(200, h * 0.75)) / 10) * 10
  const a = Math.round((w / h) * 20) / 20
  return { W: Math.round(Math.min(1400, Math.max(60, H * a))), H }
}

export default function MockMedia({ kind, seed = 0, theme = 'light', hint, ratio, bare = false, className = '' }) {
  const ref = useRef(null)
  const [box, setBox] = useState(() => {
    const a = parseRatio(ratio)
    return { W: Math.round(300 * a), H: 300 }
  })
  const rawId = useId()
  const id = `md${rawId.replace(/[^a-zA-Z0-9]/g, '')}`

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const update = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      if (!w || !h) return
      const next = toBox(w, h)
      setBox((prev) => (prev.W === next.W && prev.H === next.H ? prev : next))
    }
    update()
    if (typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const k = SCENES[kind] ? kind : pickKind(hint, seed)
  const dark = theme === 'dark'
  const { W, H } = box
  const scene = useMemo(() => {
    const isSmall = k === 'glyph'
    const c = { W, H, t: THEMES[dark ? 'dark' : 'light'], r: makeRng(`${k}|${seed}`), dark, id, bare: bare && !isSmall }
    return SCENES[k](c)
  }, [k, seed, dark, W, H, id, bare])

  return (
    <div ref={ref} className={`md-root${dark ? ' md-root--dark' : ''} ${className}`} data-md-kind={k} aria-hidden="true">
      <svg className="md-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        {scene}
      </svg>
    </div>
  )
}
