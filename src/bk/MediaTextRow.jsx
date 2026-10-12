import BkLink from './BkLink.jsx'
import { PlaceholderBlock } from './Placeholder.jsx'

// BK-3 MediaTextRow — SECTION_TYPES_solutions §3 BK-3.
// 12-col grid (gap 32), padding 96/0; text 5 cols (561.3) vertically centered; media 6 cols, 680×680, margin 24/0.
// reverse=false: text cols 1–5, media cols 7–12. reverse=true: media cols 1–6, text cols 8–12.
// Mobile: 6 cols gap 24, padding 96/0 (live 390: 96 below the media), text always first, media 342×342.
export default function MediaTextRow({ title, body, link, reverse = false }) {
  return (
    <section className="mx-auto max-w-grid px-[24px] font-haas">
      <div className="grid grid-cols-6 gap-x-[24px] py-[96px] lg:grid-cols-12 lg:gap-x-[32px]">
        <div
          className={`col-span-6 flex flex-col items-start justify-center lg:row-start-1 lg:col-span-5 ${
            reverse ? 'lg:col-start-8' : 'lg:col-start-1'
          }`}
        >
          <h2 className="m-0 mb-[16px] text-[24px] font-normal leading-[31.2px] tracking-[0.12px] text-[#333333] lg:text-[40px] lg:leading-[50px] lg:tracking-normal">
            {title}
          </h2>
          <p className="m-0 mb-[16px] text-[20px] font-normal leading-[32.5px] text-[#333333]">{body}</p>
          <BkLink href={link.href} size="lg">
            {link.label}
          </BkLink>
        </div>
        <div className={`col-span-6 my-[24px] lg:row-start-1 ${reverse ? 'lg:col-start-1' : 'lg:col-start-7'}`}>
          <PlaceholderBlock className="aspect-square w-full" hint={title} seed={title} />
        </div>
      </div>
    </section>
  )
}
