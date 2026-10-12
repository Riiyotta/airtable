/** @type {import('tailwindcss').Config} */

// Font stacks — CLONE_SPEC §0 "Fonts".
const systemStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  '"Fira Sans"',
  '"Droid Sans"',
  '"Helvetica Neue"',
  'sans-serif',
]

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Breakpoints used by the original CSS (min-width): 768, 900, 1024, 1664 — CLONE_SPEC §0 / §12.
    screens: {
      md: '768px',
      md2: '900px',
      lg: '1024px',
      '2xl': '1664px',
    },
    extend: {
      colors: {
        // Text
        ink: '#181D26', // strong / primary
        text: '#333840', // default body text
        secondary: '#41454D',
        weak: 'rgba(4,14,32,0.69)', // #040E20B0
        'weak-70': 'rgba(4,14,32,0.7)', // section subheadings / card 2 body
        'weak-base': '#040E20',
        link: '#254FAD',
        'footer-heading': '#333333',
        'back-label': '#333333', // drawer "Back" row label (§1d)
        // Backgrounds
        subtle: '#F8FAFC',
        strong: '#E0E2E6',
        promo: '#F0F6FF',
        // Borders / keylines
        keyline: '#E0E2E6',
        'keyline-strong': 'rgba(1,20,53,0.12)', // footer separator, drawer backdrop
        // Interaction
        'row-hover': 'rgba(15,48,106,0.05)', // drawer + mobile menu row hover
        'white-hover': 'rgba(242,244,247,0.92)', // white button hover
        chevron: '#949494',
        'chevron-open': '#95BEFC', // also the open-toggle underline bar
        // Drawer promo panels
        'promo-platform': { from: '#EBF7FC', to: '#C7E5F2', heading: '#0076A8' },
        'promo-solutions': { from: '#F8FAFC', to: '#E0E2E6', heading: '#41454D', eyebrow: '#9297A0' },
        'promo-resources': { from: '#EBF7F7', to: '#C7EBE9', heading: '#097A76', eyebrow: '#0DBDB4' },
        // Tab cards (§0 palette)
        'tab-1': '#912E1F',
        'tab-2': '#FFFFFF',
        'tab-4': '#FAF5E8',
        'tab-4-heading': '#214224',
        'tab-ind-1': '#912E1F',
        'tab-ind-2': '#B6E995',
        'tab-ind-3': '#002D98',
        'tab-ind-4': '#214224',
        // Bento (bg / text; pill inverts)
        'bento-1': { bg: '#FCAB79', fg: '#AA2D00' },
        'bento-2': { bg: '#C7E5F2', fg: '#0A2E0E' },
        'bento-3': { bg: '#254FAD', fg: '#FA91E0' },
        'bento-4': { bg: '#0A2E0E', fg: '#FCB42A' },
        // Customer story pane
        'story-pane': '#CCCCCC',
      },
      fontFamily: {
        haas: ['Haas', ...systemStack],
        display: ['"Haas Groot Disp"', 'Haas', ...systemStack],
      },
      borderRadius: {
        btn: '12px',
        tab: '24px',
        bento: '32px',
        card: '16px', // resource + CTA cards
        video: '16px',
        pill: '999px',
        indicator: '2px',
        bar: '6px', // hamburger bars, toggle underline, hamburger button
      },
      boxShadow: {
        header: '0 0 20px 0 rgba(15,48,106,0.05)',
        'drawer-edge': 'inset 15px 0 15px -15px #0f306a0d',
        'btn-primary':
          '0 0 1px 0 rgba(0,0,0,.32), 0 0 2px 0 rgba(0,0,0,.08), 0 1px 3px 0 rgba(45,127,249,.28), inset 0 0 0 .5px rgba(0,0,0,.06)',
        'btn-secondary':
          '0 0 1px 0 rgba(0,0,0,.32), 0 0 2px 0 rgba(0,0,0,.08), 0 1px 3px 0 rgba(0,0,0,.08), inset 0 0 0 1px rgba(1,20,53,.12)',
      },
      backgroundImage: {
        spotlight:
          'linear-gradient(91.6deg,#F5620C -3.95%,#FC4777 14.34%,#E848C0 28.2%,#9B67F0 52.43%,#458FFF 68.27%,#0AB2FA 86.46%,#0DBDB4 101.9%)',
        'promo-platform': 'linear-gradient(180deg, #EBF7FC 0%, #C7E5F2 100%)',
        'promo-solutions': 'linear-gradient(180deg, #F8FAFC 0%, #E0E2E6 100%)',
        'promo-resources': 'linear-gradient(180deg, #EBF7F7 0%, #C7EBE9 100%)',
      },
      maxWidth: {
        page: '1440px',
        grid: '1536px',
      },
      transitionTimingFunction: {
        'out-sine': 'cubic-bezier(0.61, 1, 0.88, 1)', // anime.js easeOutSine
        standard: 'cubic-bezier(.4,0,.2,1)',
      },
    },
  },
  plugins: [],
}
