import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animate hero section elements on page entrance
 */
export const initHeroEntrance = (scopeRef) => {
  if (!scopeRef.current) return null;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from('.hero-status-tag', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2
    })
    .from('.hero-name', {
      opacity: 0,
      y: 60,
      skewY: 3,
      duration: 1.2,
      stagger: 0.1
    }, '-=0.5')
    .from('.hero-subtitle-role', {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, '-=0.7')
    .from('.hero-headline', {
      opacity: 0,
      y: 30,
      duration: 0.9
    }, '-=0.6')
    .from('.hero-description', {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, '-=0.6')
    .from('.hero-cta-group', {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, '-=0.5')
    .from('.hero-quick-badges', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-scroll-indicator', {
      opacity: 0,
      duration: 1
    }, '-=0.3');
  }, scopeRef);

  return ctx;
};

/**
 * Animate a section's header and child elements on scroll
 */
export const animateOnScroll = (elementRef, selector = '.fade-in-up') => {
  if (!elementRef.current) return null;

  const ctx = gsap.context(() => {
    gsap.from(selector, {
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }, elementRef);

  return ctx;
};

/**
 * Counter animation for numerical metrics
 */
export const animateCounter = (targetElement, targetValue, duration = 2) => {
  if (!targetElement) return;

  const numeric = parseFloat(targetValue);
  if (isNaN(numeric)) return;

  const obj = { val: 0 };
  gsap.to(obj, {
    val: numeric,
    duration: duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: targetElement,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    onUpdate: () => {
      targetElement.innerText = Math.floor(obj.val);
    }
  });
};
