export default function MarqueeTicker() {
  const items = [
    '100+ Websites Delivered',
    '35% Average Speed Lift',
    '0% Downtime Migrations',
    'React.js Architecture',
    'Vanilla JavaScript (ES6+)',
    'WCAG 2.1 AA Accessibility',
    'Core Web Vitals Specialist',
    '2× Star of the Month',
    'WordPress & Elementor Expert',
    'Cross-Browser Precision'
  ];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-content">
        {items.map((text, idx) => (
          <div key={`m1-${idx}`} className="marquee-item">
            <span>{text}</span>
            <span className="accent-star">★</span>
          </div>
        ))}
      </div>
      <div className="marquee-content" aria-hidden="true">
        {items.map((text, idx) => (
          <div key={`m2-${idx}`} className="marquee-item">
            <span>{text}</span>
            <span className="accent-star">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
