import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layout, Database, Wrench, Sparkles, Cpu } from 'lucide-react';
import { skillCategories } from '../data/skills';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const sectionRef = useRef(null);

  // Mouse spotlight tracker on Bento Cards
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.bento-card-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'frontend':
        return <Code2 size={22} style={{ color: 'var(--accent-primary)' }} />;
      case 'cms':
        return <Database size={22} style={{ color: '#60A5FA' }} />;
      case 'performance-seo':
      case 'specializations':
        return <Cpu size={22} style={{ color: '#F472B6' }} />;
      case 'ui-ux-design':
      case 'design':
        return <Layout size={22} style={{ color: '#D97706' }} />;
      case 'tools':
        return <Wrench size={22} style={{ color: '#34D399' }} />;
      default:
        return <Sparkles size={22} style={{ color: 'var(--accent-primary)' }} />;
    }
  };

  // Assign bento grid spans based on category
  const getBentoSpan = (id) => {
    if (id === 'frontend') return 'bento-col-8';
    if (id === 'cms') return 'bento-col-4';
    if (id === 'performance-seo' || id === 'specializations') return 'bento-col-6';
    if (id === 'ui-ux-design' || id === 'design') return 'bento-col-6';
    if (id === 'tools') return 'bento-col-12';
    return 'bento-col-6';
  };

  return (
    <section id="skills" ref={sectionRef} className="site-section">
      <div className="container">
        {/* Header */}
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span>Interactive Technical Stack</span>
        </div>

        <h2 className="section-title">
          Mastered Tools &amp; <span className="text-accent">Specialized Capabilities</span>
        </h2>

        <p className="section-subtitle">
          A high-performance technical toolkit refined across 100+ production website launches, legacy migrations, and accessible UI engineering.
        </p>

        {/* Bento Grid */}
        <div className="skills-bento-grid">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className={`bento-card ${getBentoSpan(category.id)} bento-card-anim`}
              onMouseMove={handleMouseMove}
            >
              <div className="bento-card-title">
                {getCategoryIcon(category.id)}
                <span>{category.title}</span>
              </div>

              <p className="bento-card-desc">{category.description}</p>

              <div className="skill-pills-wrap">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-badge-item" title={skill.desc}>
                    <span style={{ fontWeight: 600 }}>{skill.name}</span>
                    <span className="skill-tag-pill">{skill.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
