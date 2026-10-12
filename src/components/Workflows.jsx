import { useEffect, useRef, useState } from 'react'
import './Workflows.css'

const ITEMS = [
  { id: 'wf-card-1', label: '01 AI app building', color: '#912E1F' },
  { id: 'wf-card-2', label: '02 Agents at Scale', color: '#B6E995' },
  { id: 'wf-card-3', label: '03 Meet Omni', color: '#002D98' },
  { id: 'wf-card-4', label: '04 Enterprise capabilities', color: '#214224' },
]

// z-index 1–4, fan-out targets (§11)
const FAN = [
  { src: '/assets/6b62c60a069f265eec39054ebe851a9918a3db90-729x1006.png', x: -90 },
  { src: '/assets/5da115af45d689e68a19649dc1b330128d395950-729x996.png', x: -28 },
  { src: '/assets/cf1159eaca297c9203adeef8039f9fae6d65c980-729x996.png', x: 28 },
  { src: '/assets/4266d4d5629d465de8f0d819a79d3fa2e5beac83-729x996.png', x: 87 },
]

const LIST_GROUPS = [
  {
    title: 'Scalable infrastructure',
    items: [
      'HyperDB with record limits in the hundreds of millions',
      'Scale workflows to tens of thousands of users',
      'Use AI models from leading providers (OpenAI, Gemini, Llama, Anthropic, and more)',
    ],
  },
  {
    title: 'Flexible administration',
    items: [
      'Admin roles, robust permissions, fine-grained RBAC',
      'Fine-grained controls to enable AI',
      'Programmatic provisioning and de-provisioning',
      'IDP synced groups',
    ],
  },
  {
    title: 'Security and compliance',
    items: [
      'ISO, HIPAA, SOC 2',
      'No customer data retained or used to train AI models',
      "Models run fully in Airtable's AWS environment",
      'EKM, data loss prevention, audit logs, e-discovery',
      'European and Australian data residency support',
    ],
  },
]

/* ---------- motion helpers (motion/framer equivalents, no dependency) ---------- */

// cubic-bezier solver; motion's easeInOut = cubicBezier(0.42, 0, 0.58, 1)
function cubicBezier(x1, y1, x2, y2) {
  const calc = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t
  return (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let lo = 0
    let hi = 1
    let t = x
    for (let i = 0; i < 20; i++) {
      const cx = calc(t, x1, x2)
      if (Math.abs(cx - x) < 1e-7) break
      if (cx > x) hi = t
      else lo = t
      t = (lo + hi) / 2
    }
    return calc(t, y1, y2)
  }
}
const easeInOut = cubicBezier(0.42, 0, 0.58, 1)

// transform(p, [i0, i1], [o0, o1], { ease: easeInOut }) — clamped
function mapRange(p, i0, i1, o0, o1) {
  const t = Math.min(1, Math.max(0, (p - i0) / (i1 - i0)))
  return o0 + (o1 - o0) * easeInOut(t)
}

function getNavHeight() {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mainNavHeight'))
  if (!Number.isNaN(v)) return v
  const header = document.querySelector('header')
  return header ? header.getBoundingClientRect().height : 120.98
}

/* ---------- Card 1 fan: useScroll(["60% end","120% end"]) -> useSpring(400 / 150 / 1) ---------- */
function useFanMotion(cardRef, itemRefs) {
  useEffect(() => {
    const STIFFNESS = 400
    const DAMPING = 150
    const MASS = 1
    const STEP = 1 / 1000 // fixed 1ms integration sub-step

    const target = () => {
      const el = cardRef.current
      if (!el) return 0
      const top = el.getBoundingClientRect().top
      const h = el.offsetHeight
      const vh = window.innerHeight
      // 0: card's 60% line at viewport bottom; 1: card's 120% line at viewport bottom
      const p = (vh - top - 0.6 * h) / (0.6 * h)
      return Math.min(1, Math.max(0, p))
    }

    const apply = (p) => {
      itemRefs.current.forEach((node, i) => {
        if (!node) return
        node.style.opacity = String(mapRange(p, 0, 0.9, 0.1, 1))
        node.style.transform = `translateX(${mapRange(p, 0.1, 0.9, 0, FAN[i].x)}%)`
      })
    }

    // Spring starts at the current progress (no initial animation), like useSpring(initial).
    let value = target()
    let velocity = 0
    let goal = value
    let raf = 0
    let last = 0
    apply(value)

    const tick = (now) => {
      let dt = Math.min(0.064, (now - last) / 1000)
      last = now
      while (dt > 0) {
        const h = Math.min(STEP, dt)
        const accel = (-STIFFNESS * (value - goal) - DAMPING * velocity) / MASS
        velocity += accel * h
        value += velocity * h
        dt -= h
      }
      if (Math.abs(value - goal) < 0.0005 && Math.abs(velocity) < 0.005) {
        value = goal
        velocity = 0
        apply(value)
        raf = 0
        return
      }
      apply(value)
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      goal = target()
      if (!raf && goal !== value) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [cardRef, itemRefs])
}

/* ---------- Active menu tracking (§11) ---------- */
function useActiveCard(cardRefs, suppressUntil) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      if (performance.now() < suppressUntil.current) return
      const vh = window.innerHeight
      let best = -1
      let bestRatio = 0
      let lastAboveMid = -1
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const ratio = (Math.min(r.bottom, vh) - Math.max(r.top, 0)) / el.offsetHeight
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = i
        }
        if (r.top < vh / 2) lastAboveMid = i
      })
      if (best !== -1 && bestRatio >= 0.6) setActive(best)
      else if (lastAboveMid !== -1) setActive(lastAboveMid)
      else setActive(0) // above the first card (e.g. scrolled back to top): original resets to item 01
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [cardRefs, suppressUntil])
  return [active, setActive]
}

