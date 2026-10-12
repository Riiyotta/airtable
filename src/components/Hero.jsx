import { useRef, useState } from 'react'
import { bkButton, bkOutline, bkPrimary } from './buttonStyles.js'

// CLONE_SPEC §2 (hero), §11 (pause button hover).
// Optional props (SECTION_TYPES_solutions §1): defaults reproduce the homepage exactly.
const DEFAULT_TITLE = 'All your teams, all their workflows—connected in one workspace'
const DEFAULT_SUB =
  'Build AI-powered workflows that unify data, maximize collaboration, and set your teams up for long-term success. No code required.'
const DEFAULT_PRIMARY = { label: 'Get started for free', href: '/signup' }
const DEFAULT_SECONDARY = { label: 'Book demo', href: '/contact-sales' }

export default function Hero({
  video = true,
  title = DEFAULT_TITLE,
  sub = DEFAULT_SUB,
  primary = DEFAULT_PRIMARY,
  secondary = DEFAULT_SECONDARY,
}) {
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(false)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }

  return (
    <section className="coreHeroImageCentered bg-white py-[32px] md:py-[40px]">
      <div className="mx-[24px] max-w-grid md:mx-[32px]">
        <div className="grid grid-cols-6 gap-x-[24px] md:grid-cols-12 md:gap-x-[32px]">
          {/* Text area: columns 3–10 */}
          <div className="col-span-6 flex flex-col items-center text-center md:col-span-8 md:col-start-3">
            <h1 className="mb-[24px] text-[32px] font-normal leading-[40px] text-text md:mb-[32px] md:text-[40px] md:leading-[48px]">
              {title}
            </h1>
            <p className="mb-[24px] text-[14px] leading-[18.9px] tracking-[0.28px] text-weak md:text-[16px] md:leading-[21.6px] md:tracking-[0.16px]">
              {sub}
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-[12px] md:w-auto md:flex-row md:items-center md:gap-[16px]">
              <a
                href={primary.href}
                className={`${bkButton} ${bkPrimary} shadow-btn-primary hover:shadow-none`}
              >
                {primary.label}
              </a>
              <a
                href={secondary.href}
                className={`${bkButton} ${bkOutline} shadow-btn-secondary backdrop-blur-[6px] hover:shadow-none`}
              >
                {secondary.label}
              </a>
            </div>
          </div>

          {/* Video: 16:9, max-width 1114, radius 16 */}
          {video && (
          <div className="col-span-6 mt-[24px] md:col-span-12 md:mt-[32px]">
            <div className="relative mx-auto aspect-video max-w-[1114px] overflow-hidden rounded-video">
              {/* HEVC source only; no H.264/webm fallback or poster exists in ASSET_MANIFEST. */}
              <video
                ref={videoRef}
                src="/assets/16f7e8526058f2d34ce24e5ef3933bc3783cea4b.mp4"
                className="block h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div data-paused={paused} className="absolute bottom-[16px] right-[16px] z-10">
                <button
                  type="button"
                  aria-label={paused ? 'Play video' : 'Pause video'}
                  aria-pressed={paused}
                  onClick={togglePlay}
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-solid border-transparent bg-ink text-white transition-[background-color,border-color,color,box-shadow] duration-150 ease-standard [@media(hover:hover)]:hover:bg-weak active:bg-[rgba(2,13,32,0.43)] [@media(hover:hover)]:active:bg-[rgba(2,13,32,0.43)]"
                >
                  {paused ? (
                    // Play glyph: not in the asset set (spec only gives lucide "pause"); lucide "play" geometry.
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="14" y="3" width="5" height="18" rx="1" />
                      <rect x="5" y="3" width="5" height="18" rx="1" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
