import { useEffect, useRef, useState } from 'react'
import { Logo, useMQ, useReducedMotion } from './atoms.jsx'

// One component for A2 LogosFlip, S-2 SeasonLogoCells, B2 LogoGrid and E-2 LogoBarCycle.
// skin 'a'  : A2/S-2 — 88px cells, round-robin into 6/3/2 cells (>=1024/>=768/<768), heading 16px.
// skin 'b'  : B2/E-2 — 73px cells (64 <768), heading 18px in a bordered 654px cell.
// motion    : 'a2'     A2 schedule — first flip after [1,3,1.5,5,3,5.5]s per cell, then every 8s,
//                      transform .8s cubic-bezier(.76,0,.24,1), snap back at 850ms.
//             'season' S-2 — same schedule (interval not measured), transition 800ms ease.
//             'cycle'  E-2 — one random cell swaps every ~0.7–1.5s, 800ms ease.
//             'none'   B2 — static; only the first 2 cells show below 768.
// cells     : fixed cell count at desktop (B2 6, E-2 5); A skin derives it from the breakpoint.
const DELAYS = [1, 3, 1.5, 5, 3, 5.5]

function Cell({ logos, index, flipSignal, ease }) {
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState(false)
  const n = logos.length
  useEffect(() => {
    if (!flipSignal || n < 2) return
    setFlip(true)
    const t = setTimeout(() => {
      setI((v) => (v + 1) % n)
      setFlip(false)
    }, 850)
    return () => clearTimeout(t)
  }, [flipSignal, n])
  const tr = flip ? `transform .8s ${ease}` : 'none'
  return (
    <li className="ss-logos__cell">
      <div className="ss-logos__slot" style={{ transform: flip ? 'translateY(-100%)' : 'translateY(0)', transition: tr }}>
        <Logo name={logos[i]} i={index + i} />
      </div>
      {n > 1 && (
        <div className="ss-logos__slot" aria-hidden="true" style={{ transform: flip ? 'translateY(0)' : 'translateY(100%)', transition: tr }}>
          <Logo name={logos[(i + 1) % n]} i={index + i + 1} />
        </div>
      )}
    </li>
  )
}

export default function LogoCells({ heading, logos, skin = 'a', motion = 'a2', cells }) {
  const lg = useMQ('(min-width: 1024px)')
  const md = useMQ('(min-width: 768px)')
  const reduced = useReducedMotion()
  let count
  if (skin === 'a') count = Math.min(lg ? 6 : md ? 3 : 2, logos.length)
  else count = motion === 'cycle' && !md ? 2 : cells || 6
  const groups = Array.from({ length: count }, () => [])
  logos.forEach((l, k) => groups[k % count].push(l))

  // per-cell flip counters
  const [signals, setSignals] = useState(() => Array(count).fill(0))
  const countRef = useRef(count)
  countRef.current = count
  useEffect(() => {
    setSignals(Array(count).fill(0))
    if (reduced || motion === 'none') return
    const bump = (c) => setSignals((s) => s.map((v, k) => (k === c ? v + 1 : v)))
    const timers = []
    if (motion === 'cycle') {
      let last = -1
      const loop = () => {
        let c = Math.floor(Math.random() * countRef.current)
        if (c === last) c = (c + 1) % countRef.current
        last = c
        bump(c)
        timers.push(setTimeout(loop, 700 + Math.random() * 800))
      }
      timers.push(setTimeout(loop, 1000))
    } else {
      for (let c = 0; c < count; c++) {
        timers.push(
          setTimeout(() => {
            bump(c)
            timers.push(setInterval(() => bump(c), 8000))
          }, DELAYS[c % DELAYS.length] * 1000),
        )
      }
    }
    return () => timers.forEach((t) => (clearTimeout(t), clearInterval(t)))
  }, [count, motion, reduced])

  const ease = motion === 'a2' ? 'cubic-bezier(.76,0,.24,1)' : 'ease'
  return (
    <section className={`ss-sec ss-logos${skin === 'b' ? ' ss-logos--b' : ''}${motion === 'none' ? ' ss-logos--static-b' : ''}`}>
      <div className={`ss-shell${skin === 'b' ? ' ss-shell--b' : ''}`}>
        {heading && (
          <div className="ss-logos__head">
            {skin === 'b' ? (
              <div className="ss-logos__cell-h">
                <p>{heading}</p>
              </div>
            ) : (
              <p>{heading}</p>
            )}
          </div>
        )}
        <ul className="ss-logos__row">
          {groups.map((g, c) => (
            <Cell key={`${count}-${c}`} logos={g} index={c} flipSignal={signals[c]} ease={ease} />
          ))}
        </ul>
      </div>
    </section>
  )
}
