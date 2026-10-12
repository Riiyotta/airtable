import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { bkButton, bkOutline } from './buttonStyles.js'

// CLONE_SPEC §1 (header), §1c (drawers), §1d (mobile), §11 (motion).

const W = ''
const icon = (slug) => `/assets/inline-svg/drawer-icon-${slug}.svg`

// ---------------------------------------------------------------- drawer data (§1c)
const DRAWERS = {
  platform: {
    label: 'Platform',
    promo: {
      bg: 'bg-promo-platform',
      heading: 'text-promo-platform-heading',
      title: 'The Airtable Platform',
      overview:
        'Propel your business with a next-gen app-building platform. See data move in real-time and securely transform your work with AI.',
      cta: 'Explore the platform',
      href: `${W}/platform`,
      img: '/assets/marketing-nav-platform-graphic.webp',
      imgH: 264,
    },
    groups: [
      {
        title: 'Platform & Products',
        items: [
          { title: 'Airtable Platform', href: `${W}/platform`, sub: 'Unlock the power of a next-gen app-building platform' },
          { title: 'AI App Building', isNew: true, icon: icon('ai-app-building'), href: `${W}/platform/app-building`, sub: 'Enable teams to build custom business apps—no code needed' },
          { title: 'AI Agents', isNew: true, icon: icon('ai-agents'), href: `${W}/platform/ai-agents`, sub: 'Deploy thousands of agents inside your apps' },
          { title: 'Portals', icon: icon('portalscollaborate-seamlessly-with-guest'), href: `${W}/platform/portals`, sub: 'Collaborate seamlessly with guest users outside your organization' },
          { title: 'Scale', icon: icon('scalebuild-apps-on-top-of-massive-data-s'), iconW: 24 /* svg has only a viewBox */, href: `${W}/platform/hyperdb`, sub: 'Build apps on top of massive data sets with 100M records' },
          {
            title: 'Platform Features',
            icon: icon('platform-featureslearn-about-automations'),
            sub: 'Learn about automations, interfaces, and more',
            nested: {
              id: 'features',
              group: 'Features',
              items: [
                { title: 'Automations', icon: icon('automationsachieve-more-in-less-time-via'), href: `${W}/platform/automations`, sub: 'Achieve more in less time via automations' },
                { title: 'Databases', icon: icon('databasesuse-relational-databases-to-con'), href: `${W}/platform/connected-data`, sub: 'Use relational databases to connect data from apps, workflows, and tools' },
                { title: 'Interfaces', icon: icon('interfacescreate-custom-interfaces-from-'), href: `${W}/platform/interface-designer`, sub: 'Create custom interfaces from your data' },
                { title: 'Reporting', icon: icon('reportingmeasure-analyze-and-share-insig'), href: `${W}/platform/reporting`, sub: 'Measure, analyze, and share insights' },
                { title: 'Governance and Security', icon: icon('governance-and-securitycentrally-manage-'), href: `${W}/platform/governance`, sub: 'Centrally manage security, permissions and data protection' },
                { title: 'Airtable AI', icon: icon('airtable-aiembed-ai-throughout-end-to-en'), href: `${W}/platform/ai`, sub: 'Embed AI throughout end-to-end workflows' },
                // hideSub: the original marks this row hideSubTextThruXl (subtext visually hidden). Applied in the desktop panel.
                { title: "What's New", icon: icon('what-s-'), href: `${W}/whatsnew`, sub: "See Airtable's latest product updates", hideSub: true },
              ],
            },
          },
        ],
      },
      {
        title: 'Tools',
        hideSub: true, // §1c: subtexts visually hidden at this width
        items: [
          {
            title: 'Integrations',
            sub: 'Integrate with tools like Slack, Google Drive, and Salesforce',
            nested: {
              id: 'integrations',
              group: 'Integrations',
              items: [
                { title: 'Slack', icon: icon('slackadd-real-time-messaging-to-your-wor'), href: `${W}/integrations/slack`, sub: 'Add real-time messaging to your workflows' },
                { title: 'Google Drive', icon: icon('google-drivesync-information-and-build-w'), href: `${W}/integrations/google-drive`, sub: 'Sync information and build workflows' },
                { title: 'Salesforce', icon: icon('-salesforce-svg-st1-fill-fff-salesforcel'), href: `${W}/integrations/salesforce`, sub: 'Leverage CRM data across teams and tools' },
                { title: 'Jira', icon: icon('jiragenerate-tickets-and-sync-work-from-'), href: `${W}/integrations/jira`, sub: 'Generate tickets and sync work from Airtable' },
                { title: 'Zendesk', icon: icon('zendesksimplify-and-streamline-workflows'), href: `${W}/integrations/zendesk`, sub: 'Simplify and streamline workflows' },
              ],
              seeAll: { title: 'See all integrations', href: `${W}/integrations` },
            },
          },
          { title: 'Download', href: `${W}/downloads`, sub: 'Get the Airtable app for desktop and mobile' },
        ],
      },
    ],
  },
  solutions: {
    label: 'Solutions',
    promo: {
      bg: 'bg-promo-solutions',
      heading: 'text-promo-solutions-heading',
      eyebrowColor: 'text-promo-solutions-eyebrow',
      eyebrow: 'Customer Story',
      title: 'More money, fewer problems',
      overview: 'How Code and Theory consolidated tooling and saved more than 10,000 hours with Airtable.',
      cta: 'Learn more',
      href: `${W}/customer-stories/code-and-theory`,
      img: '/assets/marketing-nav-solution.webp',
      imgH: 268,
    },
    groups: [
      {
        title: 'Teams',
        // Teams + Industries share one <li> on the original (32px bottom margin, not 32 + list gap).
        className: 'mb-[16px] lg:mb-[8px]',
        items: [
          { title: 'Product', href: `${W}/solutions/product`, sub: "See what's happening across your portfolio, and ship better products." },
          { title: 'Marketing', href: `${W}/solutions/marketing`, sub: 'Plan smarter campaigns and scale impact with unifed marketing workflows.' },
          { title: 'Project Management', href: `${W}/solutions/project-management`, sub: 'Strategic project management built for outcomes, not just to-do lists.' },
          { title: 'Operations', href: `${W}/solutions/operations`, sub: 'Run operations in one platform that connects workflows, data, and tools.' },
          { title: 'Sales', href: `${W}/solutions/sales`, sub: 'Surface sales opportunities, spot churn risk early, and close more deals faster.' },
          { title: 'Design & Creative', href: `${W}/solutions/design-creative-project-management`, sub: 'Unify design workflows, stay on-brand, and innovate creative quickly.' },
          { title: 'Human Resources', href: `${W}/solutions/hr`, sub: 'Manage and streamline processes from hire to retire' },
          { title: 'Finance', href: `${W}/solutions/finance`, sub: 'Streamline requests, manage budgets, and automate reporting' },
        ],
      },
      {
        title: 'Industries',
        joinPrev: true, // same <li> as Teams on the original → same stagger slot
        items: [
          { title: 'Media & Entertainment', href: `${W}/solutions/media-entertainment`, sub: 'Run content production, digital assets, and crew operations in one place' },
          { title: 'Retail', href: `${W}/solutions/retail`, sub: 'Power critical retail workflows from product planning to final purchase' },
          { title: 'CPG Manufacturing', href: `${W}/solutions/manufacturing`, sub: 'Keep track of your products, supply chain, and quality assurance' },
          { title: 'Education', href: `${W}/solutions/education`, sub: 'Manage student services, planning, and grants more efficiently' },
          { title: 'Technology', href: `${W}/solutions/saas-project-management`, sub: 'Unite your entire SaaS org to drive faster GTM execution and greater impact.' },
          { title: 'Agency & Professional Services', href: `${W}/solutions/agency`, sub: 'Streamline coordination, protect margins, and deliver better client outcomes.' },
        ],
      },
    ],
  },
  resources: {
    label: 'Resources',
    promo: {
      bg: 'bg-promo-resources',
      heading: 'text-promo-resources-heading',
      eyebrowColor: 'text-promo-resources-eyebrow',
      eyebrow: 'Resource Center',
      title: 'Stay one step ahead of the trends',
      overview:
        'This content is packed with demos, best practices, industry trends, and more. See how to win in a fast-moving market.',
      cta: 'Explore all resources',
      href: `${W}/lp/resources`,
      img: '/assets/marketing-nav-resource.webp',
      imgH: 260,
    },
    groups: [
      {
        title: 'Explore',
        items: [
          {
            title: 'Resources Hub',
            nested: {
              id: 'resources-hub',
              group: 'Resources Hub',
              items: [
                { title: 'Reports', icon: icon('reports'), href: `${W}/lp/resources?filter=reports` },
                { title: 'eBooks', icon: icon('ebooks'), href: `${W}/lp/resources?filter=ebooks` },
                { title: 'Webinars', icon: icon('webinars'), href: `${W}/lp/resources?filter=webinars` },
                { title: 'Quick Reads', icon: icon('quick-reads'), href: `${W}/lp/resources?filter=quick-reads` },
                { title: 'Demos', icon: icon('demos'), href: `${W}/lp/resources?filter=demos` },
              ],
              seeAll: { title: 'See all resources', href: `${W}/lp/resources` },
            },
          },
          {
            title: 'Templates',
            nested: {
              id: 'templates',
              group: 'Templates',
              items: [
                { title: 'Project Management', isNew: true, icon: icon('project-management'), href: `${W}/templates/project-management/expnPwND0WA2x7nhJ` },
                { title: 'Content Calendar', icon: icon('content-calendar'), href: `${W}/templates/content-calendar/exp3FNmOkdHZvprXB` },
                { title: 'Event Planning', icon: icon('event-planning'), href: `${W}/templates/event-planning/expKIiL87pUceFRjc` },
                { title: 'Product Roadmap', icon: icon('product-roadmap'), href: `${W}/templates/product-roadmap/exphVKuL99S35ZsMi` },
                { title: 'Organizational Chart', icon: icon('organizational-chart'), href: `${W}/templates/corporate-organizational-chart/expgMvC4WkxpKviHn` },
                { title: 'Resource Allocation', isNew: true, icon: icon('resource-allocation'), href: `${W}/templates/resource-allocation/expMLg1OTd4pKVxCU` },
                { title: 'Social Media Calendar', icon: icon('social-media-calendar'), href: `${W}/templates/social-media-calendar/expgEkxMmWRqpa43k` },
                { title: 'Marketing Campaign Tracker', icon: icon('marketing-campaign-tracker'), href: `${W}/templates/marketing-campaign-tracking/expNoL0sYUbOogSCm` },
                { title: 'Product Launch', icon: icon('product-launch'), href: `${W}/templates/product-launch/expbtFa3nsLpIQfgk` },
                { title: 'Content Strategy', icon: icon('content-strategy'), href: `${W}/templates/content-strategy/exp1nfqhaFgeAyk2f` },
                { title: 'Product Strategy', icon: icon('product-strategy'), href: `${W}/templates/product-strategy/expbov1cc8Qb05egC` },
                { title: 'Inventory Tracker', icon: icon('inventory-tracker'), href: `${W}/templates/inventory-tracker/expDrHGuyjSQlrKTq` },
                { title: 'Product Catalog', icon: icon('product-catalog'), href: `${W}/templates/product-catalog-and-orders/expZvMLT9L6c4yeBX` },
              ],
              seeAll: { title: 'See all templates', href: `${W}/templates` },
            },
          },
          { title: 'AI Plays', href: `${W}/ai-plays` },
          { title: 'Blog', href: `${W}/articles` },
          { title: 'Customer Stories', href: `${W}/customer-stories` },
          { title: 'Videos', href: `${W}/videos` },
          { title: 'Events', href: `${W}/events-webinars` },
        ],
      },
      {
        title: 'Learn & Support',
        items: [
          { title: 'Airtable Academy', href: '#' },
          { title: 'Airtable Community', href: '#' },
          {
            title: 'Developers Docs',
            nested: {
              id: 'developers',
              group: 'Developers',
              items: [
                { title: 'Dev Community', icon: icon('dev-communityshare-ideas-and-find-soluti'), href: '#', sub: 'Share ideas and find solutions from peers' },
                { title: 'API Docs', icon: icon('api-docsbuild-with-the-airtable-api'), href: '/developers/web/api/introduction', sub: 'Build with the Airtable API' },
                { title: 'Custom Extensions', icon: icon('custom-extensionscreate-real-time-intera'), href: '/developers/apps', sub: 'Create real-time, interactive extensions' },
                { title: 'Scripting', icon: icon('scriptingbuild-something-custom-with-scr'), href: '/developers/scripting', sub: 'Build something custom with scripts' },
              ],
            },
          },
          { title: 'How-to guides', href: `${W}/guides` },
          {
            title: 'Support',
            nested: {
              id: 'support',
              group: 'Support',
              items: [
                { title: 'Help center', href: '#' },
                { title: 'Contact Support', href: '#' },
              ],
            },
          },
        ],
      },
      {
        title: 'Ecosystem',
        items: [
          { title: 'Marketplace', href: '/marketplace' },
          { title: 'Partners', href: `${W}/partners` },
          { title: 'Services', href: `${W}/services` },
        ],
      },
    ],
  },
}
const DRAWER_KEYS = ['platform', 'solutions', 'resources']

