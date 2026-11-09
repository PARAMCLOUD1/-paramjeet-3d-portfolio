import { useState } from 'react'
import { projects } from '../content'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [featured, ...collection] = projects
  const visible = collection.filter(project => filter === 'All' || project.category === filter)
  return <section id="projects" className="section projects">
    <div className="section-heading" data-scroll-reveal><div><p className="eyebrow">02 / Projects</p><h2>Projects</h2></div><p>Projects I built to practise algorithms, backend development, databases, and Linux administration.</p></div>
    <article className="featured-project" aria-labelledby="featured-title">
      <a className="project-preview" href={featured.demo} target="_blank" rel="noreferrer" aria-label="Open the electricity dashboard live demo" data-scroll-reveal>
        <img src={featured.image} alt="Electricity dashboard showing allocation controls and a city view" width="1280" height="720" loading="lazy" decoding="async"/>
        <span className="preview-link">Live Demo <span aria-hidden="true">↗</span></span>
      </a>
      <div className="featured-copy" data-scroll-reveal>
        <div><p className="eyebrow">01 / Featured project</p><h3 id="featured-title">{featured.title}</h3></div>
        <div><p>{featured.description}</p><ul className="tool-list" aria-label={`${featured.title} tools`}>{featured.tools.map(tool => <li key={tool}>{tool}</li>)}</ul><div className="project-links"><a className="text-link" href={featured.repository} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><a className="text-link" href={featured.demo} target="_blank" rel="noreferrer">Live demo <span aria-hidden="true">↗</span></a></div><details className="project-details"><summary>Implementation details <span aria-hidden="true">+</span></summary><p>{featured.notes}</p></details></div>
      </div>
    </article>
    <div className="project-index-heading"><h3>More Projects</h3><p>Applications, systems &amp; algorithms</p></div>
    <div className="project-filters" role="group" aria-label="Filter projects">
      {['All', ...new Set(collection.map(project => project.category))].map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
    </div>
    <p className="result-count" role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'} shown</p>
    <div className="project-list" role="region" aria-label="Project collection">{visible.map(project => <article key={project.id} className="project-row"><div><span className="project-number">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span><p className="eyebrow">{project.category}</p></div><div><h3>{project.title}</h3><p>{project.description}</p>{project.tools.length > 0 && <ul className="tool-list" aria-label={`${project.title} tools`}>{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>}<div className="project-links">{project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source on GitHub`}>GitHub <span aria-hidden="true">↗</span></a>}</div><details className="project-details"><summary>Implementation details <span aria-hidden="true">+</span></summary><p>{project.notes}</p></details></div></article>)}</div>
    <a className="text-link" href="https://github.com/PARAMCLOUD1?tab=repositories" target="_blank" rel="noreferrer">Browse GitHub repositories ↗</a>
  </section>
}
