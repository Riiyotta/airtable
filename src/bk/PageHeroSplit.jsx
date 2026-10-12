// BK-1 PageHeroSplit — SECTION_TYPES_solutions §3 BK-1.
// Band padding 72/0 (48 mobile); contained 0 24 + gridWrap 0 32 → 12 cols, gap 32.
// h1 cols 1–6 Haas 40/48 400 (32/40 mobile); description cols 8–12, vertically centered, 16/21.6 ls .16 (14/18.9 ls .28 mobile).
const THEMES = {
  light: { bg: '#F8FAFC', h1: '#333840', desc: '#333840' },
  dark: { bg: '#1F0C3B', h1: '#FFFFFF', desc: '#FFFFFF' },
}

export default function PageHeroSplit({ theme = 'light', title, description }) {
  const t = THEMES[theme]
  return (
    <section className="py-[48px] font-haas md:py-[72px]" style={{ backgroundColor: t.bg }}>
      <div className="mx-auto max-w-grid px-[24px]">
        {/* live: gridWrap margin 0 24 (0 32 ≥768); h1 cols 1–6, description cols 8–12; mobile row-gap 0 + p padding-top 24 */}
        <div className="mx-[24px] grid grid-cols-6 gap-x-[24px] md:mx-[32px] md:grid-cols-12 md:gap-x-[32px]">
          <h1
            className="col-span-6 m-0 text-[32px] font-normal leading-[40px] md:text-[40px] md:leading-[48px]"
            style={{ color: t.h1 }}
          >
            {title}
          </h1>
          <div className="col-span-6 flex items-center md:col-span-5 md:col-start-8">
            <p
              className="m-0 pt-[24px] text-[14px] font-normal leading-[18.9px] tracking-[0.28px] md:pt-0 md:text-[16px] md:leading-[21.6px] md:tracking-[0.16px]"
              style={{ color: t.desc }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
