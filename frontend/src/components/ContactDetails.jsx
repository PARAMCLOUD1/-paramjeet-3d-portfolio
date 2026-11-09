const details = [
  { label: 'Email', value: 'param1539064@gmail.com', href: 'mailto:param1539064@gmail.com' },
  { label: 'Phone', value: '+91 7814433864', href: 'tel:+917814433864' },
  { label: 'GitHub', value: 'github.com/PARAMCLOUD1', href: 'https://github.com/PARAMCLOUD1', external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/paramjeet-kaur-cloud/', href: 'https://www.linkedin.com/in/paramjeet-kaur-cloud/', external: true },
]

function ContactIcon({ label }) {
  const shapes = {
    Email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
    Phone: <path d="m8 3 3 5-3 3a15 15 0 0 0 5 5l3-3 5 3v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z"/>,
    GitHub: <><circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M6 7v10m12-10v2a4 4 0 0 1-4 4h-4a4 4 0 0 0-4 4"/></>,
    LinkedIn: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10h.01M11 17v-7m0 3a3 3 0 0 1 6 0v4"/></>,
  }
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[label]}</svg>
}

export default function ContactDetails() {
  return <dl className="contact-details">{details.map(item => <div key={item.label}>
    <dt><ContactIcon label={item.label}/><span>{item.label}</span></dt>
    <dd><a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>{item.value}</a></dd>
  </div>)}</dl>
}
