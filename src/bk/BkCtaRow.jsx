import './BkCtaRow.css'

// BkCtaRow — live CTASection (measured on /solutions, /integrations, /customer-stories).
// Section 48/0; gridWrap margin 0 32 (0 24 mobile); inner grid padding 48/0 (24/0 mobile), 12 cols gap 24,
// align-items baseline. Heading cols 1–8 Haas 32/40 (24/31.2 ls .12 mobile); button cols 10–12, flex-end,
// width min(fill, 200) on desktop, full width on mobile. Height 247.6 desktop / 286 mobile (2-line heading).
export default function BkCtaRow({ title, button, bg, color = '#181D26', as: Tag = 'h2' }) {
  return (
    <section className="bkcta" style={bg ? { backgroundColor: bg } : undefined}>
      <div className="bkcta-wrap">
        <div className="bkcta-grid">
          <Tag className="bkcta-h" style={{ color }}>
            {title}
          </Tag>
          <div className="bkcta-actions">
            <a className="bkcta-btn" href={button.href}>
              {button.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
