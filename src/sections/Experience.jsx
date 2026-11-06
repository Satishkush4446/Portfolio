import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, CheckCircle, Award } from 'lucide-react';
import { profileData } from '../data/profile';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.timeline-entry-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="site-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span>Professional Trajectory</span>
        </div>

        <h2 className="section-title">
          Engineering &amp; <span className="text-accent">Industry Experience</span>
        </h2>

        <p className="section-subtitle">
          Proven track record of taking complex legacy infrastructures, multi-site deployments, and enterprise client requirements to production on schedule.
        </p>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-line" aria-hidden="true" />

          {profileData.experience.map((exp, index) => (
            <div key={index} className="timeline-entry timeline-entry-anim">
              {/* Timeline Node Icon */}
              <div className="timeline-node">
                <div className="timeline-node-inner" />
              </div>

              {/* Timeline Card */}
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role-title">{exp.role}</h3>
                    <div className="timeline-company-name">{exp.company}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <span className="timeline-duration-badge">
                      <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      {exp.period} ({exp.duration})
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {exp.description}
                </p>

                {/* Subtle Recognition Indicator linked to Awards Section */}
                <a
                  href="#awards"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(199, 255, 77, 0.08)',
                    border: '1px solid var(--accent-border)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                  className="experience-awards-link"
                  title="View full honors exhibition"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Award size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      2× Star of the Month — April &amp; June 2023
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-headline)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>View Honors</span>
                    <span>→</span>
                  </span>
                </a>

                {/* Key Verified Responsibilities & Achievements */}
                <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Key Responsibilities &amp; Measured Achievements:
                </h4>

                <ul className="timeline-achievements-list">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="timeline-achievement-bullet">
                      <CheckCircle size={17} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-headline)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
