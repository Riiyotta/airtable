import { useState } from 'react'
import ResourceCard from '../components/ResourceCard.jsx'
import { bkButton, bkOutline } from '../components/buttonStyles.js'

// BK-5 CardGridLoadMore — SECTION_TYPES_solutions §3 BK-5.
// Contained 0 24; grid repeat(3) gap 32 (mobile 1 col, gap 48); `pageSize` cards initially.
// "Load more": homepage secondary BkButton, centered, margin 48/0/72 (48/0/48 below 1024, live 390); reveals the next `pageSize` items
// and hides once everything is shown. Section padding-bottom 48.
// items: [{ title, href, logo }] → ResourceCard imageTop + logo eyebrow, no description.
export default function CardGridLoadMore({ items, pageSize = 12, buttonLabel = 'Load more' }) {
  const [count, setCount] = useState(pageSize)
  return (
    <section className="mx-auto max-w-grid px-[24px] pb-[48px] pt-[24px] font-haas">
      <div className="grid grid-cols-1 gap-[48px] lg:grid-cols-3 lg:gap-[32px]">
        {items.slice(0, count).map((it) => (
          <ResourceCard key={it.title} flat title={it.title} href={it.href} eyebrow={{ type: 'logo', label: it.logo }} mediaKind="story" />
        ))}
      </div>
      {count < items.length && (
        <div className="mb-[48px] mt-[48px] flex justify-center lg:mb-[72px]">
          <button
            type="button"
            onClick={() => setCount((c) => c + pageSize)}
            className={`${bkButton} ${bkOutline} cursor-pointer shadow-btn-secondary hover:border-weak hover:shadow-none`}
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </section>
  )
}
