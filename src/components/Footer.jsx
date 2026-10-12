import { useState } from 'react'
import './Footer.css'

const W = ''
const A = ''

// Labels + hrefs copied from the live airtable.com footer.
const PRIMARY = [
  ['Platform', `${W}/platform`],
  ['Solutions', `${W}/solutions`],
  ['Resources', `${W}/lp/resources`],
  ['Enterprise', `${W}/services`],
  ['Pricing', `${W}/pricing`],
  ['Book Demo', `${W}/contact-sales`],
]

const SOCIALS = [
  ['Facebook', '#', 'social-facebook.svg', 17, 17],
  ['Linkedin', '#', 'social-linkedin.svg', 16, 17],
  ['Twitter', '#', 'social-twitter.svg', 17, 17.4],
  ['Instagram', '#', 'social-instagram.svg', 17, 17],
  ['Youtube', '#', 'social-youtube.svg', 21, 15],
]

const COLUMNS = [
  {
    heading: 'Platform',
    links: [
      ['AI App Building', `${W}/platform/app-building`],
      ['AI Agents', `${W}/platform/ai-agents`],
      ['Airtable Platform', `${W}/platform`],
      ['Portals', `${A}/platform/portals`],
      ['Scale', `${W}/platform/hyperdb`],
      ['Automations', `${W}/platform/automations`],
    ],
    more: [
      ['Databases', `${W}/platform/connected-data`],
      ['Interfaces', `${W}/platform/interface-designer`],
      ['Reporting', `${W}/platform/reporting`],
      ['Governance & Security', `${W}/platform/governance`],
      ['Airtable AI', `${W}/platform/ai`],
      ["What's New", `${W}/whatsnew`],
    ],
  },
  {
    heading: 'Solutions',
    links: [
      ['Product', `${W}/solutions/product`],
      ['Marketing', `${W}/solutions/marketing`],
      ['Project Management', `${W}/solutions/project-management`],
      ['Operations', `${W}/solutions/operations`],
      ['Sales', `${W}/solutions/sales`],
      ['Design & Creative', `${W}/solutions/design-creative-project-management`],
    ],
    more: [
      ['Human Resources', `${W}/solutions/hr`],
      ['Finance', `${W}/solutions/finance`],
      ['Media & Entertainment', `${W}/solutions/media-entertainment`],
      ['Retail', `${W}/solutions/retail`],
      ['CPG Manufacturing', `${W}/solutions/manufacturing`],
      ['Education', `${W}/solutions/education`],
      ['Technology', `${W}/solutions/saas-project-management`],
      ['Agency & Professional Services', `${W}/solutions/agency`],
    ],
  },
  {
    heading: 'Resources',
    links: [
      ['Resources Hub', `${W}/lp/resources`],
      ['Templates', `${A}/templates`],
      ['AI Plays', `${W}/ai-plays`],
      ['Blog', `${W}/articles`],
      ['Customer Stories', `${W}/customer-stories`],
      ['Videos', `${W}/videos`],
    ],
    more: [
      ['Events', `${W}/events-webinars`],
      ['Marketplace', `${A}/marketplace`],
      ['Partners', `${W}/partners`],
      ['Services', `${W}/services`],
    ],
  },
  {
    heading: 'Learn',
    links: [
      ['How-to guides', `${W}/guides`],
      ['Developer docs', `${A}/developers`],
      ['Airtable Academy', '#'],
      ['Airtable Community', '#', true],
      ['Help center', '#', true],
    ],
    more: [],
  },
  {
    heading: 'Company',
    links: [
      ['Try Airtable for free', `${A}/signup`],
      ['Pricing', `${A}/pricing`],
      ['Contact sales', `${W}/contact-sales`],
      ['Contact support', '#', true],
      ['About', `${W}/about`],
      ['Careers', `${A}/careers`],
    ],
    more: [
      ['Status', '#'],
      ['Newsroom', `${W}/newsroom`],
    ],
  },
]

