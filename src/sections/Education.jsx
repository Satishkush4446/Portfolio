import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, CheckCircle, Code2, Cpu } from 'lucide-react';
import { profileData } from '../data/profile';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.edu-anim-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="site-section">
      <div className="container">
        {/* Header */}
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span>Academic Foundation &amp; Computer Science</span>
        </div>

        <h2 className="section-title">
          Education &amp; <span className="text-accent">Academic Roots</span>
        </h2>

        <p className="section-subtitle">
          Formal Computer Applications degree grounding computer science principles, database architectures, and software engineering.
        </p>

        {/* 2-Column Grid */}
        <div className="edu-recognition-grid">
          {/* Degree & Higher Education */}
          <div>
            <h3 className="edu-column-title">
              <GraduationCap size={24} style={{ color: 'var(--accent-primary)' }} />
              <span>Degree &amp; Higher Education</span>
            </h3>

            <div className="edu-cards-stack">
              <div className="edu-item-card honored edu-anim-card">
                <div className="edu-card-title">{profileData.education[0].degree}</div>
                <div className="edu-card-institution">
                  {profileData.education[0].institution} • {profileData.education[0].field}
                </div>
                <div className="edu-card-period">{profileData.education[0].period}</div>

                <div className="edu-highlights-pills">
                  {profileData.education[0].highlights.map((h, i) => (
                    <span key={i} className="edu-pill">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Science & Secondary Education */}
              {profileData.education.slice(1).map((item, idx) => (
                <div key={idx} className="edu-item-card edu-anim-card">
                  <div className="edu-card-title">{item.degree}</div>
                  <div className="edu-card-institution">
                    {item.institution} {item.field && `• ${item.field}`}
                  </div>
                  <div className="edu-card-period">{item.period}</div>

                  {item.highlights && (
                    <div className="edu-highlights-pills">
                      {item.highlights.map((h, i) => (
                        <span key={i} className="edu-pill">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Academic Core Pillars */}
          <div>
            <h3 className="edu-column-title">
              <BookOpen size={24} style={{ color: '#38BDF8' }} />
              <span>Core Academic Pillars</span>
            </h3>

            <div className="edu-cards-stack">
              <div className="edu-item-card edu-anim-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Code2 size={18} style={{ color: 'var(--accent-primary)' }} />
                  <h4 className="edu-card-title" style={{ margin: 0 }}>Data Structures &amp; Algorithms</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Applied algorithms, time complexity optimization, modular programming, and procedural logic in computer science applications.
                </p>
              </div>

              <div className="edu-item-card edu-anim-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Cpu size={18} style={{ color: '#FBBF24' }} />
                  <h4 className="edu-card-title" style={{ margin: 0 }}>Web Technologies &amp; Software Systems</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Internet protocols, client-server models, relational databases, schema architectures, and software engineering methodologies.
                </p>
              </div>

              <div className="edu-item-card edu-anim-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <CheckCircle size={18} style={{ color: '#34D399' }} />
                  <h4 className="edu-card-title" style={{ margin: 0 }}>Analytical Mathematics &amp; Science</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Higher secondary physics, chemistry, and mathematics foundation instilling analytical reasoning and structured problem solving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
