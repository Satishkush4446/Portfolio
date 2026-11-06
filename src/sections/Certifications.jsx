import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, History, Calendar } from 'lucide-react';
import { certificationsData } from '../data/certifications';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Certifications() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.cert-card-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D card tilt effect on mouse move
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="certifications" ref={sectionRef} className="site-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span>Professional Credentials</span>
        </div>

        <h2 className="section-title">
          Verified <span className="text-accent">Certifications &amp; Accreditations</span>
        </h2>

        <p className="section-subtitle">
          Specialized industry credentials spanning advanced Git workflows, technical SEO architecture, responsive web design, and enterprise CMS development.
        </p>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="cert-card-anim"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                background: 'var(--bg-surface)',
                border: cert.isExpired ? '1px solid var(--border-subtle)' : '1px solid var(--accent-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: cert.isExpired ? 'none' : 'var(--shadow-md), var(--shadow-glow)'
              }}
            >
              {/* Glow Accent */}
              {!cert.isExpired && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '140px',
                    height: '140px',
                    background: 'radial-gradient(circle, var(--accent-dim), transparent 70%)',
                    pointerEvents: 'none'
                  }}
                />
              )}

              <div>
                {/* Top Row: Issuer & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: cert.badgeColor || 'var(--accent-primary)',
                        fontFamily: 'var(--font-headline)',
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}
                    >
                      {cert.issuer.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {cert.issuer}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Cert #{cert.number}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      background: cert.isExpired ? 'var(--bg-surface-elevated)' : 'var(--accent-dim)',
                      border: cert.isExpired ? '1px solid var(--border-subtle)' : '1px solid var(--accent-border)',
                      color: cert.isExpired ? 'var(--text-muted)' : 'var(--accent-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    {cert.isExpired ? <History size={12} /> : <CheckCircle2 size={12} />}
                    <span>{cert.statusText}</span>
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem'
                  }}
                >
                  {cert.title}
                </h3>

                {/* Focus / Description */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {cert.focus}
                </p>

                {/* Skills Covered */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontSize: '0.73rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Dates */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-headline)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                  <Calendar size={13} />
                  <span>Issued: {cert.issueDate}</span>
                </div>

                {cert.expiryDate && (
                  <span style={{ color: 'var(--text-muted)' }}>
                    Expired: {cert.expiryDate}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
