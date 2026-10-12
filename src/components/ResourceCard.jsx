import MockMedia from '../media/MockMedia.jsx'

// ResourceCard — extracted from the homepage Resources card (SECTION_TYPES_solutions §2.4).
// Defaults render the homepage card markup exactly (imageTop, no eyebrow, lift hover).
//   layout:   'imageTop' | 'imageBottom'
//   img:      image src; omit to render placeholder art (16:9 `placeholderBg` box + <MockMedia>)
//   mediaKind: MockMedia kind for the placeholder art (default: picked from the title)
//   eyebrow:  { type: 'pill', label, bg, color, icon? } | { type: 'logo', label } | { type: 'meta', items: [label, label] } (icon, label, dot, label)
//   desc:     optional description
//   flat:     listing-page hover (title color only, no transition, no lift)
export default function ResourceCard({
  title,
  desc,
  href,
  img,
  layout = 'imageTop',
  eyebrow,
  flat = false,
  placeholderBg = '#E0E2E6',
  mediaKind,
}) {
  const media = (
    <div className="res-media">
      {img ? (
        <img src={img} alt="" loading="lazy" />
      ) : (
        <div className="res-placeholder md-host" style={{ backgroundColor: placeholderBg }} aria-hidden="true">
          <MockMedia kind={mediaKind} hint={title} seed={title} />
        </div>
      )}
    </div>
  )
  return (
    <a className={flat ? 'res-link res-link--flat' : 'res-link'} href={href}>
      <div className="res-card">
        {layout === 'imageTop' && media}
        <div className="res-content">
          {eyebrow && <Eyebrow {...eyebrow} />}
          <h3 className="res-card-title">{title}</h3>
          {desc && <p className="res-card-desc">{desc}</p>}
        </div>
        {layout === 'imageBottom' && media}
      </div>
    </a>
  )
}

function Eyebrow({ type, label, bg, color, icon, items = [] }) {
  return (
    <div className={type === 'meta' ? 'res-eyebrow res-eyebrow--meta' : 'res-eyebrow'}>
      {type === 'pill' && (
        <span className="res-pill" style={{ backgroundColor: bg, color }}>
          {icon && <span className="res-pill-icon" aria-hidden="true" />}
          {label}
        </span>
      )}
      {type === 'logo' && (
        <span className="res-logo" role="img" aria-label={label}>
          {label}
        </span>
      )}
      {type === 'meta' && (
        <>
          <MetaIcon />
          {items.map((m, i) => (
            <span key={i} className="res-meta-item">
              {i > 0 && (
                <svg className="res-meta-dot" width="6" height="7" viewBox="0 0 6 7" aria-hidden="true">
                  <circle cx="3" cy="3.5" r="3" />
                </svg>
              )}
              <span className="res-meta">{m}</span>
            </span>
          ))}
        </>
      )}
    </div>
  )
}

// Generic open-book glyph (own drawing), 20×20 box like the live meta icon.
function MetaIcon() {
  return (
    <svg className="res-meta-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 4.5h4.75c1.5 0 2.75 1.2 2.75 2.7v9.3c0-1.1-.9-2-2-2H2.5V4.5Zm15 0h-4.75c-1.5 0-2.75 1.2-2.75 2.7v9.3c0-1.1.9-2 2-2h5.5V4.5Z"
        stroke="#0AB2FA"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
