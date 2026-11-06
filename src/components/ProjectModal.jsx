import { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projectsData } from '../data/projects';

export default function ProjectModal({ project, isOpen, onClose, onSelectProject }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  // Next & previous project navigation
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="modal-dialog">
        {/* Modal Header Banner */}
        <div
          className="modal-header-banner"
          style={{ background: project.coverGradient }}
        >
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close case study modal"
          >
            <X size={20} />
          </button>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(8px)',
                  color: project.accentColor || '#C7FF4D',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {project.number || '01'} • {project.category}
              </span>

              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--font-headline)'
                }}
              >
                {project.year}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(1.5rem, 3.2vw, 2.35rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em'
              }}
            >
              {project.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', maxWidth: '640px', lineHeight: 1.5 }}>
              {project.subtitle}
            </p>

            {/* Direct Project Action Links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn magnetic-btn-primary"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.84rem' }}
                >
                  <span>{project.liveDemoLabel || 'Visit Live Website'}</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {project.secondaryLiveDemo && (
                <a
                  href={project.secondaryLiveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn magnetic-btn-primary"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.84rem' }}
                >
                  <span>{project.secondaryLiveDemoLabel || 'Visit Live Website'}</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {project.githubRepo && (
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn magnetic-btn-secondary"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.84rem' }}
                >
                  <GithubIcon size={15} />
                  <span>View Repository</span>
                </a>
              )}

              {project.isAggregateCaseStudy && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '9999px',
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid var(--accent-border)',
                    color: 'var(--accent-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  <ShieldCheck size={14} />
                  <span>Multi-Site Enterprise Study (7 Live Client Sites Detailed Below)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-content-body">
          {/* Key Metrics Ribbon */}
          <div className="modal-metric-ribbon">
            <div className="modal-metric-item">
              <div className="val">{project.impactMetric}</div>
              <div className="lbl">Core Focus / Standard</div>
            </div>
            {project.secondaryMetric && (
              <div className="modal-metric-item">
                <div className="val">{project.secondaryMetric}</div>
                <div className="lbl">Speed / Architecture</div>
              </div>
            )}
            <div className="modal-metric-item">
              <div className="val" style={{ fontSize: '1.15rem', marginTop: '0.4rem', color: '#FFFFFF' }}>
                {project.role}
              </div>
              <div className="lbl">My Role</div>
            </div>
            <div className="modal-metric-item">
              <div className="val" style={{ fontSize: '1.15rem', marginTop: '0.4rem', color: '#FFFFFF' }}>
                {project.client}
              </div>
              <div className="lbl">Organization / Client</div>
            </div>
          </div>

          {/* Project Overview */}
          <h3 className="modal-section-title">Project Overview</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.75rem', fontSize: '0.96rem' }}>
            {project.description}
          </p>

          {/* Challenges & Solutions */}
          {project.challenges && project.solutions && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontFamily: 'var(--font-headline)', color: '#f87171', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                  The Challenge
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {project.challenges}
                </p>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontFamily: 'var(--font-headline)', color: '#34d399', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                  The Engineering Solution
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {project.solutions}
                </p>
              </div>
            </div>
          )}

          {/* Key Contributions */}
          {project.keyContributions && (
            <>
              <h3 className="modal-section-title">Key Technical Contributions</h3>
              <ul className="modal-outcomes-list">
                {project.keyContributions.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={18} style={{ color: project.accentColor || 'var(--accent-primary)' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Verified Aggregate Results (Project 04) */}
          {project.verifiedResults && (
            <>
              <h3 className="modal-section-title">Verified Aggregate Results (50+ Sites)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {Object.entries(project.verifiedResults).map(([key, val]) => (
                  <div key={key} style={{ background: 'rgba(199,255,77,0.06)', border: '1px solid var(--accent-border)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1rem' }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Representative Client Websites (Project 04) */}
          {project.representativeWebsites && (
            <>
              <h3 className="modal-section-title">
                Representative Migrated Websites
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Extracted from verified professional portfolio records across international markets:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' }}>
                {project.representativeWebsites.map((site) => (
                  <div
                    key={site.domain}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        {site.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', background: 'var(--accent-dim)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {site.region}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {site.type}
                    </span>
                    <a
                      href={site.url || `https://${site.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.75rem', color: '#60A5FA', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}
                    >
                      <span>{site.domain}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Measured Outcomes */}
          {project.outcomes && (
            <>
              <h3 className="modal-section-title">Deliverables &amp; Outcomes</h3>
              <ul className="modal-outcomes-list">
                {project.outcomes.map((item, idx) => (
                  <li key={idx}>
                    <ShieldCheck size={18} style={{ color: '#38bdf8' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Technologies Used */}
          <h3 className="modal-section-title">Technology &amp; Tools Stack</h3>
          <div className="project-tech-tags" style={{ marginBottom: '2.5rem' }}>
            {project.techStack.map((tech) => (
              <span key={tech} className="project-tech-tag" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Navigation Between Projects */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.75rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={() => onSelectProject && onSelectProject(prevProject)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-headline)', cursor: 'pointer' }}
            >
              <ArrowLeft size={16} />
              <span>Previous: {prevProject.number}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject && onSelectProject(nextProject)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.85rem', fontFamily: 'var(--font-headline)', fontWeight: 600, cursor: 'pointer' }}
            >
              <span>Next: {nextProject.number}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
