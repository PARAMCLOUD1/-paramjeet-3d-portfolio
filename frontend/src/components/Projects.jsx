import { useState } from 'react'
import { projects } from '../content'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const visible = projects.filter(project => filter === 'All' || project.category === filter)
  return <section id="projects" className="section projects">
    <div className="section-heading" data-scroll-reveal><div><p className="eyebrow">02 / Project areas</p><h2>From application logic<br/>to the systems beneath.</h2></div><p>Areas of practical work from my biography. Explore my GitHub for available repositories.</p></div>
    <div className="project-filters" role="group" aria-label="Filter project areas">
      {['All', 'Web applications', 'Systems'].map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
    </div>
    <p className="result-count" role="status">{visible.length} project {visible.length === 1 ? 'area' : 'areas'}</p>
    <div className="project-list">{visible.map(project => <article key={project.id} className="project-row"><p className="eyebrow">{project.category}</p><div><h3>{project.title}</h3><p>{project.description}</p><ul className="tool-list" aria-label={`${project.title} tools`}>{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div></article>)}</div>
    <a className="text-link" href="https://github.com/PARAMCLOUD1?tab=repositories" target="_blank" rel="noreferrer">Browse GitHub repositories ↗</a>
  </section>
}
