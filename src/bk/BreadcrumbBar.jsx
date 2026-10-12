// BreadcrumbBar — SECTION_TYPES_solutions §2.1.
// Sticky under the header: live uses top calc(var(--mainNavHeight) - 1px), z 3 (header sets --mainNavHeight at runtime), 42.2 tall, bg #F8FAFC + inset shadow.
// crumbs: [{ label, href }]; the last crumb is the current page (non-link span role=link).
// Motion NOT implemented here: the scroll-hide (isScrolling → opacity 0, translateY(-12px), .25s ease-in).
export default function BreadcrumbBar({ crumbs }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="sticky top-[calc(var(--mainNavHeight,143.7px)-1px)] z-[3] h-[42.2px] w-full bg-subtle font-haas shadow-[inset_0_7px_20px_-7px_rgba(15,48,106,0.05)]"
    >
      <ol className="m-0 flex h-full list-none items-center px-[32px] py-[12px]">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          const cls =
            'text-[14px] font-normal leading-[18.2px] tracking-[0.14px] text-ink no-underline transition-all duration-150 ease-in'
          return (
            <li key={i} className="flex items-center">
              {last ? (
                <span role="link" aria-current="page" aria-disabled="true" className={cls}>
                  {c.label}
                </span>
              ) : (
                <>
                  <a
                    href={c.href}
                    className={`${cls} hover:bg-row-hover lg:hover:bg-transparent lg:hover:text-[#254FAD]`}
                  >
                    {c.label}
                  </a>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className="mx-[8px] -rotate-90 text-[#333333]"
                  >
                    <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
