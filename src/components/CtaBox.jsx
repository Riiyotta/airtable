import './CtaBox.css'

// Optional props (SECTION_TYPES_solutions §1 "CtaBox variant=row"): defaults reproduce the homepage box exactly.
const DEFAULT_TITLE = 'Start building with Airtable'
const DEFAULT_TEXT = 'Teams at over 500,000 forward-thinking organizations use Airtable every day. Join them.'
const DEFAULT_BUTTON = { label: 'Get started for free', href: '/signup' }

export default function CtaBox({ variant = 'box', bg, title = DEFAULT_TITLE, text = DEFAULT_TEXT, button = DEFAULT_BUTTON }) {
  if (variant === 'row') {
    // No box: section 48/0, inner grid 48/0 (24/0 mobile), h2 cols 1–8, one primary button in cols 10–12
    // (full width on mobile, max-width 200 from 768) — see CtaBox.css.
    return (
      <section className="cta-section" style={bg ? { backgroundColor: bg } : undefined}>
        <div className="cta-wrap">
          <div className="cta-box cta-box--row">
            <h2 className="cta-h2 cta-row-h2">{title}</h2>
            <div className="cta-row-actions">
              <a className="cta-btn cta-row-btn" href={button.href}>
                {button.label}
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="cta-section">
      <div className="cta-wrap">
        <div className="cta-box">
          <div className="cta-text">
            <h2 className="cta-h2">{title}</h2>
            <p className="cta-p">{text}</p>
          </div>
          <div className="cta-actions">
            <a className="cta-btn" href={button.href}>
              {button.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
