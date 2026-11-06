import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Award, Zap, Shield, Globe } from 'lucide-react';
import { profileData } from '../data/profile';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Achievements() {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.from('.stat-showcase-card-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 45,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out'
      });

      // GSAP numerical counting animation for each stat
      profileData.stats.forEach((stat, index) => {
        const el = countersRef.current[index];
        if (!el) return;

        const target = stat.value;
        const obj = { count: 0 };

        gsap.to(obj, {
          count: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            el.innerText = `${Math.floor(obj.count)}${stat.suffix || ''}`;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getMetricIcon = (index) => {
    switch (index) {
      case 0: return <Globe size={24} style={{ color: 'var(--accent-primary)' }} />;
      case 1: return <Shield size={24} style={{ color: '#38bdf8' }} />;
      case 2: return <Zap size={24} style={{ color: '#34d399' }} />;
      case 3: return <TrendingUp size={24} style={{ color: '#D97706' }} />;
      case 4: return <TrendingUp size={24} style={{ color: '#f472b6' }} />;
      case 5: return <Award size={24} style={{ color: '#818cf8' }} />;
      default: return <TrendingUp size={24} style={{ color: 'var(--accent-primary)' }} />;
    }
  };

  return (
    <section id="impact" ref={sectionRef} className="site-section">
      <div className="container">
        {/* Header */}
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span>Verified Quantitative Impact</span>
        </div>

        <h2 className="section-title">
          Measured Impact &amp; <span className="text-accent">Milestones</span>
        </h2>

        <p className="section-subtitle">
          Real metrics grounded in verified career deliveries across 100+ production website builds, legacy CMS migrations, and conversion funnels.
        </p>

        {/* Stats Grid */}
        <div className="stats-showcase-grid">
          {profileData.stats.map((item, idx) => (
            <div key={idx} className="stat-showcase-card stat-showcase-card-anim">
              <div style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '12px', background: 'var(--bg-secondary)', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }}>
                {getMetricIcon(idx)}
              </div>

              {/* Number display driven by GSAP Counter */}
              <div
                ref={(el) => (countersRef.current[idx] = el)}
                className="stat-number-display"
              >
                0{item.suffix}
              </div>

              <h3 className="stat-title-display">{item.label}</h3>
              <p className="stat-detail-display">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
