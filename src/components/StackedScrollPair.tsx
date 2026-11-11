import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/stacked-scroll.css';

gsap.registerPlugin(ScrollTrigger);

interface StackedScrollPairProps {
  upper: React.ReactNode;
  lower: React.ReactNode;
  className?: string;
  compressUpper?: boolean;
}

const STACK_MQ = '(min-width: 768px)';
const SCROLLER = () => document.documentElement;
/** Viewports of scroll for the full roll / cover (higher = slower, smoother). */
const ROLL_SCROLL_VH = 1.95;
const SCRUB_SMOOTH = 1.45;

export const StackedScrollPair: React.FC<StackedScrollPairProps> = ({
  upper,
  lower,
  className = '',
  compressUpper = true,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(STACK_MQ);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx: gsap.Context | null = null;

    const setup = () => {
      ctx?.revert();
      ctx = null;

      if (!mq.matches || reduced) {
        ScrollTrigger.refresh();
        return;
      }

      const root = rootRef.current;
      const pin = pinRef.current;
      const inner = innerRef.current;
      if (!root || !pin || !inner) return;

      const pinDistance = () => window.innerHeight * ROLL_SCROLL_VH;
      const rollScroll = {
        trigger: root,
        start: 'top top',
        end: () => `+=${pinDistance()}`,
        scrub: SCRUB_SMOOTH,
        invalidateOnRefresh: true,
        scroller: SCROLLER(),
      };

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: () => `+=${pinDistance()}`,
          pin,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scroller: SCROLLER(),
        });

        if (compressUpper) {
          gsap.fromTo(
            inner,
            { scaleY: 1, y: 0 },
            {
              scaleY: 0.72,
              y: () => -window.innerHeight * 0.08,
              transformOrigin: '50% 100%',
              ease: 'none',
              force3D: true,
              scrollTrigger: rollScroll,
            }
          );
        }
      }, root);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    setup();
    mq.addEventListener('change', setup);
    window.addEventListener('resize', setup);

    return () => {
      mq.removeEventListener('change', setup);
      window.removeEventListener('resize', setup);
      ctx?.revert();
    };
  }, [compressUpper]);

  return (
    <div ref={rootRef} className={`stacked-scroll ${className}`.trim()}>
      <div ref={pinRef} className="stacked-scroll__hero-pin stacked-scroll__upper-panel">
        <div ref={innerRef} className="stacked-scroll__hero-inner">
          {upper}
        </div>
      </div>
      <div className="stacked-scroll__overlay">{lower}</div>
    </div>
  );
};
