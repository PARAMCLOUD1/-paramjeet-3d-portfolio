import { certifications } from '../content'

const completionDate = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
})

export default function CertificateList({ panel = false }) {
  return <ol className={`certificate-list${panel ? ' certificate-list--panel' : ''}`}>
    {certifications.map((certificate, index) => <li key={certificate.id}>
      <span className="certificate-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3>{certificate.title}</h3>
        {certificate.issuer && <p>{certificate.issuer}</p>}
        {certificate.completedAt && <p>Completed <time dateTime={certificate.completedAt}>{completionDate.format(new Date(`${certificate.completedAt}T00:00:00Z`))}</time></p>}
        {certificate.pdf && <div className="certificate-links">
          <a href={certificate.pdf} target="_blank" rel="noopener noreferrer" aria-label={`View Certificate: ${certificate.title} (opens in a new tab)`}>View Certificate</a>
          {certificate.verificationUrl && <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify Credential: ${certificate.title} (opens in a new tab)`}>Verify Credential</a>}
        </div>}
      </div>
    </li>)}
  </ol>
}
