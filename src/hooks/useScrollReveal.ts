import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT_TARGETS =
  'h1, h2, h3, h4, p, blockquote, .tag-gold, .reveal-text, .heading-hero, .heading-section';

const CARD_TARGETS =
  'article, aside, details, .card-pearl, .reveal-card, .shadow-card-pearl, .shadow-card-soft, .shadow-card-elevated';

function collect(selector: string): HTMLElement[] {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));

  return nodes.filter((el, index, all) => {
    if (el.closest('header, #hero-section, [data-no-reveal], form')) return false;
    if (el.classList.contains('sr-only')) return false;
    if (el.tagName === 'P' && (el.textContent?.trim().length ?? 0) < 12) return false;
    return !all.some((other, otherIndex) => otherIndex !== index && other.contains(el));
  });
}

function isInView(el: HTMLElement) {
  return el.getBoundingClientRect().top < window.innerHeight * 0.9;
}

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: gsap.Context | undefined;
    const timeout = window.setTimeout(() => {
      const texts = collect(TEXT_TARGETS);
      const cards = collect(CARD_TARGETS).filter(
        (card) => !texts.some((text) => text.contains(card) || card.contains(text))
      );

      ctx = gsap.context(() => {
        texts.forEach((el) => {
          if (isInView(el)) {
            gsap.set(el, { clearProps: 'transform,opacity,visibility,clipPath' });
            return;
          }

          gsap.fromTo(
            el,
            { y: 72, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            }
          );
        });

        cards.forEach((el, i) => {
          if (isInView(el)) {
            gsap.set(el, { clearProps: 'transform,opacity,visibility' });
            return;
          }

          gsap.fromTo(
            el,
            { y: 48 },
            {
              y: 0,
              duration: 0.7,
              delay: (i % 4) * 0.05,
              ease: 'power2.out',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true,
              },
            }
          );
        });
      });

      ScrollTrigger.refresh();
    }, 80);

    return () => {
      window.clearTimeout(timeout);
      ctx?.revert();
    };
  }, [pathname]);
}