// ---------------------------------------------------------------- small pieces
function Chevron({ className = '' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={className} style={{ shapeRendering: 'geometricPrecision' }}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.399 4.399a.85.85 0 1 1 1.202 1.202l-3 3a.85.85 0 0 1-1.202 0l-3-3a.85.85 0 1 1 1.202-1.202L6 6.798z"
      />
    </svg>
  )
}

function NewPill() {
  return (
    <span className="ml-[12px] mr-[8px] inline-flex h-[29px] items-center rounded-pill bg-spotlight px-[12px] py-[4px] text-[14px] font-medium leading-[18.9px] tracking-[0.28px] text-white">
      NEW
    </span>
  )
}

const rowBase =
  'flex w-full items-start px-[24px] py-[12px] text-left transition-colors duration-150 ease-in hover:bg-row-hover focus-visible:bg-row-hover lg:px-[48px]'
const rowTitle =
  'flex items-center text-[18px] font-medium leading-[23.4px] tracking-[0.18px] lg:text-[20px] lg:leading-[26px] lg:tracking-[0.2px]'
const rowSub = 'mt-[4px] text-[16px] leading-[20.8px] tracking-[0.16px] text-weak'

// Icon box: intrinsic svg size, min 24px wide (original: span min-width 24, svg 16–26px wide).
function RowIcon({ src, w }) {
  return (
    <span className="mr-[12px] flex min-w-[24px] shrink-0">
      <img src={src} alt="" width={w} className="block h-auto max-w-none" />
    </span>
  )
}

