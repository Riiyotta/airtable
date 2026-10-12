import BkLink from './BkLink.jsx'
import { PlaceholderBlock } from './Placeholder.jsx'

// BK-2 IconCardGrid — SECTION_TYPES_solutions §3 BK-2.
// cards: [{ title, description, link: { label, href } }]
export default function IconCardGrid({ eyebrow, title, description, cards }) {
  return (
    <section className="py-[64px] font-haas">
      <div className="mx-[24px] md:mx-[32px]">
        <div className="mx-auto flex max-w-[768px] flex-col items-center pb-[40px] text-center">
          {/* live: eyebrow is inline-block inside a 20/30 line box → sits 3px low, wrapper 34 tall */}
          <div className="mb-[16px] text-[20px] leading-[30px]">
          <span className="inline-block rounded-pill border border-solid border-[#EEEEEE] px-[12px] py-[4px] font-display text-[14px] font-normal leading-[21px] tracking-[0.28px] text-text">
            {eyebrow}
          </span>
          </div>
          <h2 className="m-0 pb-[16px] text-[24px] font-normal leading-[32.4px] tracking-[0.12px] text-text md:text-[32px] md:leading-[41.6px] md:tracking-[0.16px]">
            {title}
          </h2>
          <p className="m-0 text-[14px] leading-[21px] text-text opacity-70 md:text-[16px] md:leading-[21.6px] md:tracking-[0.32px]">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3 lg:gap-[32px]">
          {cards.map((c) => (
            <div key={c.title} className="rounded-card border border-solid border-keyline bg-white p-[24px]">
              <PlaceholderBlock className="mb-[16px] h-[24px] w-[24px] rounded-[4px]" kind="glyph" seed={c.title} />
              <h3 className="m-0 mb-[8px] text-[16px] font-medium leading-[21.6px] text-ink">{c.title}</h3>
              <p className="m-0 mb-[16px] text-[14px] leading-[21px] tracking-[0.28px] text-weak">{c.description}</p>
              {/* live: link is inline-flex inside a 20/30 line box (+9px top offset) */}
              <div className="text-[20px] leading-[30px]">
                <BkLink href={c.link.href}>{c.link.label}</BkLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
