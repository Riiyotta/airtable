import { useState } from 'react'
import ResourceCard from '../components/ResourceCard.jsx'
import BkSectionHeader from './BkSectionHeader.jsx'

// BK-8 SidebarNavGrid — SECTION_TYPES_solutions §3 BK-8.
// 12-col grid (gap 32): sidebar cols 1–3 ("Topics" header inner 256 wide, 8 links); main cols 4–12
// ("Browse", mb 24) with ResourceCards imageTop + meta eyebrow + description; 3 cols, gap 32, row-gap 48.
//   topics: [{ label, href }]   cards: [{ title, desc, href, meta: [label, label] }]
const RULE = 'rgba(1,20,53,0.12)' // #0114351F
// Below 1024 (live 390): no sidebar list; "Browse" header first, then a white 48px bar (padding 8/0) holding a
// "Topics" pill dropdown (padding 4 10, Haas 18/24 500, 16×10 chevron, gap 8), 24 above the cards.

export default function SidebarNavGrid({ sidebarTitle = 'Topics', topics, mainTitle = 'Browse', cards }) {
  const [open, setOpen] = useState(false)
  return (
    <section className="mx-[24px] pb-[48px] font-haas md:mx-[32px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-[32px]">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="lg:pr-[64px]">
            <BkSectionHeader title={sidebarTitle} rule={RULE} />
          </div>
          <ul className="m-0 my-[16px] list-none p-0">
            {topics.map((t) => (
              <li key={t.label} className="mb-[16px]">
                <a
                  href={t.href}
                  className="flex items-center gap-[8px] text-secondary no-underline hover:text-weak-base hover:opacity-[0.69]"
                >
                  <span aria-hidden="true" className="h-[12px] w-[12px] shrink-0 rounded-[2px] bg-[#C4C7CD]" />
                  <h6 className="m-0 text-[14px] font-medium leading-[18.9px] tracking-[0.28px] text-inherit">{t.label}</h6>
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="lg:col-span-9">
          <BkSectionHeader title={mainTitle} rule={RULE} className="mb-[24px] mt-[32px] lg:mt-[48px]" />
          <div className="mb-[24px] bg-white py-[8px] lg:hidden">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex cursor-pointer items-center gap-[8px] rounded-pill border-0 bg-white px-[10px] py-[4px] font-haas text-[18px] font-medium leading-[24px] text-ink"
            >
              {sidebarTitle}
              <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true" className={open ? 'rotate-180' : ''}>
                <path d="M1 1.5l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open && (
              <ul className="m-0 mt-[16px] list-none p-0">
                {topics.map((t) => (
                  <li key={t.label} className="mb-[16px]">
                    <a href={t.href} className="text-[14px] font-medium leading-[18.9px] tracking-[0.28px] text-secondary no-underline">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3 lg:gap-x-[32px] lg:gap-y-[48px]">
            {cards.map((c) => (
              <ResourceCard
                key={c.title}
                flat
                title={c.title}
                desc={c.desc}
                href={c.href}
                eyebrow={{ type: 'meta', items: c.meta }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
