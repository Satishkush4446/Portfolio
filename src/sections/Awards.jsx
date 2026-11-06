import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase } from 'lucide-react';
import { awardsData } from '../data/awards';
import AwardCard from '../components/awards/AwardCard';
import AwardLightbox from '../components/awards/AwardLightbox';
import MagneticButton from '../components/MagneticButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Awards() {
  const [activeAward, setActiveAward] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef(null);

  const handleOpenPreview = (award) => {
    setActiveAward(award);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section header & counter badge
      gsap.from('.award-fade-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out'
      });

      // Animate award cards
      gsap.from('.award-anim-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 45,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="awards" ref={sectionRef} className="site-section">
      <div className="container">
        {/* Top Header Wrap with Editorial Counter */}
        <div className="awards-header-wrap">
          <div>
            <div className="section-badge award-fade-header">
              <span className="section-badge-dot" />
              <span>Honors &amp; Executive Recognition</span>
            </div>

            <h2 className="section-title award-fade-header" style={{ marginBottom: '0.85rem' }}>
              RECOGNITION THAT <br />
              <span className="text-accent">REFLECTS THE CRAFT.</span>
            </h2>

            <p className="section-subtitle award-fade-header" style={{ marginBottom: 0 }}>
              Twice recognized for exceptional website engineering, creative problem-solving, and consistent delivery.
            </p>
          </div>

          {/* Large "02" Recognition Counter Badge */}
          <div className="awards-counter-badge award-fade-header">
            <div className="awards-counter-number">02</div>
            <div className="awards-counter-meta">
              <div className="awards-counter-title">Star of the Month</div>
              <div className="awards-counter-sub">Adaan Digital Solutions • 2023</div>
            </div>
          </div>
        </div>

        {/* Awards Exhibition Grid (April 2023 & June 2023) */}
        <div className="awards-exhibition-grid">
          {awardsData.map((award) => (
            <AwardCard
              key={award.id}
              award={award}
              onOpenPreview={handleOpenPreview}
            />
          ))}
        </div>

        {/* Connect Awards with Professional Experience Bridge */}
        <div className="awards-experience-bridge">
          <div className="awards-bridge-left">
            <div className="awards-bridge-icon">
              <Briefcase size={22} />
            </div>
            <div className="awards-bridge-content">
              <h4>Conferred During Tenure at Adaan Digital Solutions</h4>
              <p>
                Both honors were awarded during my role as Junior Web Designer (Dec 2022 – Mar 2024) across 50+ client website migrations.
              </p>
            </div>
          </div>

          <MagneticButton
            href="#experience"
            variant="secondary"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
          >
            <span>View Career Timeline</span>
            <ArrowRight size={15} />
          </MagneticButton>
        </div>
      </div>

      {/* Accessible Fullscreen Certificate Lightbox */}
      <AwardLightbox
        award={activeAward}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectAward={(award) => setActiveAward(award)}
      />
    </section>
  );
}
