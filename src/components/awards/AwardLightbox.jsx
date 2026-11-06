import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { LinkedinIcon } from '../BrandIcons';
import MagneticButton from '../MagneticButton';
import { awardsData } from '../../data/awards';

export default function AwardLightbox({ award, isOpen, onClose, onSelectAward }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!award) return null;

  const currentIndex = awardsData.findIndex((a) => a.id === award.id);
  const nextAward = awardsData[(currentIndex + 1) % awardsData.length];
  const prevAward = awardsData[(currentIndex - 1 + awardsData.length) % awardsData.length];

  const lightboxNode = (
    <div
      className={`award-lightbox-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${award.title} - ${award.date}`}
    >
      <div className="award-lightbox-dialog">
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close award certificate preview"
        >
          <X size={20} />
        </button>

        {/* Certificate Display Area */}
        <div className="award-lightbox-image-wrap">
          <img
            src={award.image}
            alt={`${award.title} Certificate - ${award.date} awarded to Satish Kushwaha`}
            className="award-lightbox-img"
          />
        </div>

        {/* Award Details Body */}
        <div className="award-lightbox-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                background: 'var(--accent-dim)',
                border: '1px solid var(--accent-border)',
                color: award.accentColor || 'var(--accent-primary)',
                letterSpacing: '0.05em'
              }}
            >
              {award.number} • {award.badgeLabel}
            </span>

            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-headline)' }}>
              {award.category}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '0.5rem'
            }}
          >
            {award.title}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem' }}>
            {award.subtitle}
          </p>

          {/* Issuer Ribbon */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.75rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-headline)' }}>
                Issued By
              </div>
              <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {award.issuer}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-headline)' }}>
                Organization
              </div>
              <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {award.organization}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-headline)' }}>
                Conferred Date
              </div>
              <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, color: award.accentColor || 'var(--accent-primary)', marginTop: '0.2rem' }}>
                {award.date}
              </div>
            </div>
          </div>

          {/* Description */}
          <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
            Official Citation &amp; Impact
          </h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.94rem', marginBottom: '1.75rem' }}>
            {award.description}
          </p>

          {/* Key Highlights */}
          {award.keyHighlights && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Performance Contributions
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {award.keyHighlights.map((highlight, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: award.accentColor || 'var(--accent-primary)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action CTAs & Verification Link */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
            <MagneticButton
              href={award.verificationUrl}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={16} />
              <span>Verify on LinkedIn Treasury</span>
              <ExternalLink size={15} />
            </MagneticButton>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} style={{ color: '#34D399' }} />
              <span>Verified Company Honor</span>
            </span>
          </div>

          {/* Navigation Between The 2 Awards */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={() => onSelectAward && onSelectAward(prevAward)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-headline)', cursor: 'pointer' }}
            >
              <ArrowLeft size={16} />
              <span>{prevAward.date}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectAward && onSelectAward(nextAward)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.85rem', fontFamily: 'var(--font-headline)', fontWeight: 600, cursor: 'pointer' }}
            >
              <span>{nextAward.date}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(lightboxNode, document.body) : lightboxNode;
}