const UTILITY = [
  ['Security', `${W}/company/trust-and-security`],
  ['API', `${A}/developers/web/api/introduction`],
  ['Privacy', `${W}/company/privacy`],
  ['Terms', `${W}/company/terms-and-policies`],
  ['Do Not Sell/Share My Info', `${W}/company/privacy-choices`],
  ['Cookie Preferences', '#'],
  ['Accessibility', `${W}/company/accessibility`],
]

function FooterLink({ label, href, external }) {
  return (
    <li className="ft-item">
      <a className="ft-link" href={href} {...(external && href !== '#' ? { target: '_blank', rel: 'noreferrer' } : {})}>
        <span>{label}</span>
      </a>
    </li>
  )
}

function LinkColumn({ col }) {
  const [open, setOpen] = useState(false) // mobile accordion
  const [expanded, setExpanded] = useState(false) // desktop "See more"
  const hasMore = col.more.length > 0

  return (
    <li className="ft-col" data-expanded={expanded}>
      <p className="ft-col-heading">{col.heading}</p>
      <button
        type="button"
        className="ft-acc-btn"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{col.heading}</span>
        <img className="ft-acc-icon" src="/assets/inline-svg/footer-accordion-chevron.svg" alt="" width="8" height="13" />
      </button>
      <div className="ft-panel" data-open={open}>
        <ul className="ft-list" aria-label={col.heading.toLowerCase()}>
          {col.links.map(([label, href, ext]) => (
            <FooterLink key={label} label={label} href={href} external={ext} />
          ))}
          {hasMore && (
            <li className="ft-item ft-more-item ft-see-more">
              <button type="button" className="ft-more" aria-expanded={expanded} onClick={() => setExpanded(true)}>
                <span>See more</span>
              </button>
            </li>
          )}
          {col.more.map(([label, href, ext]) => (
            <li key={label} className="ft-item ft-extra">
              <a className="ft-link" href={href} {...(ext && href !== '#' ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <span>{label}</span>
              </a>
            </li>
          ))}
          {hasMore && (
            <li className="ft-item ft-more-item ft-show-less">
              <button type="button" className="ft-more" aria-expanded={expanded} onClick={() => setExpanded(false)}>
                <span>Show less</span>
              </button>
            </li>
          )}
        </ul>
      </div>
      <hr className="ft-col-hr" />
    </li>
  )
}

// variant="pricing": live /pricing is a separate app whose footer inherits that app's body type
// (12.8px/16px system font; Haas is never loaded there) and keeps the utility bar stacked at every width.
export default function Footer({ variant }) {
  return (
    <footer className={variant ? `ft ft--${variant}` : 'ft'}>
      <div className="ft-wrap">
        <nav className="ft-nav" aria-label="Footer navigation">
          <div className="ft-logo">
            <a className="ft-logo-link" href={`${W}/`}>
              <img src="/assets/inline-svg/footer-logo.svg" alt="" width="32" height="27" />
              <span className="ft-sr">Airtable home</span>
            </a>
          </div>
          <div className="ft-primary">
            <ul aria-label="Footer navigation locations">
              {PRIMARY.map(([label, href]) => (
                <li key={label}>
                  <a className="ft-plink" href={href}>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ft-social">
            <ul aria-label="Footer social media icons">
              {SOCIALS.map(([label, href, file, w, h]) => (
                <li key={label}>
                  <a className="ft-slink" href={href}>
                    <img src={`/assets/inline-svg/${file}`} alt="" width={w} height={h} />
                    <span className="ft-sr">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ft-sep" />
          <div className="ft-cols">
            <ul aria-label="Categories of links in the footer">
              {COLUMNS.map((col) => (
                <LinkColumn key={col.heading} col={col} />
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="ft-util">
        <div className="ft-wrap">
          <div className="ft-util-row">
            <ul className="ft-util-links" aria-label="utility links">
              {UTILITY.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="ft-badges">
              <a href="#">
                <img src="/assets/inline-svg/app-store-badge.svg" alt="" width="97" height="33" />
                <span className="ft-sr">Download on the App Store</span>
              </a>
              <a href="#">
                <img src="/assets/inline-svg/google-play-badge.svg" alt="" width="109" height="33" />
                <span className="ft-sr">Get it on Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
