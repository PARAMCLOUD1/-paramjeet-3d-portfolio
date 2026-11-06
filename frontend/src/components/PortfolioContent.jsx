import { certifications, education, profile, projects, skillCategories } from '../content'

function SocialLinks() {
  return <div className="panel-links"><a href="https://github.com/PARAMCLOUD1" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/paramjeet-kaur-cloud/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
}

export default function PortfolioContent({ id }) {
  if (id === 'about') return <>
    <div className="panel-profile"><img src="/images/profile.webp" alt="Paramjeet Kaur" width="850" height="990"/><div><h3>Paramjeet Kaur</h3><p>MCA Cloud Computing &amp; DevOps Student</p><p>Aspiring Cloud &amp; DevOps Engineer</p></div></div>
    {profile.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <h3>Technical interests</h3><Tags items={['Backend development', 'Linux', 'Databases', 'Cloud infrastructure', 'Automation']}/>
    <p>Chandigarh University · MCA, expected 2028</p><SocialLinks/>
  </>
  if (id === 'projects') return <div className="panel-projects">{projects.map(project => <article key={project.id}>
    {project.image && <img className="panel-preview" src={project.image} alt="Electricity dashboard project preview" width="1280" height="720" loading="lazy"/>}
    <h3>{project.title}</h3><p>{project.description}</p><Tags items={project.tools}/>
    <details><summary>Project details</summary><p>{project.notes}</p></details>
    <div className="panel-links">{project.repository && <a href={project.repository} target="_blank" rel="noreferrer">Source on GitHub ↗</a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo ↗</a>}{project.suppliedDemo && <a href={project.suppliedDemo} target="_blank" rel="noreferrer">Additional demo (user supplied) ↗</a>}</div>
  </article>)}</div>
  if (id === 'skills') return <div className="panel-skills">{skillCategories.map(category => <section key={category.title}><h3>{category.title}</h3><p>{category.description}</p><Tags items={category.tools}/>{category.learning && <><p className="panel-meta">Currently learning</p><Tags items={category.learning}/></>}</section>)}</div>
  if (id === 'education') return <ol className="panel-timeline">{education.map(item => <li key={item.date}><p className="panel-meta">{item.date}</p><h3>{item.title}</h3><p>{item.school}</p><p>{item.result}</p></li>)}</ol>
  if (id === 'certifications') return <><p>Coursework across cloud, programming, data and emerging technologies.</p><ul className="panel-certificates">{certifications.map(name => <li key={name}>{name}{name.startsWith('Microsoft Office') && <p>Word, Excel and PowerPoint</p>}</li>)}</ul></>
  if (id === 'contact') return <><h3>LET&apos;S BUILD SOMETHING GREAT.</h3><p>For internship opportunities, project conversations and technical collaboration.</p><div className="panel-contact"><a className="button primary" href="mailto:param1539064@gmail.com">param1539064@gmail.com</a><a className="button secondary" href="tel:+917814433864">+91 7814433864</a></div><SocialLinks/></>
  return null
}

export function Tags({ items }) {
  return items.length ? <ul className="technology-tags">{items.map(item => <li key={item}>{item}</li>)}</ul> : null
}
