import { bkButton, bkPrimary } from '../components/buttonStyles.js'
import './ContactSalesSplit.css'

// BK-9 ContactSalesSplit — SECTION_TYPES_solutions §3 BK-9.
// NON-FUNCTIONAL form: submit only calls preventDefault; no network, no validation side effects.
//   left: { title, intro, bullets: [], trustLine, logos: [label], support: { before, link: {label, href}, after } }
//   form: { title, consent: { before, link: {label, href}, after }, submitLabel, countries: [], helpOptions: [] }

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="bkcs-label">
      <span className="bkcs-req" aria-hidden="true">
        *
      </span>
      {children}
    </label>
  )
}

function TextField({ id, label, type = 'text', h = 56, autoComplete }) {
  return (
    <div className="bkcs-field" style={{ height: h }}>
      <Label htmlFor={id}>{label}</Label>
      <input id={id} name={id} type={type} required autoComplete={autoComplete} className="bkcs-control" />
    </div>
  )
}

function SelectField({ id, label, options }) {
  return (
    <div className="bkcs-field" style={{ height: 56.6 }}>
      <Label htmlFor={id}>{label}</Label>
      <select id={id} name={id} required defaultValue="" className="bkcs-control bkcs-select">
        <option value="" disabled>
          Select...
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <svg className="bkcs-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="#333840" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function ContactSalesSplit({ left, form }) {
  return (
    <section className="bkcs font-haas">
      <div className="bkcs-grid">
        <div className="bkcs-left">
          <h1 className="bkcs-h1">{left.title}</h1>
          <div className="bkcs-rich">
            <p>{left.intro}</p>
            <ul>
              {left.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="bkcs-trust">
            <p>{left.trustLine}</p>
            <div className="bkcs-logos">
              {left.logos.map((l) => (
                <span key={l} role="img" aria-label={l} className="bkcs-logo">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <p className="bkcs-support">
            {left.support.before}
            <a href={left.support.link.href}>{left.support.link.label}</a>
            {left.support.after}
          </p>
        </div>

        <div className="bkcs-right">
          <div className="bkcs-card">
            <h2 className="bkcs-h2">{form.title}</h2>
            <form className="bkcs-form" noValidate onSubmit={(e) => e.preventDefault()}>
              <div className="bkcs-row bkcs-row--2">
                <TextField id="FirstName" label="First Name" autoComplete="given-name" />
                <TextField id="LastName" label="Last Name" autoComplete="family-name" />
              </div>
              <TextField id="Email" label="Work Email" type="email" h={53.6} autoComplete="email" />
              <div className="bkcs-field bkcs-phone" style={{ height: 64.9 }}>
                <Label htmlFor="Phone">Phone Number</Label>
                <div className="bkcs-phone-row">
                  <button type="button" className="bkcs-flag" aria-label="Country code">
                    <span className="bkcs-flag-box" aria-hidden="true" />
                    <svg width="6" height="4" viewBox="0 0 6 4" aria-hidden="true">
                      <path d="M0 0h6L3 4z" fill="#333840" />
                    </svg>
                  </button>
                  <input id="Phone" name="Phone" type="tel" required defaultValue="+1" autoComplete="tel" className="bkcs-phone-input" />
                </div>
              </div>
              <div className="bkcs-row bkcs-row--2">
                <TextField id="Company" label="Company Name" autoComplete="organization" />
                <TextField id="Title" label="Job Title" autoComplete="organization-title" />
              </div>
              <SelectField id="Country" label="Country" options={form.countries} />
              <SelectField id="Help" label="How can our team help?" options={form.helpOptions} />
              <div className="bkcs-field bkcs-field--area" style={{ height: 96 }}>
                <Label htmlFor="UseCase">How are you looking to use Airtable?</Label>
                <textarea id="UseCase" name="UseCase" required className="bkcs-control bkcs-textarea" />
              </div>
              <p className="bkcs-consent">
                {form.consent.before}
                <a href={form.consent.link.href}>{form.consent.link.label}</a>
                {form.consent.after}
              </p>
              <button type="submit" className={`${bkButton} ${bkPrimary} bkcs-submit`}>
                {form.submitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
