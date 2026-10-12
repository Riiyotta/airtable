import { useEffect, useRef } from 'react'

// rAF marquee shared by A5 FeatureCarousel and A9/S-7 Integrations (platform spec §A5 "Motion").
//  pos += (halfTrack / 28000) * dtMs  -> one copy of the list passes in 28s, linear, wraps at halfTrack.
//  Pointer drag after a 5px threshold moves 1:1; on release momentum decays x0.95/frame until < 0.3px.
// axis 'x' | 'y'; dir 'start' (left/up) | 'end' (right/down, translate = pos - half).
export function useMarquee({ axis = 'x', dir = 'start', durationMs = 28000, paused = false, reduced = false }) {
  const surfaceRef = useRef(null)
  const trackRef = useRef(null)
  const pausedRef = useRef(paused)
  pausedRef.current = paused || reduced
  const s = useRef({ pos: 0, half: 0, vel: 0, down: false, drag: false, start: 0, last: 0, moved: false })

  useEffect(() => {
    const track = trackRef.current
    const surface = surfaceRef.current || track
    if (!track) return
    const st = s.current
    const sign = dir === 'start' ? 1 : -1
    const measure = () => {
      st.half = (axis === 'x' ? track.scrollWidth : track.scrollHeight) / 2
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)

    const apply = () => {
      const t = dir === 'start' ? -st.pos : st.pos - st.half
      track.style.transform = axis === 'x' ? `translate3d(${t}px,0,0)` : `translate3d(0,${t}px,0)`
    }
    let raf
    let prev = performance.now()
    const tick = (now) => {
      const dt = Math.min(now - prev, 64)
      prev = now
      if (st.half > 0) {
        if (!st.drag) {
          if (Math.abs(st.vel) > 0.3) {
            st.pos += st.vel
            st.vel *= 0.95
          } else if (!pausedRef.current) {
            st.pos += (st.half / durationMs) * dt
          }
        }
        st.pos = ((st.pos % st.half) + st.half) % st.half
        apply()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const coord = (e) => (axis === 'x' ? e.clientX : e.clientY)
    const onDown = (e) => {
      if (e.button !== 0) return
      st.down = true
      st.drag = false
      st.moved = false
      st.start = st.last = coord(e)
      st.vel = 0
    }
    const onMove = (e) => {
      if (!st.down) return
      const c = coord(e)
      if (!st.drag && Math.abs(c - st.start) > 5) {
        st.drag = true
        st.moved = true
        surface.dataset.dragging = 'true'
        try {
          surface.setPointerCapture(e.pointerId)
        } catch {
          /* ignore */
        }
      }
      if (st.drag) {
        const d = c - st.last
        st.pos -= sign * d
        st.vel = -sign * d
      }
      st.last = c
    }
    const onUp = () => {
      st.down = false
      if (st.drag) {
        st.drag = false
        delete surface.dataset.dragging
      }
    }
    const onClickCapture = (e) => {
      if (st.moved) {
        e.preventDefault()
        e.stopPropagation()
        st.moved = false
      }
    }
    surface.addEventListener('pointerdown', onDown)
    surface.addEventListener('pointermove', onMove)
    surface.addEventListener('pointerup', onUp)
    surface.addEventListener('pointercancel', onUp)
    surface.addEventListener('click', onClickCapture, true)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      surface.removeEventListener('pointerdown', onDown)
      surface.removeEventListener('pointermove', onMove)
      surface.removeEventListener('pointerup', onUp)
      surface.removeEventListener('pointercancel', onUp)
      surface.removeEventListener('click', onClickCapture, true)
    }
  }, [axis, dir, durationMs])

  return { surfaceRef, trackRef }
}
