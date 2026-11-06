import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Sparkles, Code2, Zap, ShieldCheck, FileText } from 'lucide-react';
import { profileData } from '../data/profile';
import MagneticButton from '../components/MagneticButton';

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  // Interactive Particle Canvas Background
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = Math.min(window.innerWidth < 768 ? 30 : 65, 75);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        alpha: Math.random() * 0.4 + 0.15
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const draw = () => {
      if (!isTabVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(199, 255, 77, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render and update particles
      particles.forEach((p) => {
        // Subtle mouse push
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199, 255, 77, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Entrance Sequence
  useEffect(() => {
    if (!heroRef.current) return;

    // Skip heavy animations if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-status-tag', {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.1
      })
      .from('.hero-name-line', {
        opacity: 0,
        y: 45,
        stagger: 0.12,
        duration: 1.1
      }, '-=0.4')
      .from('.hero-subtitle-role', {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, '-=0.7')
      .from('.hero-headline', {
        opacity: 0,
        y: 25,
        duration: 0.9
      }, '-=0.6')
      .from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, '-=0.6')
      .from('.hero-cta-group .magnetic-wrap', {
        opacity: 0,
        scale: 0.92,
        stagger: 0.15,
        duration: 0.7
      }, '-=0.5')
      .from('.quick-badge', {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.6
      }, '-=0.4')
      .from('.hero-scroll-indicator', {
        opacity: 0,
        duration: 0.8
      }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      {/* Interactive canvas background */}
      <canvas ref={canvasRef} className="hero-interactive-canvas" aria-hidden="true" />

      {/* Grid Pattern and Glows */}
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-1" aria-hidden="true" />

      <div className="container hero-content">
        {/* Availability Tag */}
        <div className="hero-status-tag">
          <span className="pulse-lime" />
          <span>{profileData.availability} • {profileData.location}</span>
        </div>

        {/* Oversized Name */}
        <h1 className="hero-name" aria-label="Satish Kushwaha">
          <div className="hero-name-line">SATISH</div>
          <div className="hero-name-line">
            <span className="accent-word">KUSHWAHA</span>
          </div>
        </h1>

        {/* Subtitle Role */}
        <div className="hero-subtitle-role">
          Frontend Engineer &amp; Creative Web Developer
        </div>

        {/* Main Headline */}
        <h2 className="hero-headline">
          {profileData.headline}
        </h2>

        {/* Supporting Description */}
        <p className="hero-description">
          {profileData.bio}
        </p>

        {/* Magnetic CTA Buttons */}
        <div className="hero-cta-group">
          <MagneticButton
            href="#projects"
            variant="primary"
          >
            <span>Explore My Work</span>
            <ArrowUpRight size={18} />
          </MagneticButton>

          <MagneticButton
            href={profileData.resumeUrl || `${import.meta.env.BASE_URL}Satish_Kushwaha_Resume.pdf`}
            download="Satish_Kushwaha_Resume.pdf"
            variant="secondary"
            aria-label="Download Satish Kushwaha Resume (PDF)"
          >
            <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
            <span>Download Resume</span>
          </MagneticButton>

          <MagneticButton
            href="#contact"
            variant="secondary"
          >
            <span>Let's Connect</span>
            <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
          </MagneticButton>
        </div>

        {/* Quick Verified Impact Badges */}
        <div className="hero-quick-badges">
          <div className="quick-badge">
            <Code2 size={14} style={{ color: 'var(--accent-primary)' }} />
            <span><strong>100+</strong> Websites Delivered</span>
          </div>
          <div className="quick-badge">
            <Zap size={14} style={{ color: '#38bdf8' }} />
            <span><strong>35%</strong> Faster Load Speeds</span>
          </div>
          <div className="quick-badge">
            <ShieldCheck size={14} style={{ color: '#34d399' }} />
            <span><strong>0%</strong> Downtime Migrations</span>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <a href="#about" className="hero-scroll-indicator" aria-label="Scroll to About section">
        <span>Scroll to Explore</span>
        <div className="mouse-icon">
          <div className="mouse-wheel" />
        </div>
      </a>
    </section>
  );
}
