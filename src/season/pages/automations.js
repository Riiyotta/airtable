// /platform/automations — family A, "feature stack" recipe (no FAQ / CTA block)
import { crumbsPlatform, hero, row, WATCH, TRY, SIGNUP, DEMO } from './recipes.js'

const K = 'auto'
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('Automations'),
  sections: [
    hero(K, { h1: 'Automate repetitive work', sub: 16, actions: [WATCH, TRY], media: { ratio: '1280/427' } }),
    row(`${K}-r1`, 'bottom', 7, 16, null, '1262/429', { video: true }),
    row(`${K}-r2`, 'right', 4, 13, null, '4/3'),
    row(`${K}-r3`, 'left', 5, '96c', null, '4/3'),
    row(`${K}-r4`, 'right', 7, null, null, '1280/827', {
      actions: [
        { ...SIGNUP, variant: 'primary' },
        { ...DEMO, variant: 'secondary' },
      ],
    }),
  ],
}
