import { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({
  children,
  className = '',
  variant = 'primary', // 'primary', 'secondary', 'accent-outline'
  href,
  onClick,
  target,
  rel,
  ariaLabel,
  download,
  ...restProps
}) {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1.2, 0.4)'
    });
  };

  const buttonClasses = `magnetic-btn magnetic-btn-${variant} ${className}`;

  if (href) {
    return (
      <span className="magnetic-wrap" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <a
          ref={buttonRef}
          href={href}
          className={buttonClasses}
          target={target}
          rel={rel}
          onClick={onClick}
          download={download}
          aria-label={ariaLabel || restProps['aria-label']}
          {...restProps}
        >
          {children}
        </a>
      </span>
    );
  }

  return (
    <span className="magnetic-wrap" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <button
        ref={buttonRef}
        type="button"
        className={buttonClasses}
        onClick={onClick}
        aria-label={ariaLabel || restProps['aria-label']}
        {...restProps}
      >
        {children}
      </button>
    </span>
  );
}
