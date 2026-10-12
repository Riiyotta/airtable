// /platform/reporting — family A, "feature stack" recipe (closing CTA is an A4 row)
import { crumbsPlatform, hero, row, WATCH, TRY, DEMO } from './recipes.js'

const K = 'rep'
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('Reporting'),
  sections: [
    hero(K, { h1: 'Reports that keep pace with your work', sub: '113c', actions: [WATCH, TRY], media: { ratio: '1280/426' } }),
    row(`${K}-r1`, 'bottom', 5, 20, null, '1260/428', { video: true }),
    row(`${K}-r2`, 'right', 7, 18, null, '591/434'),
    row(`${K}-r3`, 'left', '51c', 19, null, '591/452'),
    row(`${K}-r4`, 'right', 5, 17, null, '4/3'),
    row(`${K}-r5`, 'left', 5, null, null, '1280/827', {
      actions: [
        { ...TRY, variant: 'primary' },
        { ...DEMO, variant: 'secondary' },
      ],
    }),
  ],
}
