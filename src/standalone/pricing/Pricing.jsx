import { useState } from 'react'
import './pricing.css'
import {
  TITLE, PLANS, SEE_ALL, LOGO_EYEBROW, LOGOS, TABLE, FOOTNOTES,
  HELP_TITLE, HELP_LINKS, FAQ_TITLE, FAQ,
} from './pricingData.js'

/* ---------- icons ---------- */
const Check20 = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 10.5l3.2 3.2L15 6.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Check24 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Included">
    <path d="M6 12.5l4 4L18.5 8" stroke="#1D1F25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Plus16 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="Add-on">
    <path d="M8 3v10M3 8h10" stroke="#1D1F25" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)
const Info = () => (
  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
    <circle cx="4" cy="2" r="1.2" fill="#9297A0" />
    <path d="M4 5v6" stroke="#9297A0" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)
const Chevron = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const DownArrow = () => (
  <svg className="pr-see__arrow" width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M32 14v36M18 36l14 14 14-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
// Neutral 60×50 placeholder glyph for the custom-pricing plan.
const CustomIcon = () => (
  <svg width="60" height="50" viewBox="0 0 60 50" fill="none" aria-hidden="true">
    <rect x="6" y="18" width="20" height="28" rx="3" stroke="#1D1F25" strokeWidth="2" />
    <rect x="30" y="6" width="24" height="40" rx="3" stroke="#1D1F25" strokeWidth="2" />
    <path d="M36 14h12M36 22h12M36 30h12M12 26h8M12 34h8" stroke="#1D1F25" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

/* ---------- atoms ---------- */
function Pill({ cta, className = '' }) {
  return (
    <a href={cta.href} className={`pr-pill ${cta.filled ? 'pr-pill--filled' : 'pr-pill--outline'} ${className}`}>
      {cta.label}
    </a>
  )
}

function FeatureText({ f }) {
  if (typeof f === 'string') return f
  return (
    <>
      {f.text} (<a href="#" className="pr-inline-link">{f.link}</a>)
    </>
  )
}

function FeatureList({ plan }) {
  return (
    <>
      <div className="pr-lead">{plan.lead}</div>
      {plan.features.map((f, i) => (
        <div className="pr-feat" key={i}>
          <span className="pr-feat__icon"><Check20 /></span>
          <span className="pr-feat__text"><FeatureText f={f} /></span>
        </div>
      ))}
      {plan.addOns && (
        <>
          <div className="pr-lead pr-lead--addons">Available add-ons:</div>
          {plan.addOns.map((f, i) => (
            <div className="pr-feat" key={i}>
              <span className="pr-feat__icon"><Check20 /></span>
              <span className="pr-feat__text">{f}</span>
            </div>
          ))}
        </>
      )}
    </>
  )
}

function Price({ plan }) {
  const p = plan.price
  if (p.kind === 'text') return <div className="pr-price__free">{p.label}</div>
  if (p.kind === 'custom')
    return (
      <div>
        <CustomIcon />
        <div className="pr-price__custom">{p.label}</div>
      </div>
    )
  return (
    <div>
      <div className="pr-price__line">
        <span className="pr-price__num">{p.amount}</span>
        <span className="pr-price__usd">USD</span>
      </div>
      <div className="pr-price__per">per seat/month billed annually</div>
    </div>
  )
}

/* ---------- C2 desktop: 9 aligned rows × 4 columns ---------- */
const CARD_ROWS = [
  { key: 'tab', render: (p) => (p.highlight ? <div className="pr-tab">Most popular</div> : null) },
  { key: 'name', render: (p) => <h2 className="pr-name">{p.name}</h2> },
  { key: 'desc', render: (p) => <p className="pr-desc">{p.description}</p> },
  { key: 'spacer', render: () => null },
  { key: 'price', render: (p) => <Price plan={p} /> },
  {
    key: 'monthly',
    render: (p) =>
      p.monthly ? (
        <div className="pr-monthly"><b>{p.monthly}</b> billed monthly</div>
      ) : null,
  },
  { key: 'cta', render: (p) => <Pill cta={p.cta} className="pr-pill--card" /> },
  {
    key: 'secondary',
    render: (p) =>
      p.secondary ? (
        <div className="pr-secondary">
          <span className="pr-secondary__or">or</span>{' '}
          <a href={p.secondary.href} className="pr-secondary__link">{p.secondary.label}</a>
        </div>
      ) : null,
  },
  { key: 'features', render: (p) => <FeatureList plan={p} /> },
]

function PlanCardsDesktop() {
  return (
    <section className="pr-cards">
      {CARD_ROWS.map((row) => (
        <div className={`pr-cards__row pr-r-${row.key}`} key={row.key}>
          {PLANS.map((p) => (
            <div className="pr-col3" key={p.id}>
              {row.key === 'tab' ? (
                row.render(p)
              ) : (
                <div className={`pr-cell ${p.highlight ? 'is-hl' : ''}`}>{row.render(p)}</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

/* ---------- C2m mobile ---------- */
function MobileCard({ plan, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={plan.highlight ? 'pr-mcard-wrap is-hl' : 'pr-mcard-wrap'}>
    {plan.highlight && <div className="pr-mtab">Most popular</div>}
    <div className="pr-mcard">
      <h2 className="pr-mcard__name">{plan.name}</h2>
      <p className="pr-mcard__desc">{plan.description}</p>
      {/* live: price row flex-wrap items-end mb 16; paid plans show "per seat / month billed annually" beside it */}
      <div className="pr-mcard__pricerow">
        {plan.price.kind === 'custom' ? (
          <div className="pr-mcard__price pr-mcard__price--icon"><CustomIcon /></div>
        ) : (
          <div className="pr-mcard__price">{plan.price.kind === 'amount' ? plan.price.amount : plan.price.label}</div>
        )}
        {plan.price.kind === 'amount' && (
          <div className="pr-mcard__per">
            per seat /month
            <br />
            billed annually
          </div>
        )}
      </div>
      <div className="pr-mcard__cta">
        <Pill cta={plan.cta} className="pr-pill--mobile" />
      </div>
      <div className="pr-mcard__leadwrap">
        <p className="pr-mcard__lead">{plan.lead}</p>
      </div>
      <div className="pr-mcard__list">
        {plan.features.map((f, i) => (
          <div className="pr-mfeat" key={i}>
            <span className="pr-feat__icon"><Check20 /></span>
            <span><FeatureText f={f} /></span>
          </div>
        ))}
      </div>
      {plan.addOns && (
        <>
          <div className="pr-mcard__leadwrap">
            <p className="pr-mcard__lead">Available add-ons:</p>
          </div>
          <div className="pr-mcard__list">
            {plan.addOns.map((f, i) => (
              <div className="pr-mfeat" key={i}>
                <span className="pr-feat__icon"><Check20 /></span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <button
        type="button"
        className={`pr-mcard__toggle ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="pr-mcard__toggle-label">All features</span> <Chevron size={20} />
      </button>
      {open && (
        <div className="pr-mcard__all">
          {TABLE.map((g) => {
            const rows = g.rows.filter((r) => r.cells[index])
            if (!rows.length) return null
            return (
              <div key={g.title} className="pr-mcard__group">
                <div className="pr-mcard__gtitle">{g.title}</div>
                {rows.map((r) => (
                  <div className="pr-mfeat" key={r.name}>
                    <span className="pr-feat__icon">{r.cells[index] === 'plus' ? <Plus16 /> : <Check20 />}</span>
                    <span>
                      {r.name}
                      {r.cells[index] !== 'check' && r.cells[index] !== 'plus' ? `: ${cellText(r.cells[index])}` : ''}
                      {r.cells[index] === 'plus' ? ' (add-on)' : ''}
                    </span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
    </div>
  )
}

/* ---------- C5 comparison table ---------- */
function Cell({ v }) {
  if (v === 'check') return <Check24 />
  if (v === 'plus') return <Plus16 />
  if (v && typeof v === 'object') return <div className={`pr-cell-text pr-cell-text--${v.m}`}>{v.t}</div>
  return v || null
}
const cellText = (v) => (v && typeof v === 'object' ? v.t : v)

function ComparisonTable() {
  return (
    <section className="pr-table" aria-label="Plan comparison">
      <div className="pr-thead">
        <div className="pr-trow pr-thead__a">
          <div className="pr-col4"><h2 className="pr-thead__title">Compare our plans</h2></div>
          {PLANS.map((p) => (
            <div className="pr-col2" key={p.id}>
              <div className="pr-thead__plan">{p.name}</div>
            </div>
          ))}
        </div>
        <div className="pr-trow pr-thead__b">
          <div className="pr-col4" />
          {PLANS.map((p) => (
            <div className="pr-col2" key={p.id}>
              <div className="pr-thead__cta"><Pill cta={p.cta} className="pr-pill--table" /></div>
            </div>
          ))}
        </div>
      </div>

      {TABLE.map((g) => (
        <div className="pr-group" key={g.title}>
          <div className="pr-trow">
            <div className="pr-col4"><h3 className="pr-group__title">{g.title}</h3></div>
          </div>
          {g.rows.map((r) => (
            <div className="pr-trow pr-frow" key={r.name}>
              <div className="pr-frow__hover" aria-hidden="true" />
              <div className="pr-col4 pr-frow__name">
                <span className="pr-frow__label">{r.name}</span>
                <span className="pr-frow__info"><Info /></span>
              </div>
              {r.cells.map((v, i) => (
                <div className="pr-col2 pr-frow__cell" key={i}><Cell v={v} /></div>
              ))}
            </div>
          ))}
        </div>
      ))}

      <div className="pr-notes">
        {FOOTNOTES.map((n, i) => (
          <p className="pr-note" key={i}>{n}</p>
        ))}
      </div>
    </section>
  )
}

/* ---------- C7 FAQ ---------- */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="pr-faq__item">
      <button type="button" className="pr-faq__q" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <p>{item.q}</p>
        <span className={`pr-faq__chev ${open ? 'is-open' : ''}`}><Chevron /></span>
      </button>
      {open && (
        <div className="pr-faq__a">
          {item.a.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Pricing() {
  return (
    <div className="pr">
      <div className="pr-col">
        {/* C1 */}
        <div className="pr-title"><h1>{TITLE}</h1></div>

        {/* C2 / C2m */}
        <PlanCardsDesktop />
        <section className="pr-mcards">
          {PLANS.map((p, i) => (
            <MobileCard plan={p} index={i} key={p.id} />
          ))}
        </section>

        {/* C3 */}
        <div className="pr-see">
          <a href="#compare" className="pr-see__link"
            onClick={(e) => { e.preventDefault(); document.getElementById('compare')?.scrollIntoView() }}>
            <div className="pr-see__text">{SEE_ALL}</div>
            <DownArrow />
          </a>
        </div>

        {/* C4 */}
        <section className="pr-logos">
          <div className="pr-logos__eyebrow">{LOGO_EYEBROW}</div>
          <div className="pr-logos__strip" role="img" aria-label="Customer logos (placeholder)">
            {LOGOS.map((l) => (
              <span key={l} className="pr-logos__mark">{l}</span>
            ))}
          </div>
        </section>

        {/* C5 */}
        <div id="compare" className="pr-compare-anchor" />
        <ComparisonTable />

        {/* C6 */}
        <section className="pr-help">
          <h2 className="pr-h2">{HELP_TITLE}</h2>
          <div className="pr-help__cols">
            {HELP_LINKS.map((l) => (
              <div className="pr-help__col" key={l.label}>
                <div className="pr-help__eyebrow">{l.eyebrow}</div>
                <a href={l.href} className="pr-help__link">{l.label}</a>
              </div>
            ))}
          </div>
        </section>

        {/* C7 */}
        <section className="pr-faq">
          <h2 className="pr-h2">{FAQ_TITLE}</h2>
          <div className="pr-faq__list">
            {FAQ.map((item) => (
              <FaqItem item={item} key={item.q} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
