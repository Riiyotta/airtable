import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MockMedia from '../../media/MockMedia.jsx'
import { hintText } from '../../media/pickKind.js'

// ---------------------------------------------------------------- hooks
export function useMQ(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [m, setM] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}
export const useReducedMotion = () => useMQ('(prefers-reduced-motion: reduce)')

// ---------------------------------------------------------------- icons
export const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const Chevron = ({ size = 24, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="14" y="4" width="4" height="16" rx="1" />
    <rect x="6" y="4" width="4" height="16" rx="1" />
  </svg>
)
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 3l14 9-14 9V3z" strokeLinejoin="round" />
  </svg>
)
export const CheckIcon = ({ dark }) =>
  dark ? (
    <img src="/assets/solutions/e62ca0dfe3ba9f5a6c12f0a205deeda8825cbfad-24x24.svg" alt="" width="24" height="24" />
  ) : (
    <img src="/assets/solutions/e61b94adbe5f62b0663e373f5b9e155238536489-17x12.svg" alt="" width="17" height="12" />
  )
export const B_ARROW = '/assets/solutions/87cfab17c28caa44942388b1ee1bd138cc1f88c4-12x10.svg'
export const B_ARROW16 = '/assets/solutions/3b291a321a93230b20bfeb411d263078b571eb78-16x16.svg'

// ---------------------------------------------------------------- atoms
// variant: primary | secondary | primaryInverse | secondaryInverse | bprimary | bsecondary | boutline | bwhite
export function Btn({ label, href = '#', variant = 'primary', icon, style }) {
  return (
    <a href={href} className={`ss-btn ss-btn--${variant}`} style={style}>
      {label}
      {icon === 'arrow' && <ArrowRight />}
      {icon === 'barrow' && <img src={B_ARROW} alt="" />}
      {icon === 'barrow16' && <img src={B_ARROW16} alt="" />}
    </a>
  )
}

export function Actions({ actions, className = 'ss-actions' }) {
  if (!actions?.length) return null
  return (
    <div className={className}>
      {actions.map((a, i) => (
        <Btn key={i} {...a} variant={a.variant || (i === 0 ? 'primary' : 'secondary')} />
      ))}
    </div>
  )
}

export const Badge = ({ label, tone }) => <span className={`ss-badge${tone ? ` ss-badge--${tone}` : ''}`}>{label}</span>

export function TextLink({ label, href = '#', inverse }) {
  return (
    <a href={href} className={`ss-tlink${inverse ? ' ss-tlink--inverse' : ''}`}>
      {label}
      <span className="ss-tlink__arrow">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  )
}

export function PauseButton({ paused, onToggle }) {
  return (
    <button
      type="button"
      className="ss-ibtn ss-ibtn--dark ss-pause"
      aria-label={paused ? 'Play' : 'Pause'}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {paused ? <PlayIcon /> : <PauseIcon />}
    </button>
  )
}

export function ArrowButton({ dir = 'next', onClick, variant = 'darkSecondary', label }) {
  return (
    <button
      type="button"
      className={`ss-ibtn ss-ibtn--${variant}${dir === 'prev' ? ' ss-flip' : ''}`}
      aria-label={label || (dir === 'prev' ? 'Previous slide' : 'Next slide')}
      onClick={onClick}
    >
      <ArrowRight size={variant === 'b' ? 16 : 15} />
    </button>
  )
}

// Media slot: keeps the measured placeholder box (`ratio` like "892/383", `dark` for dark sections)
// and fills it with an original <MockMedia> scene. `kind` forces a scene; otherwise it is picked
// from `hint` (the slot's own copy). The route is mixed into the seed so pages differ.
export function Ph({ ratio, dark, video, style, className = '', seed = 0, kind, hint }) {
  const { pathname } = useLocation()
  const text = hintText(hint)
  return (
    <div
      className={`ss-ph${dark ? ' ss-ph--dark' : ''}${video ? ' ss-ph--video' : ''} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      aria-hidden="true"
    >
      <MockMedia kind={kind} hint={text} seed={`${pathname}|${text}|${seed}`} theme={dark ? 'dark' : 'light'} ratio={ratio} />
    </div>
  )
}

// Generic wordmark placeholder for logo rows.
export function Logo({ name, i = 0, style }) {
  const marks = ['', ' ss-logo__mark--c', ' ss-logo__mark--d']
  return (
    <span className="ss-logo" style={style} aria-label={name}>
      <i className={`ss-logo__mark${marks[i % 3]}`} />
      {name}
    </span>
  )
}

export const Tile = ({ i = 0 }) => (
  <span className="ss-tile" data-s={i % 4} aria-hidden="true">
    <i />
  </span>
)

// title-module / SeasonTitle
export function Title({ align = 'center', pad = 'hero', badge, badgeInverse, headline, size = 'section', as, sub, actions, children, className = '' }) {
  const H = as || (size === 'hero' ? 'h1' : 'h2')
  return (
    <div className={`ss-title ss-title--${align}${pad === 'band' ? ' ss-title--band' : ''} ${className}`}>
      <div className="ss-title__stack">
        {badge && (
          <div>
            <Badge label={badge} tone={badgeInverse ? 'inverse' : undefined} />
          </div>
        )}
        {headline && <H className={size === 'hero' ? 'ss-hh' : 'ss-hs'}>{headline}</H>}
        {sub && <p className="ss-sub">{sub}</p>}
        {children}
      </div>
      <Actions actions={actions} />
    </div>
  )
}

// Stand-in for the Lottie bar layers (CTA backgrounds, /platform hero pattern).
const BAR_W = [72, 38, 55, 90, 46, 64, 30, 82, 58, 41, 76, 50]
export function Bars({ cols = 4, rows = 12, color = '#AC59FF', h = 14, anim = true }) {
  return (
    <div className={`ss-bars${anim ? ' ss-bars--anim' : ''}`} aria-hidden="true">
      {Array.from({ length: cols }, (_, c) => (
        <div key={c} className="ss-bars__col">
          {Array.from({ length: rows }, (_, r) => {
            const k = (c * 5 + r * 7) % BAR_W.length
            return (
              <span
                key={r}
                className="ss-bars__bar"
                style={{
                  '--w': `${BAR_W[k]}%`,
                  '--h': `${h}px`,
                  '--c': color,
                  '--d': `${6 + (k % 4)}s`,
                  '--delay': `${-((c * 3 + r) % 7)}s`,
                  '--s1': (0.35 + (k % 5) * 0.1).toFixed(2),
                  '--s2': (0.7 + (k % 3) * 0.12).toFixed(2),
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export function usePaused(initial = false) {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(initial)
  return [paused || reduced, () => setPaused((p) => !p), reduced]
}
