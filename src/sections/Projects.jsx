import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectModal from '../components/ProjectModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef(null);

  const categories = [
    'All',
    'Nonprofit / NGO Website',
    'Corporate / Laboratory Testing',
    'Education / E-learning / E-commerce',
    'Website Engineering / CMS Migration / Performance'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const openProjectModal = (project) => {
    setActiveProject(project);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 45,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section id="projects" ref={sectionRef} className="site-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span>Real Client Projects &amp; Case Studies</span>
        </div>

        <h2 className="section-title">
          Selected <span className="text-accent">Work &amp; Architecture</span>
        </h2>

        <p className="section-subtitle">
          Verified production platforms, corporate websites, and enterprise CMS migrations engineered with modern WordPress, performance optimization, and accessible UI.
        </p>

        {/* Category Filters */}
        <div className="projects-filter-bar">
          {categories.map((cat) => {
            const label = cat === 'All' ? 'All (4 Projects)'
              : cat.includes('Nonprofit') ? 'Nonprofit / NGO'
              : cat.includes('Corporate') ? 'Corporate & Lab Testing'
              : cat.includes('Education') ? 'Education & E-Commerce'
              : '50+ Migrations';

            return (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card project-card-anim"
              onClick={() => openProjectModal(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProjectModal(project);
                }
              }}
              aria-label={`View case study for ${project.title}`}
            >
              {/* Card Banner */}
              <div className="project-card-header">
                <div
                  className="project-card-header-bg"
                  style={{ background: project.coverGradient }}
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} live preview`}
                      className="project-card-preview-img"
                      loading="lazy"
                    />
                  )}
                  <div className="project-card-header-overlay" />
                </div>

                <div className="project-header-top">
                  <span
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: project.accentColor || 'var(--accent-primary)',
                      letterSpacing: '0.05em',
                      flexShrink: 0
                    }}
                  >
                    {project.number}
                  </span>

                  <span className="project-category-badge" title={project.category}>
                    {project.category}
                  </span>
                </div>

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div className="project-stat-pill">
                    {project.impactMetric}
                  </div>
                  {project.secondaryMetric && (
                    <div
                      className="project-stat-pill"
                      style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}
                    >
                      {project.secondaryMetric}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-description">{project.tagline}</p>

                {/* Key Contributions Teaser */}
                {project.keyContributions && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontFamily: 'var(--font-headline)', marginBottom: '0.4rem', fontWeight: 600 }}>
                      Highlights:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {project.keyContributions.slice(0, 2).map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: project.accentColor || 'var(--accent-primary)', fontSize: '0.75rem', marginTop: '0.15rem' }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="project-tech-tags">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="project-tech-tag" style={{ color: 'var(--accent-primary)' }}>
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Card Footer */}
                <div className="project-card-footer">
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {project.client.split('(')[0]}
                  </span>
                  <span className="project-view-cta">
                    <span>View Case Study</span>
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal with next/prev navigation */}
      <ProjectModal
        project={activeProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectProject={(p) => setActiveProject(p)}
      />
    </section>
  );
}
