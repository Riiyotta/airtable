// Shared colours for the md- illustration system. Values come from tailwind.config.js and the
// season.css tokens (inks, warm grays, blues, pastel card colours, navy #012978, purple #AC59FF)
// plus a few generic pastel accents for single-select pills.

export const INK = '#181D26'
export const TEXT = '#333840'
export const NAVY = '#012978'
export const PURPLE = '#AC59FF'
export const BLUE = '#254FAD'
export const SKY = '#0AB2FA'

// [fill, text] pill pairs
export const PILLS = [
  ['#D1F7C4', '#0A4B1A'], // green
  ['#FFEAB6', '#5C3B00'], // yellow
  ['#FFDCE5', '#7A0F2E'], // rose
  ['#EDE2FE', '#3A1A78'], // purple
  ['#CFDFFF', '#102046'], // blue
  ['#C2F5E9', '#06433A'], // teal
  ['#FEE2D5', '#6B2A08'], // orange
  ['#E0E2E6', '#333840'], // gray
]

// Solid accents for bars, chart series, icons (site pastel card colours + blues).
export const ACCENTS = ['#254FAD', '#FCAB79', '#B6E995', '#AC59FF', '#0AB2FA', '#FCB42A', '#FA91E0', '#6F9FFF', '#0DBDB4', '#FFA244']

// Soft backdrop gradients behind product windows.
export const LIGHT_BACKDROPS = [
  ['#EBF7FC', '#C7E5F2'],
  ['#FAF5E8', '#F3DDC2'],
  ['#F4ECFF', '#DCC6FF'],
  ['#EEF8E6', '#C9EDB0'],
  ['#FFF1E8', '#FCCDAE'],
  ['#F8F6F6', '#EBE6E5'],
  ['#F0F6FF', '#C8D9FB'],
]
export const DARK_BACKDROPS = [
  ['#2A2F38', '#181D26'],
  ['#1B2A52', '#012978'],
  ['#2A2F38', '#3B2560'],
  ['#202A33', '#0F3B44'],
]

export const THEMES = {
  light: {
    win: '#FFFFFF',
    stroke: '#E0E2E6',
    head: '#F8FAFC',
    panel: '#F5F6F8',
    ink: INK,
    sub: '#6A707A',
    line: '#EEF0F3',
    faint: '#E6E8EC',
    shadow: 'rgba(24,29,38,0.10)',
  },
  dark: {
    win: '#323843',
    stroke: '#434A57',
    head: '#2C323C',
    panel: '#2A2F38',
    ink: '#F2F4F7',
    sub: '#A3A9B4',
    line: '#3D4450',
    faint: '#4A5260',
    shadow: 'rgba(0,0,0,0.35)',
  },
}
