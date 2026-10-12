// BkLink (standalone, with arrow) — SECTION_TYPES_solutions §2.3.
// size "sm": 14/18.9 500 ls .07 #0768F8 (icon cards). size "lg": 20/30 500 ls .1 #1B61C9 → hover #1B61C9CC (media-text rows).
// Arrow 16×12 + margin-left 8 (live arrowRightBlue icon); hover translateX(4px) .15s ease-in.
export default function BkLink({ href, children, size = 'sm' }) {
  const text =
    size === 'lg'
      ? 'text-[20px] leading-[30px] tracking-[0.1px] text-[#1B61C9] hover:text-[#1B61C9CC]'
      : 'text-[14px] leading-[18.9px] tracking-[0.07px] text-[#0768F8]'
  return (
    <a href={href} className={`group inline-flex items-center font-haas font-medium no-underline ${text}`}>
      {children}
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        aria-hidden="true"
        className="ml-[8px] shrink-0 transition-transform duration-150 ease-in group-hover:translate-x-[4px] motion-reduce:transition-none"
      >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 1 5 5-5 5" />
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M15 6H1" />
      </svg>
    </a>
  )
}
