import { ArrowUpRight, ExternalLink, Eye } from 'lucide-react';
import { LinkedinIcon } from '../BrandIcons';

export default function AwardCard({ award, onOpenPreview }) {
  return (
    <article className="award-exhibit-card award-anim-card" aria-label={`${award.title} ${award.date}`}>
      {/* Certificate Preview Frame with Hover Zoom & Inspect Trigger */}
      <div
        className="award-visual-frame"
        onClick={() => onOpenPreview(award)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenPreview(award);
          }
        }}
        aria-label={`Preview full ${award.title} certificate for ${award.date}`}
      >
        <img
          src={award.image}
          alt={`Official ${award.title} certificate conferred to Satish Kushwaha on ${award.date}`}
          className="award-visual-image"
          loading="lazy"
        />

        <div className="award-visual-overlay">
          <Eye size={18} />
          <span>Click to Inspect Full Certificate</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="award-card-body">
        {/* Top Meta Row */}
        <div className="award-card-top-meta">
          <span className="award-number-badge">{award.number}</span>
          <span className="award-month-pill">{award.date}</span>
        </div>

        {/* Title */}
        <h3 className="award-title-text">{award.title}</h3>
        <p className="award-subtitle-text">{award.subtitle}</p>

        {/* Issuer Attribution */}
        <div className="award-issuer-row">
          <div>
            <strong>{award.organization}</strong>
            <div>
              <span>Conferred by </span>
              <strong style={{ color: 'var(--text-primary)' }}>{award.issuer}</strong>
            </div>
          </div>
        </div>

        {/* Professional Description */}
        <p className="award-description-text">
          {award.description}
        </p>

        {/* Actions Footer */}
        <div className="award-actions-footer">
          <button
            type="button"
            className="award-btn-preview"
            onClick={() => onOpenPreview(award)}
          >
            <span>View Full Recognition</span>
            <ArrowUpRight size={16} />
          </button>

          <a
            href={award.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="award-btn-verify"
            title="Verify this award on LinkedIn Treasury"
          >
            <LinkedinIcon size={14} />
            <span>Verify</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
