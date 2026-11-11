import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/stacked-scroll.css';

gsap.registerPlugin(ScrollTrigger);

interface SectionCoverStackProps {
  upper: React.ReactNode;
  lower: React.ReactNode;
  className?: string;
}

interface SectionCoverChainProps {
  layers: React.ReactNode[];
  className?: string;
}

const STACK_MQ = '(min-width: 768px)';
const SCROLLER = () => document.documentElement;
/** Must match `--cover-pull` so pin duration equals the visual cover distance. */
const COVER_SCROLL_VH = 1;
/**
 * Skip pin/pull only for clearly short layers (detail FAQs etc.).
 * Keep covers alive on tall / wide monitors where mid sections sit ~0.4–0.7vh.
 */
const MIN_PIN_VH = 0.35;

/**
 * Tall upper section scrolls through fully, then pins so lower slides up over it.
 */
export const SectionCoverStack: React.FC<SectionCoverStackProps> = ({
  upper,
  lower,
  className = '',
}) => <SectionCoverChain layers={[upper, lower]} className={className} />;

/**
 * Sibling layers: each pins so the next slides up over it.
 * Pull margin lives on an outer slot GSAP never touches — pin targets get
 * `margin: 0` inline from ScrollTrigger, which was killing the cover overlap.
 * Short layers (common on detail pages) skip pin + pull so content is not clipped.
 */
export const SectionCoverChain: React.FC<SectionCoverChainProps> = ({
  layers,
  className = '',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia(STACK_MQ);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx: gsap.Context | null = null;
    let resizeTimer: number | null = null;

    const minPinHeight = () => window.innerHeight * MIN_PIN_VH;
    const coverDistance = () => window.innerHeight * COVER_SCROLL_VH;

    const syncPullAndFlags = () => {
      const root = rootRef.current;
      if (!root) return;

      if (!mq.matches || reduced) {
        root.style.setProperty('--cover-pull', '0px');
        slotRefs.current.forEach((slot) => {
          slot?.classList.remove('section-stack__slot--pull');
          slot?.style.removeProperty('--cover-pull');
        });
        return;
      }

      // Default pull = 1vh; per-slot override uses prev section height on tall monitors
      // so covers still engage when content is shorter than the viewport.
      root.style.setProperty('--cover-pull', `${coverDistance()}px`);

      slotRefs.current.forEach((slot, i) => {
        if (!slot || i === 0) {
          slot?.classList.remove('section-stack__slot--pull');
          slot?.style.removeProperty('--cover-pull');
          return;
        }
        const prevPin = pinRefs.current[i - 1];
        const prevH = prevPin?.offsetHeight ?? 0;
        const tallEnough = prevH >= minPinHeight();
        slot.classList.toggle('section-stack__slot--pull', tallEnough);
        if (tallEnough) {
          const pull = Math.min(prevH, coverDistance());
          slot.style.setProperty('--cover-pull', `${pull}px`);
        } else {
          slot.style.removeProperty('--cover-pull');
        }
      });
    };

    const setup = () => {
      ctx?.revert();
      ctx = null;
      syncPullAndFlags();

      if (!mq.matches || reduced) {
        ScrollTrigger.refresh();
        return;
      }

      const root = rootRef.current;
      if (!root) return;

      const pins = pinRefs.current.slice(0, -1).filter(Boolean) as HTMLDivElement[];
      if (!pins.length) return;

      const threshold = minPinHeight();

      ctx = gsap.context(() => {
        pins.forEach((pin, index) => {
          if (pin.offsetHeight < threshold) return;

          // Match this pin's scroll distance to the next slot's pull (may be < 1vh).
          const nextSlot = slotRefs.current[index + 1];
          const pinDistance = () => {
            const raw = nextSlot
              ? parseFloat(getComputedStyle(nextSlot).getPropertyValue('--cover-pull'))
              : NaN;
            if (Number.isFinite(raw) && raw > 0) return raw;
            return Math.min(pin.offsetHeight, coverDistance()) || coverDistance();
          };

          ScrollTrigger.create({
            trigger: pin,
            start: 'bottom bottom',
            end: () => `+=${pinDistance()}`,
            pin,
            pinSpacing: false,
            // Lenis + scrollerProxy: transform pins stay in sync with virtual scroll.
            pinType: 'transform',
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scroller: SCROLLER(),
          });
        });
      }, root);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        window.setTimeout(() => ScrollTrigger.refresh(), 250);
      });
    };

    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setup(), 150);
    };

    setup();
    mq.addEventListener('change', setup);
    window.addEventListener('resize', onResize);

    return () => {
      mq.removeEventListener('change', setup);
      window.removeEventListener('resize', onResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      ctx?.revert();
    };
  }, [layers.length]);

  return (
    <div ref={rootRef} className={`section-stack section-stack--chain ${className}`.trim()}>
      {layers.map((layer, i) => {
        const isFirst = i === 0;
        const isLast = i === layers.length - 1;
        const role = isFirst ? 'pin' : isLast ? 'cover' : 'mid';
        return (
          <div
            key={i}
            ref={(el) => {
              slotRefs.current[i] = el;
            }}
            className={`section-stack__slot section-stack__slot--${role}`}
            style={{ ['--layer-z' as string]: i + 1 }}
          >
            <div
              ref={(el) => {
                pinRefs.current[i] = el;
              }}
              className="section-stack__pin-target"
            >
              {layer}
            </div>
          </div>
        );
      })}
    </div>
  );
};
