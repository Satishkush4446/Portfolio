import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';
import { profileData } from '../data/profile';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setCurrentTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top-row">
          <div>
            <div className="footer-brand">
              {profileData.name} <span style={{ color: 'var(--accent-primary)' }}>/</span> Frontend Engineer
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              Building high-performance, accessible, and visually captivating web applications.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul className="footer-links">
              <li className="footer-link-item"><a href="#about">About</a></li>
              <li className="footer-link-item"><a href="#projects">Projects</a></li>
              <li className="footer-link-item"><a href="#skills">Skills</a></li>
              <li className="footer-link-item"><a href="#experience">Experience</a></li>
              <li className="footer-link-item"><a href="#awards">Awards</a></li>
              <li className="footer-link-item"><a href="#impact">Impact</a></li>
              <li className="footer-link-item"><a href="#certifications">Certifications</a></li>
              <li className="footer-link-item"><a href="#contact">Contact</a></li>
            </ul>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="highlight-icon-box"
                style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="highlight-icon-box"
                style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div>
            &copy; {CURRENT_YEAR} {profileData.name}. Engineered with React, GSAP &amp; Vanilla CSS.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
              Faridabad, India (IST): <strong style={{ color: 'var(--text-primary)' }}>{currentTime || '06:30 PM'}</strong>
            </span>

            <button
              type="button"
              className="back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
