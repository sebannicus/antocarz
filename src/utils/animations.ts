/**
 * animations.ts — Antocarz
 * Funciones GSAP reutilizables. Carga diferida para no bloquear LCP.
 * Principio SRP: cada función anima un único tipo de elemento.
 */

export async function initHeroAnimation(): Promise<void> {
  const { gsap } = await import('gsap');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('[data-hero-label]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo('[data-hero-title]', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.2')
    .fromTo('[data-hero-sub]',   { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo('[data-hero-cta]',   { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, '-=0.3')
    .fromTo('[data-hero-scroll]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1');
}

export async function initScrollReveal(): Promise<void> {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray<HTMLElement>('[data-scroll-children]').forEach((container) => {
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;
    gsap.fromTo(children,
      { opacity: 0, y: 55, filter: 'blur(4px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: container, start: 'top 88%', once: true } }
    );
  });

  gsap.utils.toArray<HTMLElement>('.gs-clip-up').forEach((el) => {
    gsap.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  gsap.utils.toArray<HTMLElement>('.gs-fade-up').forEach((el) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  gsap.utils.toArray<HTMLElement>('.gs-fade-in').forEach((el) => {
    gsap.to(el, { opacity: 1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  gsap.utils.toArray<HTMLElement>('.gs-scale-in').forEach((el) => {
    gsap.to(el, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  gsap.utils.toArray<HTMLElement>('.gs-slide-left').forEach((el) => {
    gsap.to(el, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  gsap.utils.toArray<HTMLElement>('.gs-slide-right').forEach((el) => {
    gsap.to(el, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
}

export async function initStaggerReveal(
  containerSelector: string,
  childSelector: string = '*',
  options?: { delay?: number; stagger?: number }
): Promise<void> {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray<HTMLElement>(containerSelector).forEach((container) => {
    const children = container.querySelectorAll<HTMLElement>(childSelector);
    if (!children.length) return;
    gsap.fromTo(children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: options?.stagger ?? 0.12,
        delay: options?.delay ?? 0, ease: 'power2.out',
        scrollTrigger: { trigger: container, start: 'top 80%', once: true } }
    );
  });
}

export async function initCounterAnimation(): Promise<void> {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.target ?? '0');
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);
    const obj = { value: 0 };

    gsap.to(obj, {
      value: target, duration: 1.8, ease: 'power2.out',
      onUpdate() { el.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`; },
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  });
}
