const HEADER_OFFSET = -88;
/** Land just past cover completion so the previous pin has released. */
const COVER_SETTLE_OFFSET = 12;

type LenisLike = {
  scrollTo: (
    target: HTMLElement | number,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void;
  stop?: () => void;
  start?: () => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

export const scrollToTop = (immediate = true) => {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate, duration: immediate ? 0 : 1.15 });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'auto' : 'smooth' });
};

/**
 * Cover-chain pull slots must land AFTER the previous section's pin finishes.
 * HEADER_OFFSET alone stops mid-cover, so further wheel input only drives the
 * cover animation — felt like scroll was broken on contact-section.
 */
const offsetFor = (el: HTMLElement) => {
  const isCover = el.closest('.section-stack__slot--pull');
  return isCover ? COVER_SETTLE_OFFSET : HEADER_OFFSET;
};

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = offsetFor(el);

  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset, duration: 1.15 });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
};
