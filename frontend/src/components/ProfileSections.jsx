import { certifications, education, profile, skillCategories } from '../content'
import ContactDescription from './ContactDescription'
import ContactDetails from './ContactDetails'

export default function ProfileSections() {
  return <>
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="about-heading">
        <p className="eyebrow" data-scroll-reveal>03 / About</p>
        <h2 id="about-title" data-scroll-reveal>About Me</h2>
      </div>
      <figure className="about-portrait" data-scroll-reveal>
        <div className="portrait-window"><img src="/images/profile.webp" alt="Portrait of Paramjeet Kaur" width="850" height="990" loading="lazy" decoding="async"/></div>
        <figcaption>Paramjeet Kaur</figcaption>
      </figure>
      <div className="about-body" data-scroll-reveal>
        {profile.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <p className="objective">Seeking internships in Cloud and DevOps</p>
        <dl className="about-facts"><div><dt>Studying</dt><dd>MCA Cloud Computing &amp; DevOps<br/>Chandigarh University · Expected 2028</dd></div><div><dt>Foundation</dt><dd>BCA · DAV College · 2026</dd></div></dl>
        <a className="text-link" href="#education">View Education <span aria-hidden="true">↓</span></a>
      </div>
    </section>

    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="section-heading" data-scroll-reveal><div><p className="eyebrow">04 / Skills</p><h2 id="skills-title">Technical Skills</h2></div><p>Languages and tools I use, alongside technologies I am currently learning.</p></div>
      <div className="skill-index">{skillCategories.map((category, index) => <details className="skill-row" key={category.title} open={index === 0}>
        <summary><span className="skill-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{category.title}</h3><span className="detail-symbol" aria-hidden="true">+</span></summary>
        <div className="skill-content"><p>{category.description}</p><ul>{category.tools.map(tool => <li key={tool}>{tool}</li>)}{category.learning?.map(tool => <li key={tool}>{tool}<span>Currently learning</span></li>)}</ul></div>
      </details>)}</div>
    </section>

    <section id="education" className="section learning" aria-labelledby="education-title">
      <div data-scroll-reveal><p className="eyebrow">05 / Academic Qualifications</p><h2 id="education-title">Education</h2><p className="timeline-year">2028<span>Expected MCA graduation</span></p></div>
      <ol className="education-timeline">{education.map(item => <li key={item.date} data-scroll-reveal><p className="eyebrow">{item.date}</p><h3>{item.title}</h3><p>{item.school}</p><span>{item.result}</span></li>)}</ol>
    </section>

    <section id="certifications" className="section certifications" aria-labelledby="certifications-title">
      <div className="section-heading" data-scroll-reveal><div><p className="eyebrow">06 / Certifications</p><h2 id="certifications-title">Certifications</h2></div></div>
      <ol className="certificate-list">{certifications.map((name, index) => <li key={name}><span className="certificate-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{name}</h3></div></li>)}</ol>
    </section>

    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <p className="eyebrow" data-scroll-reveal>07 / Contact</p>
      <h2 id="contact-title" data-scroll-reveal>Get in Touch</h2>
      <div className="contact-grid" data-scroll-reveal>
        <div><ContactDescription/></div>
        <ContactDetails/>
      </div>
    </section>
  </>
}
