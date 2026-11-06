import { certifications, skillCategories } from '../content'

export default function ProfileSections() {
  return <>
    <section id="about" className="about section" aria-labelledby="about-title">
      <div>
        <p className="eyebrow" data-scroll-reveal>03 / The person behind the code</p>
        <h2 id="about-title" data-scroll-reveal>Curious about code.<br/>Focused on<br/>the cloud.</h2>
        <figure className="about-portrait" data-scroll-reveal>
          <div className="portrait-window"><img src="/images/profile.webp" alt="Portrait of Paramjeet Kaur" width="850" height="990" loading="lazy" decoding="async" data-portrait-parallax/></div>
          <figcaption>Paramjeet Kaur / Punjab, India</figcaption>
        </figure>
      </div>
      <div className="about-body" data-scroll-reveal>
        <p className="about-lead">An application is only the beginning. I’m learning the systems that keep it running.</p>
        <p>Motivated MCA Cloud Computing &amp; DevOps student with practical experience in Python, Linux administration, SQL, Git, Flask, backend development, and web application deployment. Experienced in creating database-driven applications, Linux monitoring tools, algorithm visualizers, and interactive web applications. Currently developing knowledge of AWS, Docker, Kubernetes, CI/CD, and infrastructure automation.</p>
        <p className="objective">Seeking a Cloud Engineer / DevOps Engineer Internship</p>
        <dl className="about-facts"><div><dt>Studying</dt><dd>MCA Cloud Computing &amp; DevOps<br/>Chandigarh University · Expected 2028</dd></div><div><dt>Foundation</dt><dd>BCA · DAV College · 2026</dd></div></dl>
        <a className="text-link" href="#education">Follow my learning journey <span aria-hidden="true">↓</span></a>
      </div>
    </section>

    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="section-heading" data-scroll-reveal><div><p className="eyebrow">04 / My technical toolkit</p><h2 id="skills-title">Built on foundations.<br/>Always learning.</h2></div><p>Practical tools from my projects, alongside the cloud and DevOps skills I am developing.</p></div>
      <div className="skill-index">{skillCategories.map((category, index) => <details className="skill-row" key={category.title} open={index === 0}>
        <summary><span className="skill-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{category.title}</h3><span className="detail-symbol" aria-hidden="true">+</span></summary>
        <div className="skill-content"><p>{category.description}</p><ul>{category.tools.map(tool => <li key={tool}>{tool}</li>)}{category.learning?.map(tool => <li key={tool}>{tool}<span>Currently learning</span></li>)}</ul></div>
      </details>)}</div>
    </section>

    <section id="education" className="section learning" aria-labelledby="education-title">
      <div data-scroll-reveal><p className="eyebrow">05 / Education &amp; the journey</p><h2 id="education-title">A foundation.<br/>A direction.</h2><p className="timeline-year">2028<span>Expected MCA graduation</span></p></div>
      <ol className="education-timeline">
        <li data-scroll-reveal><p className="eyebrow">2026–2028 · Expected</p><h3>MCA — Cloud Computing &amp; DevOps</h3><p>Chandigarh University</p><span>Pursuing</span></li>
        <li data-scroll-reveal><p className="eyebrow">2026</p><h3>Bachelor of Computer Applications</h3><p>DAV College</p><span>BCA</span></li>
        <li data-scroll-reveal><p className="eyebrow">2023</p><h3>Class XII</h3><p>Government Model Senior Secondary School</p></li>
        <li data-scroll-reveal><p className="eyebrow">2021</p><h3>Class X</h3><p>Sir McAuliffe High School</p></li>
        <li data-scroll-reveal><p className="eyebrow">Learning by building</p><h3>From applications to systems</h3><p>Algorithm visualizers, database applications and Linux monitoring projects form the practical side of my learning.</p><a className="text-link" href="#projects">Explore the projects <span aria-hidden="true">↗</span></a></li>
      </ol>
    </section>

    <section id="certifications" className="section certifications" aria-labelledby="certifications-title">
      <div className="section-heading" data-scroll-reveal><div><p className="eyebrow">06 / Continuing to learn</p><h2 id="certifications-title">Learning beyond<br/>the classroom.</h2></div><p>Certifications across cloud computing, programming, data and emerging technologies.</p></div>
      <ol className="certificate-list">{certifications.map((name, index) => <li key={name}><span className="certificate-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{name}</h3>{name.startsWith('Microsoft Office') && <p>Word, Excel &amp; PowerPoint</p>}</div></li>)}</ol>
    </section>

    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <p className="eyebrow" data-scroll-reveal>07 / The next conversation</p>
      <h2 id="contact-title" data-scroll-reveal>LET'S BUILD<br/><span>SOMETHING GREAT.</span></h2>
      <div className="contact-grid" data-scroll-reveal>
        <div><p>Have an idea, an internship opportunity, or a systems problem to explore? I’d like to hear about it.</p><a className="email" href="mailto:param1539064@gmail.com">param1539064@gmail.com <span aria-hidden="true">↗</span></a></div>
        <dl><div><dt>Call</dt><dd><a href="tel:+917814433864">+91 7814433864</a></dd></div><div><dt>Find my code</dt><dd><a href="https://github.com/PARAMCLOUD1" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></dd></div><div><dt>Connect</dt><dd><a href="https://www.linkedin.com/in/paramjeet-kaur-cloud/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></dd></div><div><dt>Based in</dt><dd>Punjab, India</dd></div></dl>
      </div>
    </section>
  </>
}
