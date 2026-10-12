import { useEffect, useRef } from 'react'

// CLONE_SPEC §3 (logo bar) + §11 (marquee: 25 px/s, linear, leftward, no hover pause, recalculates on resize debounced 150ms).
const LOGOS = [
  { n: 1, src: 'b6863f568a03bcc0815f410996fd34a83289824a-168x52.svg' },
  { n: 2, src: 'd09c309b62a3e7db843f45c293d59b6dacd07632-168x52.svg' },
  { n: 3, src: '11b0a6a8133776211d5f57de1a4f1c89adcfda5f-168x52.svg' },
  { n: 4, src: 'e326f2cef65d1c7304344128153fd50704ae2345-336x104.png' },
  { n: 5, src: '8317d0325637b10ab99d9b97a2485e147dd67f9d-168x52.svg' },
  { n: 6, src: '8585d359490198c8edfa61d8d27378898a1ca387-168x52.svg' },
  { n: 7, src: '7f75375372308d75f38caf57e434d8752ceeb92b-168x52.svg' },
  { n: 8, src: '7101e0ea90ebf01317f7271dd8039d135794d4c7-168x52.svg' },
  { n: 9, src: '7ace193946430d8a659301c74cbcd2c362e3b82e-168x52.svg' },
  { n: 10, src: 'c1b1dc81f3a6d9d0ed88f45bf382ab601c5fa6aa-168x52.svg' },
  { n: 12, src: 'c546058cd0abeb758e80f2dfe47edb0d65ed087d-168x52.svg' },
  { n: 13, src: 'bc21c117f792b1931ac8b8d74ce3e8c6dfa0e6ee-168x52.svg' },
  { n: 14, src: '735eb740382a2998e3094bd6fa58b69c7b4a97f4-168x52.svg' },
  { n: 15, src: '8a2b6233feeecbe7c76d600fdae77adf61d220c2-168x52.svg' },
  { n: 16, src: 'ace8acd44b2a75a1ad96b610ffbc9d63f882c720-168x52.svg' },
  { n: 17, src: '82ff48b25d1d9e4e41dfc2ce8e0eb18d13e48c2e-168x52.svg' },
]
// 16 logos rendered twice → 32 li (minNumOfCards = logos + 1 repeats the list).
const ITEMS = [...LOGOS, ...LOGOS]
const PX_PER_SECOND = 25

const DEFAULT_HEADING = 'Trusted by 500,000 leading teams'

// Optional props (SECTION_TYPES_solutions §1 "LogoBar variant=static"): defaults reproduce the homepage marquee.
// static: `logos` = array of labels rendered as neutral 168×52 wordmark placeholders; no marquee, no motion.
export default function LogoBar({ variant = 'marquee', heading = DEFAULT_HEADING, logos = [] }) {
  if (variant === 'static') return <StaticLogoBar heading={heading} logos={logos} />
  return <MarqueeLogoBar heading={heading} />
}

function StaticLogoBar({ heading, logos }) {
  // Live /customer-stories logo bar (measured 390 / 1440):
  // >=768: margin-top 48; heading padding 40/0 (14/18.9); one centered row of 168×52 cells, gap 32, inside a
  //        -16px ul margin; section padding-bottom 40 (190.9 total).
  // <768:  margin-top 24; heading padding 24/0 (14/18.2); the cells become the homepage-style marquee — mask
  //        inside the 24px gutter, 200px items (168 + 16/16 padding), set duplicated, 25 px/s;
  //        section padding-bottom 32 (150.2 total).
  const n = logos.length
  const distance = n * 200
  const items = [...logos, ...logos]
  return (
    <>
      <section className="mt-[24px] bg-white md:mt-[48px]">
        <div className="mx-[24px] max-w-grid md:mx-[32px]">
          <div className="py-[24px] md:py-[40px]">
            <h2 className="text-center text-[14px] font-normal leading-[18.2px] tracking-[0.16px] text-text opacity-70 md:leading-[18.9px]">
              {heading}
            </h2>
          </div>
        </div>
      </section>
      <section className="pb-[32px] md:pb-[40px]">
        <div className="marquee-mask mx-[24px] max-w-grid overflow-hidden md:mx-[32px] md:overflow-visible md:[-webkit-mask-image:none] md:[mask-image:none]">
          <ul
            className="m-0 -my-[32px] flex list-none flex-nowrap overflow-hidden p-0 py-[32px] md:-mx-[16px] md:my-0 md:flex-wrap md:justify-center md:gap-[32px] md:py-0"
            style={{ '--marquee-distance': `${distance}px`, '--marquee-duration': `${distance / PX_PER_SECOND}s` }}
          >
            {items.map((label, i) => (
              <li
                key={i}
                aria-hidden={i >= n ? 'true' : undefined}
                className={`marquee-item h-[52px] shrink-0 grow px-[16px] md:grow-0 md:px-0 md:[animation:none] ${i >= n ? 'md:hidden' : ''}`}
              >
                <span
                  role={i >= n ? undefined : 'img'}
                  aria-label={i >= n ? undefined : label}
                  className="flex h-[52px] w-[168px] items-center justify-center font-haas text-[20px] font-medium tracking-[-0.2px] text-[#9297A0]"
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function MarqueeLogoBar({ heading }) {
  const listRef = useRef(null)

  // Loop distance = width of one logo set (half the 32-item track: 16 × 200px = 3200px, or 16 × 216 at ≥1664).
  // Every li translates by that distance; duration = distance / 25 px/s.
  useEffect(() => {
    const ul = listRef.current
    let t
    const measure = () => {
      const items = ul.children
      const half = items[LOGOS.length].offsetLeft - items[0].offsetLeft
      ul.style.setProperty('--marquee-distance', `${half}px`)
      ul.style.setProperty('--marquee-duration', `${half / PX_PER_SECOND}s`)
    }
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(measure, 150)
    }
    measure()
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <section className="bg-white">
        <div className="mx-[24px] max-w-grid md:mx-[32px]">
          <div className="py-[24px] md:py-[40px]">
            <h2 className="text-center text-[14px] font-normal leading-[18.2px] tracking-[0.16px] text-text opacity-70 md:leading-[18.9px]">
              {heading}
            </h2>
          </div>
        </div>
      </section>

      <section id="sanity-logo-marquee" className="pb-[32px] md:pb-[40px]">
        {/* Original: the mask + overflow clip sit inside the 24/32px page gutter, not full-bleed. */}
        <div className="marquee-mask mx-[24px] max-w-grid overflow-hidden md:mx-[32px]">
          <ul ref={listRef} className="-my-[32px] flex flex-nowrap overflow-hidden py-[32px]">
            {ITEMS.map((logo, i) => (
              <li
                key={i}
                aria-hidden={i >= LOGOS.length ? 'true' : undefined}
                className="marquee-item shrink-0 grow px-[16px] 2xl:px-[24px]"
              >
                <img
                  src={`/assets/${logo.src}`}
                  alt={`Logo ${logo.n}`}
                  width="168"
                  height="52"
                  className="h-[52px] w-[168px] max-w-none object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
