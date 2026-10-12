import ContactSalesSplit from '../ContactSalesSplit.jsx'

// /contact-sales — specs/pages_solutions.md §11. No breadcrumb. The form is visual only (no submission).
export default function ContactSales() {
  return (
    <ContactSalesSplit
      left={{
        title: 'Talk with our team',
        intro:
          'Share a little about your team and what you hope to achieve. A specialist will follow up to answer your questions, walk through the options that fit and help plan clear next steps together with you.',
        bullets: [
          'Teams launch new workflows in days, not months',
          'Leaders gain much clearer visibility into work across departments',
          'Admins keep data secure with flexible, granular controls',
        ],
        trustLine: 'Organizations of every size rely on us',
        logos: ['Northpeak', 'Lumora', 'Brightfold', 'Kestrel'],
        support: { before: 'Need help with your account? Visit our ', link: { label: 'support center', href: '#' }, after: '.' },
      }}
      form={{
        title: 'Contact our sales team',
        submitLabel: 'Submit',
        countries: ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'India', 'Japan', 'Australia', 'Brazil', 'Other'],
        helpOptions: ['Product demo', 'Pricing questions', 'Enterprise plans', 'Something else'],
        consent: {
          before:
            'By submitting this form, you agree that we may contact you about our products, services and events. You can unsubscribe from these messages at any time. See our ',
          link: { label: 'privacy policy', href: '#' },
          after: ' for details on how we collect, use and protect your data.',
        },
      }}
    />
  )
}
