import { Title, Ph, TextLink, B_ARROW16 } from './atoms.jsx'

// A3 FeatureCards / S-3 SeasonCardGrid (variant 'cards') and B5 CapabilitiesBento (variant 'bento').
// card: { icon?: bool, title, body?, link?: {label, href}, media?: bool, href? (bento) }
export default function CardGrid({ variant = 'cards', badge, headline, sub, actions, cards }) {
  if (variant === 'bento') {
    return (
      <section className="ss-sec ss-sec--bento">
        <div className="ss-shell ss-shell--b">
          <div className="ss-bento__head">
            <h2 className="ss-bh2">{headline}</h2>
          </div>
          <ul className="ss-bento">
            {cards.map((c, i) => (
              <li key={i}>
                <a className="ss-bento__card" href={c.href || '#'}>
                  <div className="ss-bento__copy">
                    <h3 className="ss-bento__title">{c.title}</h3>
                    <p className="ss-bento__body">{c.body}</p>
                    <span className="ss-bento__more">
                      Learn more
                      <img src={B_ARROW16} alt="" />
                    </span>
                  </div>
                  <div className="ss-bento__visual">
                    <Ph seed={i} hint={c.title} />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  const cols = cards.length === 4 ? 4 : 3
  return (
    <section className="ss-sec">
      <div className="ss-shell">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title align="center" pad="band" badge={badge} headline={headline} sub={sub} actions={actions} />
        </div>
        <div className="ss-cards-body">
          <ul className="ss-cards" data-cols={cols}>
            {cards.map((c, i) => (
              <li key={i} className="ss-card">
                <div className="ss-card__copy">
                  {c.icon && <span className="ss-card__icon" aria-hidden="true" />}
                  <div className="ss-card__text">
                    <h3 className="ss-card__title">{c.title}</h3>
                    {c.body && <p className="ss-card__body">{c.body}</p>}
                  </div>
                  {c.link && (
                    <div className="ss-card__link">
                      <TextLink {...c.link} />
                    </div>
                  )}
                </div>
                {c.media && <Ph className="ss-card__media" ratio="448/300" seed={i} hint={c.title} />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
