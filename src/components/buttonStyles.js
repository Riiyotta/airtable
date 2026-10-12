// BkButton — CLONE_SPEC §10 / §0 "Buttons".
// padding 16/24, radius 12, 1px border, 500 16/21.6 Haas, ls .16px, transition all .2s linear.
export const bkButton =
  'inline-flex items-center justify-center whitespace-nowrap rounded-btn border border-solid px-[24px] py-[16px] font-haas text-[16px] font-medium leading-[21.6px] tracking-[0.16px] transition-all duration-200 ease-linear'

// State rules measured from the original's blackBtnTheme CSS (rule order there: hover < active < focus,
// which is also Tailwind's hover < focus < active order except for active; active only sets the border
// so the focus background still wins while pressed, as on the original).
//   primary   hover: shadow none; ≥768 bg/border rgba(4,14,32,.69)   active: border rgba(7,12,20,.82)
//             focus: bg #181D26 + ring 0 0 0 4px rgba(153,160,174,.16), 0 0 0 2px #fff
//   secondary hover: shadow none, color rgba(4,14,32,.69); ≥768 border same   active: border #181D26
//             focus: bg rgba(249,252,255,.97), border #181D26 + same ring
//   white     hover: bg/border rgba(242,244,247,.92)   active: border rgba(225,228,234,.86)
//             focus: bg #fff + ring 0 0 0 4px rgba(255,255,255,.16), 0 0 0 2px #fff
const ring = 'focus:shadow-[0_0_0_4px_rgba(153,160,174,0.16),0_0_0_2px_#fff]'
// (md: copies of focus/active so they outrank the md:hover rules, which Tailwind emits later.)
export const bkPrimary = `border-ink bg-ink text-white md:hover:border-weak md:hover:bg-weak focus:bg-ink md:focus:bg-ink ${ring} active:border-[rgba(7,12,20,0.82)] md:active:border-[rgba(7,12,20,0.82)]`
export const bkOutline = `border-ink bg-transparent text-ink hover:text-weak md:hover:border-weak focus:border-ink md:focus:border-ink focus:bg-[rgba(249,252,255,0.97)] ${ring} active:border-ink md:active:border-ink`
export const bkWhite =
  'border-white bg-white text-ink hover:border-white-hover hover:bg-white-hover focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,255,255,0.16),0_0_0_2px_#fff] active:border-[rgba(225,228,234,0.86)]'
