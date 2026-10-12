import MockMedia from '../media/MockMedia.jsx'

// Placeholder media slot (specs/pages_solutions.md "Placeholder media"): the measured box keeps its
// #E0E2E6 (light) / #2A2F38 (dark) fill and is covered by an original <MockMedia> scene.
export const PH_LIGHT = '#E0E2E6'
export const PH_DARK = '#2A2F38'

export function PlaceholderBlock({ className = '', dark = false, style, kind, seed = 0, hint }) {
  return (
    <div
      aria-hidden="true"
      className={`${className} md-host`}
      style={{ backgroundColor: dark ? PH_DARK : PH_LIGHT, ...style }}
    >
      <MockMedia kind={kind} seed={seed} hint={hint} theme={dark ? 'dark' : 'light'} />
    </div>
  )
}