function DrawerLink({ item, hideSub }) {
  return (
    <a href={item.href} className={rowBase}>
      {item.icon && <RowIcon src={item.icon} w={item.iconW} />}
      <span className="flex flex-col">
        <span className={`${rowTitle} text-ink`}>
          {item.title}
          {item.isNew && <NewPill />}
        </span>
        {item.sub && <span className={`${rowSub} ${hideSub ? 'hidden' : ''}`}>{item.sub}</span>}
      </span>
    </a>
  )
}

function NestedToggle({ item, hideSub, onOpen, active }) {
  // Original wrapper: bg #F8FAFC while its panel is open (desktop), rgba(15,48,106,.05) on hover / focus-within, .15s ease-in.
  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={active}
      data-active={active}
      onClick={onOpen}
      className={`nested-toggle ${rowBase} !items-center justify-between focus:bg-row-hover`}
    >
      <span className="flex items-start">
        {item.icon && <RowIcon src={item.icon} w={item.iconW} />}
        <span className="flex flex-col">
          <span className={`${rowTitle} text-black`}>{item.title}</span>
          {item.sub && <span className={`${rowSub} ${hideSub ? 'hidden' : ''}`}>{item.sub}</span>}
        </span>
      </span>
      <Chevron className="ml-[48px] shrink-0 -rotate-90 text-ink opacity-50" />
    </button>
  )
}

