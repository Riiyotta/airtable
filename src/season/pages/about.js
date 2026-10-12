// /about — SEASON blocks in a different order (no breadcrumb, no FAQ)
import { t, h, brands } from '../copy.js'
import { cta } from './recipes.js'

const K = 'about'
const offices = [
  ['San Francisco', '100 Example Street, Suite 200', 'San Francisco, CA 94100'],
  ['New York', '25 Sample Avenue, Floor 9', 'New York, NY 10001'],
  ['London', '12 Placeholder Lane, Level 3', 'London, United Kingdom EC1'],
  ['Mexico City', '48 Ejemplo Boulevard, Office 5', 'Mexico City, CDMX 06600'],
  ['Remote', 'Distributed team across many regions', 'Working from anywhere, together'],
]
export default {
  skin: 'season',
  font: 'season',
  sections: [
    {
      type: 'hero',
      badge: 'Our story',
      headline: 'Ideas become lasting infrastructure',
      sub: t(48, `${K}-sub`),
      actions: [
        { label: 'Start building free', href: '/signup', variant: 'primary' },
        { label: 'View careers', href: '#', variant: 'secondary' },
      ],
    },
    {
      type: 'sideBySide',
      position: 'left',
      headlineSize: 'section',
      radius: 4,
      badge: 'Our purpose',
      headline: 'We exist to help people build the software they need',
      body: t(50, `${K}-purpose`),
      media: { ratio: '4/5' },
    },
    { type: 'logos', heading: 'Trusted by', logos: brands(6, 1), motion: 'season' },
    {
      type: 'cards',
      headline: 'Trusted by teams everywhere today',
      cards: [
        { title: '40M+', body: 'People using workspaces' },
        { title: '500K+', body: 'Organizations' },
        { title: '80%', body: 'Of large enterprises represented' },
      ],
    },
    {
      type: 'cards',
      headline: 'Organizations building with us every day',
      cards: brands(3, 12).map((b, i) => ({ icon: true, title: b, body: t([13, 14, 13][i], `${K}-cust${i}`) })),
    },
    {
      type: 'tabber',
      badge: 'Where we work',
      headline: 'Meet the people and places behind us',
      sub: t(32, `${K}-tabs-sub`),
      tabs: offices.map(([label, street, city]) => ({
        label,
        subhead: label,
        groups: [{ strong: street, text: city }],
        action: { label: 'View open roles', href: '#' },
      })),
    },
    { type: 'integrations', headline: 'Our recognition', sub: t('134c', `${K}-awards`), tiles: 4 },
    cta('Join the teams turning their best ideas into working software today', [{ label: 'Start building free', href: '/signup' }]),
  ],
}
