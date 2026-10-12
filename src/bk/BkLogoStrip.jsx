import './BkLogoStrip.css'

// BkLogoStrip — live /customer-stories logo bar (LogosBarSection + logobar).
// ≥768: margin-top 48; heading block padding 40/0 (14/18.9 ls .16); 4 static 168×52 cells, gap 32, centered;
//       padding-bottom 40 → 190.9 tall.
// <768: margin-top 24; heading padding 24/0 (14/18.2); the cells become a continuous marquee (200px step,
//       ~25px/s → 32s per 4-logo loop), padding-bottom 32 → 150.2 tall.
// logos: array of labels rendered as neutral wordmark placeholders.
export default function BkLogoStrip({ heading, logos }) {
  const cell = (label, i, hidden) => (
    <li key={`${hidden ? 'd' : 'l'}${i}`} className="bkls-cell" aria-hidden={hidden ? 'true' : undefined}>
      <span role={hidden ? undefined : 'img'} aria-label={hidden ? undefined : label} className="bkls-logo">
        {label}
      </span>
    </li>
  )
  return (
    <section className="bkls">
      <div className="bkls-wrap">
        <div className="bkls-head">
          <h2 className="bkls-h2">{heading}</h2>
        </div>
      </div>
      <div className="bkls-row">
        <ul className="bkls-track">
          {logos.map((l, i) => cell(l, i, false))}
          {logos.map((l, i) => cell(l, i, true))}
        </ul>
      </div>
    </section>
  )
}
