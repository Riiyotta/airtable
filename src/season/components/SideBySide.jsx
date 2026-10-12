import { Badge, Ph, Actions, PauseButton, usePaused } from './atoms.jsx'

// A4 FeatureSideBySide (h2 48/1.25) and S-5 SeasonMediaSplit (headline="section": h2 32/40, media radius 4).
// position: 'right' (image right) | 'left' (swapped, image left) | 'bottom'
// media: { ratio, video? }   body: string | string[]   bullets: string[]
export default function SideBySide({ position = 'right', badge, headline, headlineSize = 'display', body, bullets, actions, media, radius }) {
  const [paused, toggle] = usePaused()
  const paras = Array.isArray(body) ? body : body ? [body] : []
  return (
    <section className="ss-sec">
      <div className="ss-shell">
        <div className={`ss-mb ss-mb--${position}${radius === 4 ? ' ss-mb--r4' : ''}`}>
          <div className="ss-mb__text">
            <div className="ss-title ss-title--left">
              <div className="ss-title__stack">
                {badge && (
                  <div>
                    <Badge label={badge} />
                  </div>
                )}
                {headline &&
                  (headlineSize === 'display' ? <h2 className="ss-h48">{headline}</h2> : <h2 className="ss-hs">{headline}</h2>)}
                <div className="ss-mb__copy">
                  {paras.map((p, i) => (
                    <p key={i} className={headlineSize === 'display' ? 'ss-mb__body' : 'ss-sub'}>
                      {p}
                    </p>
                  ))}
                  {bullets?.length > 0 && (
                    <ul className="ss-mb__list" style={{ marginTop: paras.length ? 16 : 0 }}>
                      {bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <Actions actions={actions} />
            </div>
          </div>
          <div className="ss-mb__media">
            <div className="ss-mb__frame" data-paused={paused}>
              <Ph ratio={media.ratio} video={media.video} hint={[badge, headline]} />
              {media.video && <PauseButton paused={paused} onToggle={toggle} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