function GroupTitle({ children }) {
  return (
    <div className="flex items-center gap-[16px] px-[24px] uppercase lg:gap-[24px] lg:px-[48px]">
      <span className="whitespace-nowrap text-[12px] font-medium leading-[16.2px] tracking-[0.12px] text-weak lg:text-[14px] lg:leading-[18.9px]">
        {children}
      </span>
      <hr className="m-0 h-[2px] flex-1 border-0 bg-ink opacity-25" />
    </div>
  )
}

function BackRow({ onClick, label = 'Back' }) {
  return (
    <button
      type="button"
      aria-label="Go back to previous menu options"
      onClick={onClick}
      className="flex h-[44px] w-full items-center gap-[8px] bg-row-hover px-[24px] py-[12px] text-[16px] font-medium leading-[20px] text-back-label lg:px-[48px]"
    >
      <img src="/assets/inline-svg/back-arrow.svg" alt="" width="18" height="12" />
      <span>{label}</span>
    </button>
  )
}

function PromoPanel({ promo, open, index, dim }) {
  return (
    <div data-open={open} className="drawer-motion drawer-motion--promo fixed left-[650px] top-0 z-[-1] h-full w-[min(calc(100vw-650px),480px)]">
      {/* Dims to .25 while a nested panel is open (fades .15s ease-in; snaps back to 1 on close). */}
      <div data-dim={dim} className="promo-dim h-full">
      {/* Last item of the drawer's 75ms stagger (opacity only: it's position:fixed on the original). */}
      <div className="drawer-fade h-full bg-subtle" style={{ paddingTop: 'var(--mainNavHeight)', '--i': index }}>
        <div className={`flex flex-col gap-[48px] px-[48px] pb-[48px] pt-[72px] shadow-header ${promo.bg}`}>
          <div className="flex flex-col gap-[32px]">
            <div>
              {promo.eyebrow && (
                <p className={`mb-[8px] text-[14px] font-medium leading-[18.9px] tracking-[0.28px] ${promo.eyebrowColor}`}>
                  {promo.eyebrow}
                </p>
              )}
              <p className={`text-[48px] font-medium leading-[55.2px] tracking-[0.18px] ${promo.heading}`}>{promo.title}</p>
            </div>
            <p className="text-[18px] leading-[24.3px] tracking-[0.18px] text-ink">{promo.overview}</p>
            <a href={promo.href} className={`${bkButton} ${bkOutline} self-start !leading-[20.8px] !duration-150 ![transition-timing-function:ease-in]`}>
              {promo.cta}
            </a>
          </div>
          <img src={promo.img} alt="" width="384" height={promo.imgH} className="h-auto w-full max-w-[384px]" />
        </div>
      </div>
      </div>
    </div>
  )
}

