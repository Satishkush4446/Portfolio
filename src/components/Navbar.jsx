import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText, Mail, Sun, Moon } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import { profileData } from '../data/profile';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Awards', href: '#awards' },
    { label: 'Impact', href: '#impact' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section scrollspy
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'awards', 'impact', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
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
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="navbar-wrapper">
        <nav className={`navbar-inner ${isScrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
          {/* Brand Logo */}
          <a href="#hero" className="nav-brand" aria-label="Satish Kushwaha Home">
            <span className="brand-glyph">SK</span>
            <span>Satish<span style={{ color: 'var(--accent-primary)' }}>.</span></span>
          </a>

          {/* Desktop Nav Items */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Nav Actions */}
          <div className="nav-actions">
            <div className="nav-status-dot" title="Available for Frontend Opportunities">
              <span className="live-ping" />
              <span className="nav-status-text">Available</span>
            </div>

            {/* Theme Toggle (Light / Dark) */}
            <ThemeToggle
              theme={theme}
              toggleTheme={toggleTheme}
              className="nav-theme-btn"
            />

            {/* Resume Download Action */}
            <a
              href={profileData.resumeUrl || `${import.meta.env.BASE_URL}Satish_Kushwaha_Resume.pdf`}
              download="Satish_Kushwaha_Resume.pdf"
              className="highlight-icon-box nav-resume-btn"
              style={{ width: '38px', height: '38px', borderRadius: '50%' }}
              aria-label="Download Satish Kushwaha Resume"
              title="Download Resume (PDF)"
            >
              <FileText size={17} />
            </a>

            {/* LinkedIn Profile */}
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="highlight-icon-box nav-linkedin-btn"
              style={{ width: '38px', height: '38px', borderRadius: '50%' }}
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>

            {/* GitHub Profile */}
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="highlight-icon-box nav-github-btn"
              style={{ width: '38px', height: '38px', borderRadius: '50%' }}
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>

            <MagneticButton
              href="#contact"
              variant="primary"
              className="nav-contact-btn"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={14} />
            </MagneticButton>

            {/* Mobile Toggle */}
            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`mobile-nav-item ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.9rem', alignItems: 'center' }}>
          {/* Mobile Theme Switch Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="mobile-theme-row"
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            <span>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</span>
          </button>

          <MagneticButton
            href="#contact"
            variant="primary"
            onClick={closeMobileMenu}
          >
            <span>Let's Build Together</span>
            <ArrowUpRight size={16} />
          </MagneticButton>

          {/* Mobile Resume Action */}
          <a
            href={profileData.resumeUrl || `${import.meta.env.BASE_URL}Satish_Kushwaha_Resume.pdf`}
            download="Satish_Kushwaha_Resume.pdf"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 600 }}
            onClick={closeMobileMenu}
          >
            <FileText size={16} />
            <span>Download Resume (PDF)</span>
          </a>

          {/* Mobile LinkedIn Link */}
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}
          >
            <LinkedinIcon size={16} />
            <span>LinkedIn / satishkush4446</span>
          </a>

          {/* Mobile GitHub Link */}
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}
          >
            <GithubIcon size={16} />
            <span>GitHub / Satishkush4446</span>
          </a>

          {/* Mobile Email Link */}
          <a
            href={`mailto:${profileData.email}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}
          >
            <Mail size={16} />
            <span>{profileData.email}</span>
          </a>
        </div>
      </div>
    </>
  );
}
