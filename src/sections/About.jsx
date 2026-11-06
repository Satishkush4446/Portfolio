import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Zap, Compass } from 'lucide-react';
import { profileData } from '../data/profile';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-fade-el', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="site-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-badge about-fade-el">
          <span className="section-badge-dot" />
          <span>About My Engineering Philosophy</span>
        </div>

        <h2 className="section-title about-fade-el">
          Bridging Creative Vision &amp; <span className="text-accent">High-Fidelity Code</span>
        </h2>

        <p className="section-subtitle about-fade-el">
          Obsessed with sub-second performance, bulletproof accessibility, and micro-interactions that leave a lasting impression.
        </p>

        {/* Asymmetric Grid */}
        <div className="about-grid">
          {/* Narrative Column */}
          <div className="about-narrative">
            <p className="about-lead-text about-fade-el">
              "Great frontend engineering isn't just about pixels on a screen — it's about the speed of response, effortless accessibility, and emotion in motion."
            </p>

            <p className="about-body-text about-fade-el">
              {profileData.summary}
            </p>

            <div className="about-highlights-list">
              <div className="about-highlight-item about-fade-el">
                <div className="highlight-icon-box">
                  <Zap size={18} />
                </div>
                <div className="highlight-info">
                  <h4>Performance Optimization &amp; Core Web Vitals</h4>
                  <p>Consistently slashing load times by 35% through asset minification, lazy loading, script re-ordering, and rendering pipeline audits.</p>
                </div>
              </div>

              <div className="about-highlight-item about-fade-el">
                <div className="highlight-icon-box">
                  <Compass size={18} />
                </div>
                <div className="highlight-info">
                  <h4>Universal WCAG 2.1 Accessibility</h4>
                  <p>Engineering accessible semantic markup, ARIA roles, and high-contrast color palettes ensuring equitable access for 200,000+ monthly visitors.</p>
                </div>
              </div>

              <div className="about-highlight-item about-fade-el">
                <div className="highlight-icon-box">
                  <Award size={18} />
                </div>
                <div className="highlight-info">
                  <h4>Two-Time "Star of the Month" Recipient</h4>
                  <p>Awarded at Adaan Digital Solutions for delivering enterprise client web applications 2 weeks ahead of scheduled launch dates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Card / Code Terminal Preview */}
          <div className="about-card about-fade-el">
            <div className="card-topbar">
              <div className="card-traffic-lights">
                <div className="traffic-light red" />
                <div className="traffic-light yellow" />
                <div className="traffic-light green" />
              </div>
              <div className="card-badge-status">satish.config.js</div>
            </div>

            <div className="about-stats-mini-grid">
              <div className="stats-mini-box">
                <div className="num">100+</div>
                <div className="label">Websites Launched</div>
              </div>
              <div className="stats-mini-box">
                <div className="num">35%</div>
                <div className="label">Speed Acceleration</div>
              </div>
              <div className="stats-mini-box">
                <div className="num">0%</div>
                <div className="label">Migration Downtime</div>
              </div>
              <div className="stats-mini-box">
                <div className="num">95%</div>
                <div className="label">Client Satisfaction</div>
              </div>
            </div>

            {/* Developer Code Snippet */}
            <div className="about-code-snippet">
              <div><span className="code-comment">// Developer Persona Profile</span></div>
              <div><span className="code-keyword">const</span> engineer = {'{'}</div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span className="code-prop">name</span>: <span className="code-str">"{profileData.name}"</span>,
              </div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span className="code-prop">role</span>: <span className="code-str">"Frontend Engineer"</span>,
              </div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span className="code-prop">coreFocus</span>: [<span className="code-str">"React"</span>, <span className="code-str">"Motion"</span>, <span className="code-str">"Speed"</span>],
              </div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span className="code-prop">currentStatus</span>: <span className="code-str">"Ready for Impact"</span>,
              </div>
              <div style={{ paddingLeft: '1.25rem' }}>
                <span className="code-prop">drinkCoffeeAndBuild</span>: () =&gt; <span className="code-keyword">true</span>
              </div>
              <div>{'};'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