// Desktop (≥1024) nested panel — measured on the original (DrawerNested): a fixed column at the drawer's right
// edge (x 650, width 100vw−650, pointer-events none) holding the 480px #F8FAFC list and a 48px column with the
// 32px white round close button (title "Close menu", 12px #9297A0 X) at (+16,+16). The root list stays visible.
function NestedPanelDesktop({ panel, active, onClose }) {
  return (
    <div
      data-active={active}
      aria-hidden={!active}
      className="nested-desk pointer-events-none absolute inset-0 flex items-start"
      style={{ paddingTop: 'var(--mainNavHeight)' }}
    >
      <div className="nested-desk-scroll h-full w-full max-w-[480px] overflow-y-auto bg-subtle">
        <ul className="mt-[32px] flex flex-col gap-[24px]">
          {/* slot 0 is the (desktop-hidden) Back row on the original, so the group item starts at 100 + 75ms */}
          <li className="nested-desk-item" style={{ '--i': 1 }}>
            <nav className="flex flex-col gap-[16px]" aria-label={panel.group}>
              <GroupTitle>{panel.group}</GroupTitle>
              <ul>
                {panel.items.map((item) => (
                  <li key={item.title}>
                    <DrawerLink item={item} hideSub={item.hideSub} />
                  </li>
                ))}
                {panel.seeAll && (
                  <li>
                    <a href={panel.seeAll.href} className={`${rowBase} mt-[24px]`}>
                      <span className={`${rowTitle} text-ink`}>
                        {panel.seeAll.title}
                        <svg width="16" height="13" fill="none" aria-hidden="true" className="ml-[8px] block shrink-0">
                          <path stroke="#181D26" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 1.5 5 5-5 5" />
                          <path stroke="#181D26" strokeLinecap="round" strokeWidth="2" d="M15 6.5H1" />
                        </svg>
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </li>
        </ul>
      </div>
      <div className="h-[48px] w-[48px] shrink-0">
        <button
          type="button"
          title="Close menu"
          aria-label="Close menu"
          onClick={onClose}
          tabIndex={active ? 0 : -1}
          className="nested-close ml-[16px] mt-[16px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white"
        >
          <svg width="12" height="12" fill="none" aria-hidden="true" className="block">
            <path
              fill="#9297A0"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.829 1.835a.59.59 0 0 0-.01-.83L10.997.18a.58.58 0 0 0-.831-.009L6 4.336 1.835.171a.59.59 0 0 0-.83.01l-.825.823a.58.58 0 0 0-.009.831L4.336 6 .171 10.165a.59.59 0 0 0 .01.83l.823.825a.58.58 0 0 0 .831.009L6 7.664l4.165 4.165a.59.59 0 0 0 .83-.01l.825-.823a.58.58 0 0 0 .009-.831L7.664 6z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

function Drawer({ id, open, nested, setNested, toggleNested, nestedDelay, onBack }) {
  const data = DRAWERS[id]
  const nestedItems = data.groups.flatMap((g) => g.items.filter((i) => i.nested).map((i) => i.nested))
  // Stagger slots follow the original's <li>s: 0 = Back row, then one per group <li>, then the promo.
  let slot = 0
  const groupSlots = data.groups.map((g) => (g.joinPrev ? slot : ++slot))

  return (
    <>
      <div
        data-open={open}
        aria-hidden={!open}
        className="drawer-motion fixed left-0 top-0 z-[-1] h-full w-full bg-white lg:w-[650px]"
        style={{ paddingTop: 'var(--mainNavHeight)' }}
      >
        <div className="relative h-full overflow-hidden">
          {/* Root list — acts as the "old panel" when a nested panel opens */}
          <div data-root="true" data-active={!nested} className="nested-panel absolute inset-0 overflow-y-auto">
            <ul className="flex flex-col gap-[16px] pt-[32px] lg:gap-[24px]">
              <li className="drawer-item lg:hidden" style={{ '--i': 0 }}>
                <BackRow onClick={onBack} label={data.label} />
              </li>
              {data.groups.map((group, gi) => (
                <li key={group.title} className={`drawer-item ${group.className || ''}`} style={{ '--i': groupSlots[gi] }}>
                  <nav className="flex flex-col gap-[12px] lg:gap-[16px]" aria-label={group.title}>
                    <GroupTitle>{group.title}</GroupTitle>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.title}>
                          {item.nested ? (
                            <NestedToggle
                              item={item}
                              hideSub={group.hideSub}
                              active={nested === item.nested.id}
                              onOpen={() => toggleNested(item.nested.id)}
                            />
                          ) : (
                            <DrawerLink item={item} hideSub={group.hideSub} />
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </li>
              ))}
            </ul>
          </div>

          {nestedItems.map((panel) => (
            // <1024 only: the nested list replaces the root list in place (with a Back row).
            <div key={panel.id} data-active={nested === panel.id} className="nested-panel absolute inset-0 overflow-y-auto lg:hidden">
              <ul className="flex flex-col gap-[16px] pt-[32px] lg:gap-[24px]">
                <li className="nested-item" style={{ '--i': 0 }}>
                  <BackRow onClick={() => setNested(null)} />
                </li>
                <li className="nested-item" style={{ '--i': 1 }}>
                  <nav className="flex flex-col gap-[12px] lg:gap-[16px]" aria-label={panel.group}>
                    <GroupTitle>{panel.group}</GroupTitle>
                    <ul>
                      {panel.items.map((item) => (
                        <li key={item.title}>
                          <DrawerLink item={item} />
                        </li>
                      ))}
                      {panel.seeAll && (
                        <li>
                          <DrawerLink item={panel.seeAll} />
                        </li>
                      )}
                    </ul>
                  </nav>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <PromoPanel promo={data.promo} open={open} index={slot + 1} dim={!!nested} />
        {/* ≥1024 nested panels: children of the drawer on the original, so they ride its -15% / fade on close
            (same wrapper motion as the promo column). */}
        <div
          data-open={open}
          className="drawer-motion drawer-motion--promo pointer-events-none fixed left-[650px] top-0 z-[-1] h-full w-[calc(100vw-650px)]"
          style={{ '--nested-delay': `${nestedDelay}ms` }}
        >
          {nestedItems.map((panel) => (
            <NestedPanelDesktop key={panel.id} panel={panel} active={nested === panel.id} onClose={() => setNested(null)} />
          ))}
        </div>
        {/* Drawer edge shadow — on the original a 20px ::after just outside the drawer (x 650–670, inset 15px 0 15px -15px
            rgba(15,48,106,.05)) that paints over the promo / nested column. Same wrapper motion as those columns. */}
        <span
          aria-hidden="true"
          data-open={open}
          className="drawer-motion drawer-motion--promo pointer-events-none fixed left-[650px] top-0 z-[-1] h-full w-[20px] shadow-drawer-edge"
        />
      </div>
    </>
  )
}

// ---------------------------------------------------------------- header
const navTextBase = 'text-[16px] font-medium leading-[20.8px] transition-colors duration-150 ease-in hover:text-link'
const navText = `${navTextBase} text-ink`
const navButton =
  'inline-flex items-center justify-center whitespace-nowrap rounded-btn border border-solid px-[24px] py-[16px] text-[16px] font-medium leading-[20.8px] tracking-[0.16px]'
const mobileRow =
  'flex w-full items-center justify-between px-[24px] py-[16px] text-left text-[18px] font-medium leading-[23.4px] text-ink transition-colors duration-150 ease-in hover:bg-row-hover focus-visible:bg-row-hover'

export default function Header() {
  const headerRef = useRef(null)
  const sentinelRef = useRef(null)
  const [promoOpen, setPromoOpen] = useState(true)
  const [stuck, setStuck] = useState(false)
  const [drawer, setDrawer] = useState(null) // 'platform' | 'solutions' | 'resources' | null
  const [nested, setNested] = useState(null)
  // Desktop nested switch: the incoming panel starts 150ms after the outgoing one (anime offset "-=100").
  const [nestedDelay, setNestedDelay] = useState(0)
  const toggleNested = (id) => {
    setNestedDelay(nested && nested !== id ? 150 : 0)
    setNested(nested === id ? null : id)
  }
  const [mobileOpen, setMobileOpen] = useState(false)
  // Measured anime.js timeline offsets (§11): when the incoming drawer starts, and how long the
  // wordmark waits before expanding again on close (it follows the 150ms drawer-out tween).
  const [drawerDelay, setDrawerDelay] = useState(0)
  const [wordmarkDelay, setWordmarkDelay] = useState(0)

  // Expose header height as --mainNavHeight (other sticky elements read it).
  useEffect(() => {
    const el = headerRef.current
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--mainNavHeight', `${el.getBoundingClientRect().height}px`)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // §1: IO on a sentinel (threshold 1, rootMargin "10px 0px 0px 0px") toggles headerIsStuck.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setStuck(entry.intersectionRatio < 1), {
      threshold: 1,
      rootMargin: '10px 0px 0px 0px',
    })
    io.observe(sentinelRef.current)
    return () => io.disconnect()
  }, [])

  const closeDrawer = () => {
    // Drawer out 150ms, then (not stuck, no mobile menu) wordmark back in 250ms.
    setWordmarkDelay(drawer && !stuck && !mobileOpen ? 150 : 0)
    setDrawer(null)
    setNested(null)
  }
  const openDrawer = (key) => {
    // open: [wordmark 250ms if not stuck] -> drawer. switch: [old out 150] -> [wordmark 250] -> drawer "-=200".
    if (drawer) setDrawerDelay(stuck ? -50 : 200)
    else setDrawerDelay(stuck ? 0 : 250)
    setWordmarkDelay(0)
    setNested(null)
    setDrawer(key)
  }
  const toggleDrawer = (key) => {
    if (drawer === key) closeDrawer()
    else openDrawer(key)
  }
  const toggleMobile = () => {
    setMobileOpen((o) => !o)
    setWordmarkDelay(0)
    setDrawer(null)
    setNested(null)
  }

  // Close any open drawer / mobile menu when a link inside it changes the route.
  const { pathname } = useLocation()
  useEffect(() => {
    setDrawer(null)
    setNested(null)
    setMobileOpen(false)
  }, [pathname])

  // Escape (measured on the live site): a document-level keydown closes the open drawer and moves focus to
  // its toggle — but only while no nested panel is open (with one open, live ignores Escape entirely).
  // The bare mobile menu ignores Escape too; with a category drawer open inside it, Escape returns to the
  // menu list (focus on that category's row) and the menu stays open.
  const toggleRefs = useRef({})
  const mobileToggleRefs = useRef({})
  useEffect(() => {
    if (!drawer || nested) return undefined
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      const key = drawer
      closeDrawer()
      const target = [toggleRefs.current[key], mobileToggleRefs.current[key]].find((el) => el && el.getClientRects().length)
      target?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  // Wordmark collapses when a drawer opens and the header isn't stuck (§11), and when the mobile menu is open (§1d).
  const collapseWordmark = (drawer && !stuck) || mobileOpen

  return (
    <>
      <span ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px" />
      <header
        ref={headerRef}
        id="marketingHeaderSharedRoot"
        className={`sticky top-0 z-[4] ${stuck ? 'headerIsStuck' : ''} ${drawer ? 'drawerIsActive' : ''}`}
        style={{ '--drawer-delay': `${drawerDelay}ms` }}
      >
        {/* 1a. Promo bar */}
        {promoOpen && (
          <div className="relative flex flex-col justify-center gap-[8px] bg-promo py-[12px] pl-[24px] pr-[64px] min-[640px]:flex-row min-[640px]:gap-[4px] md:pl-[32px]">
            <span className="self-start text-[14px] leading-[17.5px] text-text min-[640px]:self-auto">Bring your Airtable data into Claude.</span>
            <a
              href={`${W}/lp/claude-airtable`}
              className="inline-flex items-center self-start text-[14px] font-medium leading-[18.2px] tracking-[0.14px] text-link min-[640px]:self-auto"
            >
              Try it now
              <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" className="ml-[4px] rotate-180">
                <path
                  fill="currentColor"
                  d="M17 6.75a.75.75 0 0 0 0-1.5zM.47 5.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L2.061 6l4.242-4.243a.75.75 0 0 0-1.06-1.06zM17 5.25H1v1.5h16z"
                />
              </svg>
            </a>
            <button
              type="button"
              aria-label="Close promo banner"
              onClick={() => setPromoOpen(false)}
              className="absolute right-[24px] top-[15px] text-text"
            >
              <svg width="12" height="12" viewBox="0 0 490 490" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M456.851 0 245 212.564 33.149 0 .708 32.337l211.961 212.667L.708 457.678 33.149 490 245 277.443 456.851 490l32.441-32.322-211.961-212.674L489.292 32.337z"
                />
              </svg>
            </button>
          </div>
        )}

        {/* 1b. Main row */}
        {/* Live's ActionGroup keeps its 32px right margin even when the row is too narrow (1024–1080 and
            1081–1147 at 16px), which makes the whole live page scroll sideways. Same geometry here, but the
            overflow is clipped so the document never gets wider than the viewport. */}
        <nav className="grid grid-cols-[auto_1fr] bg-white shadow-header [overflow-x:clip]" aria-label="Main">
          {/* MainNav: brand + nav items */}
          <div className="grid h-full grid-cols-[min-content_min-content] items-center gap-0 px-[24px] md:gap-[32px] md:px-[32px] 2xl:gap-[48px] 2xl:px-[48px]">
            <a id="nav-brand" href="/" aria-label="Airtable homepage" className="my-[22px] flex h-[32px] items-center">
              <img src="/assets/inline-svg/brand-mark.svg" alt="" className="mr-[4px] h-[32px] w-[38px] max-w-none" />
              <span
                className={`flex overflow-hidden transition-all duration-[250ms] ease-out-sine ${
                  collapseWordmark ? 'w-0 opacity-0' : 'w-[98px] opacity-100'
                }`}
                style={{ transitionDelay: collapseWordmark ? '0ms' : `${wordmarkDelay}ms` }}
              >
                <img src="/assets/inline-svg/brand-wordmark.svg" alt="" className="ml-[4px] h-[20px] w-[94px] max-w-none" />
              </span>
            </a>

            {/* Desktop nav items (≥1024) */}
            <ul className="hidden h-full items-stretch self-stretch lg:flex">
              {DRAWER_KEYS.map((key, i) => {
                const isOpen = drawer === key
                return (
                  <li key={key} className={`flex ${i > 0 ? 'ml-[22px]' : ''}`}>
                    <button
                      ref={(el) => (toggleRefs.current[key] = el)}
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => toggleDrawer(key)}
                      className={`hdr-navfs relative flex h-full items-center whitespace-nowrap ${navTextBase} ${isOpen ? 'text-link' : 'text-ink'} ${
                        isOpen
                          ? "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-bar after:bg-chevron-open after:content-['']"
                          : ''
                      }`}
                    >
                      {DRAWERS[key].label}
                      <Chevron
                        className={`ml-[4px] transition-all duration-150 ease-in ${
                          isOpen ? 'rotate-0 text-chevron-open' : '-rotate-90 text-chevron'
                        }`}
                      />
                    </button>
                  </li>
                )
              })}
              <li className="ml-[22px] flex items-center">
                <a href={`${W}/solutions/enterprise`} className={`hdr-navfs hdr-navls ${navText} tracking-[0.16px]`}>
                  Enterprise
                </a>
              </li>
              <li className="ml-[22px] flex items-center">
                <a href="/pricing" className={`hdr-navfs hdr-navls ${navText} tracking-[0.16px]`}>
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* ActionGroup */}
          <div className="my-[9px] mr-[24px] flex items-center justify-end gap-[16px] lg:my-[12px] lg:mr-[32px]">
            <a
              href={`${W}/contact-sales`}
              className={`hdr-navfs hdr-navls ${navButton} hidden border-ink text-ink transition-colors duration-150 ease-in hover:border-weak hover:text-weak lg:inline-flex`}
            >
              Book Demo
            </a>
            <a
              href="/signup"
              className={`hdr-navfs hdr-navls ${navButton} border-ink bg-ink text-white transition-colors duration-200 ease-linear hover:border-weak hover:bg-weak`}
            >
              <span className="hidden lg:inline">Sign up for free</span>
              <span className="lg:hidden">Sign up</span>
            </a>
            <a href="/login" className={`hdr-navfs hdr-navls ${navText} hidden whitespace-nowrap tracking-[0.16px] lg:inline`}>
              Log in
            </a>

            {/* Hamburger (<1024) */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
              className="flex h-[32px] w-[32px] items-center justify-center rounded-bar lg:hidden"
            >
              <span
                className={`relative block transition-all duration-150 ease-in ${
                  mobileOpen ? 'h-[20px] w-[20px]' : 'h-[12px] w-[24px]'
                }`}
              >
                <span
                  className={`absolute left-1/2 h-[2px] w-[24px] -translate-x-1/2 rounded-bar bg-ink transition-all duration-150 ease-in ${
                    mobileOpen ? 'top-[9px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-1/2 h-[2px] w-[24px] -translate-x-1/2 rounded-bar bg-ink transition-all duration-150 ease-in ${
                    mobileOpen ? 'top-[9px] -rotate-45' : 'top-[10px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* 1c. Backdrop (desktop) */}
        <div
          aria-hidden="true"
          onClick={closeDrawer}
          className={`fixed inset-0 z-[-2] hidden bg-keyline-strong backdrop-blur-[8px] transition-all duration-150 ease-in lg:block ${
            drawer ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        />

        {/* 1d. Mobile menu (<1024) */}
        <div
          className={`fixed inset-0 z-[-1] lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}
          style={{ paddingTop: 'var(--mainNavHeight)' }}
        >
          <div className="flex h-full flex-col overflow-y-auto bg-white py-[8px]">
            {DRAWER_KEYS.map((key) => (
              <button
                key={key}
                ref={(el) => (mobileToggleRefs.current[key] = el)}
                type="button"
                onClick={() => openDrawer(key)}
                className={mobileRow}
              >
                {DRAWERS[key].label}
                <Chevron className="-rotate-90 text-chevron" />
              </button>
            ))}
            <a href={`${W}/solutions/enterprise`} className={`${mobileRow} tracking-[0.18px]`}>
              Enterprise
            </a>
            <a href="/pricing" className={`${mobileRow} tracking-[0.18px]`}>
              Pricing
            </a>
            <div className="mt-[32px] flex flex-col">
              <a href={`${W}/contact-sales`} className={`${mobileRow} tracking-[0.18px]`}>
                Book demo
              </a>
              <a href="/login" className={`${mobileRow} tracking-[0.18px]`}>
                Sign in
              </a>
            </div>
          </div>
        </div>

        {/* Drawers (desktop mega-menu ≥1024; full-screen category drawer <1024) */}
        {DRAWER_KEYS.map((key) => (
          <Drawer
            key={key}
            id={key}
            open={drawer === key}
            nested={drawer === key ? nested : null}
            setNested={setNested}
            toggleNested={toggleNested}
            nestedDelay={nestedDelay}
            onBack={closeDrawer}
          />
        ))}
      </header>
    </>
  )
}