export default function Workflows() {
  const cardRefs = useRef([])
  const fanCardRef = useRef(null)
  const fanItemRefs = useRef([])
  const menuRef = useRef(null)
  const suppressUntil = useRef(0)
  const [active, setActive] = useActiveCard(cardRefs, suppressUntil)

  useFanMotion(fanCardRef, fanItemRefs)

  const onItemClick = (e, i) => {
    e.preventDefault()
    const card = cardRefs.current[i]
    if (!card) return
    const cardTop = card.getBoundingClientRect().top + window.scrollY
    const menuHeight = window.innerWidth < 1024 && menuRef.current ? menuRef.current.offsetHeight : 0
    suppressUntil.current = performance.now() + 1000
    setActive(i)
    window.scrollTo({ top: cardTop - getNavHeight() - menuHeight - 16, behavior: 'smooth' })
  }

  const setCardRef = (i) => (el) => {
    cardRefs.current[i] = el
  }

  return (
    <section className="wf">
      <div className="wf-wrap">
        <h2 className="wf-h2">Sophisticated workflows in minutes, not months</h2>
      </div>
      <div className="wf-wrap wf-body">
        <div className="wf-content">
          <div className="wf-menu" ref={menuRef}>
            <nav className="wf-nav">
              {ITEMS.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="wf-item"
                  data-active={active === i}
                  onClick={(e) => onItemClick(e, i)}
                >
                  <span className="wf-indicator" style={{ backgroundColor: item.color }} />
                  <span className="wf-label">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="wf-cards">
            {/* Card 1 — animated screenshot fan */}
            <div
              id="wf-card-1"
              className="wf-card wf-card1"
              ref={(el) => {
                cardRefs.current[0] = el
                fanCardRef.current = el
              }}
            >
              <div className="wf-headrow">
                <div className="wf-headtext">
                  <h3 className="wf-card-title">Production apps at prototype speed</h3>
                  <div className="wf-card-body">
                    <p>
                      Streamline your team's critical data through conversational building. Generate apps with
                      Airtable's best-in-class no-code components—no technical expertise required.
                    </p>
                  </div>
                </div>
                <div className="wf-btnwrap">
                  <a className="wf-btn wf-btn--white" href="/platform/app-building">
                    Learn more
                  </a>
                </div>
              </div>
              <div className="wf-media1">
                {FAN.map((img, i) => (
                  <div
                    key={img.src}
                    className="wf-fan-item"
                    style={{ zIndex: i + 1 }}
                    ref={(el) => {
                      fanItemRefs.current[i] = el
                    }}
                  >
                    <img src={img.src} alt="" />
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 — video + text */}
            <div id="wf-card-2" className="wf-card wf-card2" ref={setCardRef(1)}>
              <div className="wf-media2">
                <video
                  src="/assets/559eda8e343bd1e27dee54f569b062cb60110afe.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="wf-headrow">
                <div className="wf-headtext">
                  <h2 className="wf-card-title">Don't just ask AI. Deploy it.</h2>
                  <div className="wf-card-body">
                    <p>
                      Embed intelligence into every workflow—Airtable agents think dynamically across thousands of
                      records and orchestrate actions across your entire operation.
                    </p>
                  </div>
                </div>
                <div className="wf-btnwrap">
                  <a className="wf-btn wf-btn--primary" href="/platform/ai-agents">
                    Learn more
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 — Omni */}
            <div id="wf-card-3" className="wf-card wf-card3" ref={setCardRef(2)}>
              <div className="wf-card3-inner">
                <img
                  className="wf-omni-icon"
                  src="/assets/e1ae4b7878c18828b1817f51d0a7c214061d8a3d-1000x1000.gif"
                  alt=""
                  width="226"
                  height="226"
                />
                <div className="wf-card3-block">
                  <h2 className="wf-card-title">Say hello to Omni</h2>
                  <div className="wf-card-body">
                    <p>
                      Use it to build any enterprise-grade applications with your data. The possibilities are endless.
                    </p>
                  </div>
                  <a className="wf-btn wf-btn--primary" href="/platform/app-building">
                    Learn more
                  </a>
                </div>
              </div>
            </div>

            {/* Card 4 — enterprise list */}
            <div id="wf-card-4" className="wf-card wf-card4" ref={setCardRef(3)}>
              <div className="wf-card4-left">
                <img
                  className="wf-card4-icon"
                  src="/assets/7eba4fea94fc9dac9cb7ef78f90ea47b29c189a1-48x49.svg"
                  alt=""
                  width="48"
                  height="48"
                />
                <h2 className="wf-card-title">
                  The power of AI with the industrial-grade platform your business demands
                </h2>
              </div>
              <div className="wf-card4-right">
                {LIST_GROUPS.map((group) => (
                  <div key={group.title} className="wf-group">
                    <p className="wf-group-title">
                      <strong>{group.title}</strong>
                    </p>
                    <ul className="wf-list">
                      {group.items.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
