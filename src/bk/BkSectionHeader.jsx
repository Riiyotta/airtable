// BkSectionHeader — SECTION_TYPES_solutions §2.3. Wrapper margin 48/0/4 (live 390: 32/0/4); h5 "Haas Groot Disp" 18/24.3,
// ls .18 (.36 mobile), #181D26, mb 16; then a 2px full-width rule (#F8FAFC listing pages, #0114351F guides).
export default function BkSectionHeader({ title, rule = '#F8FAFC', className = 'mt-[32px] mb-[4px] lg:mt-[48px]' }) {
  return (
    <div className={className}>
      <h5 className="mb-[16px] font-display text-[18px] font-normal leading-[24.3px] tracking-[0.36px] text-ink md:tracking-[0.18px]">
        {title}
      </h5>
      <div className="h-[2px] w-full" style={{ backgroundColor: rule }} />
    </div>
  )
}
