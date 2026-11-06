import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Copy, Check, Send, ArrowUpRight, AlertCircle, Loader2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/BrandIcons';
import { profileData } from '../data/profile';
import MagneticButton from '../components/MagneticButton';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validateForm = () => {
    if (!formState.name.trim()) {
      return 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (formState.message.trim().length < 10) {
      return 'Please write a message of at least 10 characters.';
    }
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus('error');
      setFeedbackMessage(validationError);
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === 'your_web3forms_access_key_here') {
      setSubmitStatus('error');
      setFeedbackMessage(
        'Delivery setup notice: VITE_WEB3FORMS_ACCESS_KEY is not configured yet. Please email me directly at satishkush4446@outlook.com or click "Send Direct Email" above.'
      );
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');
    setFeedbackMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
          subject: `Portfolio Inquiry from ${formState.name.trim()} - Satish Kushwaha`
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFeedbackMessage(`Thank you, ${formState.name.trim()}! Your message has been transmitted successfully. I will review it and reply promptly.`);
        setFormState({ name: '', email: '', message: '' });

        try {
          const isLight = document.documentElement.getAttribute('data-theme') === 'light';
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: isLight ? ['#16A34A', '#0F172A', '#38bdf8'] : ['#C7FF4D', '#ffffff', '#38bdf8']
          });
        } catch {
          // Safe fallback if confetti canvas fails
        }
      } else {
        setSubmitStatus('error');
        setFeedbackMessage(result.message || 'Unable to deliver message at this time. Please try again or email directly.');
      }
    } catch {
      setSubmitStatus('error');
      setFeedbackMessage('Network request failed. Please verify your connection or email directly at satishkush4446@outlook.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="site-section">
      <div className="container">
        <div className="contact-hero-wrap">
          <div className="section-badge" style={{ marginBottom: '1.5rem' }}>
            <span className="section-badge-dot" />
            <span>Get In Touch</span>
          </div>

          <h2 className="contact-massive-heading">
            LET'S BUILD SOMETHING <br />
            <span style={{ color: 'var(--accent-primary)' }}>EXTRAORDINARY.</span>
          </h2>

          <p className="contact-lead-sub">
            Whether you have a high-impact engineering role, an enterprise CMS migration project, or an ambitious web application to architect, my inbox is open.
          </p>

          {/* Quick Actions Row */}
          <div className="contact-actions-row">
            {/* Magnetic Send Direct Email */}
            <MagneticButton
              href={`mailto:${profileData.email}?subject=Project%20Inquiry%20-%20Satish%20Kushwaha`}
              variant="primary"
            >
              <Mail size={18} />
              <span>Send Direct Email</span>
            </MagneticButton>

            {/* Click to Copy Email */}
            <button
              type="button"
              className="email-copy-pill"
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
            >
              {copied ? <Check size={16} style={{ color: 'var(--accent-primary)' }} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : profileData.email}</span>
            </button>

            {/* LinkedIn Connection */}
            <MagneticButton
              href={profileData.linkedin}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={18} />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight size={14} />
            </MagneticButton>

            {/* GitHub Profile */}
            <MagneticButton
              href={profileData.github}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={18} />
              <span>GitHub Profile</span>
              <ArrowUpRight size={14} />
            </MagneticButton>
          </div>

          {/* Interactive Message Form */}
          <div className="contact-interactive-form">
            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', textAlign: 'center' }}>
              Send a Quick Message
            </h3>

            {/* Live Status Region */}
            <div aria-live="polite" style={{ marginBottom: submitStatus !== 'idle' ? '1rem' : 0 }}>
              {submitStatus === 'success' && (
                <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#34d399', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <Check size={20} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong>Message Sent!</strong>
                    <div style={{ marginTop: '0.25rem' }}>{feedbackMessage}</div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#f87171', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong>Action Required:</strong>
                    <div style={{ marginTop: '0.25rem' }}>{feedbackMessage}</div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleFormSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Your Name <span style={{ color: 'var(--accent-primary)' }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  disabled={submitting}
                  placeholder="e.g. Alex Morgan"
                  className="form-input"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({ ...formState, name: e.target.value });
                    if (submitStatus === 'error') setSubmitStatus('idle');
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Your Email <span style={{ color: 'var(--accent-primary)' }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  disabled={submitting}
                  placeholder="alex@company.com"
                  className="form-input"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({ ...formState, email: e.target.value });
                    if (submitStatus === 'error') setSubmitStatus('idle');
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message / Project Details <span style={{ color: 'var(--accent-primary)' }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  disabled={submitting}
                  placeholder="Tell me about your project, team, or opportunity..."
                  className="form-textarea"
                  value={formState.message}
                  onChange={(e) => {
                    setFormState({ ...formState, message: e.target.value });
                    if (submitStatus === 'error') setSubmitStatus('idle');
                  }}
                />
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={submitting}
                style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
              >
                {submitting ? (
                  <>
                    <span>Transmitting...</span>
                    <Loader2 size={16} className="spin-anim" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
