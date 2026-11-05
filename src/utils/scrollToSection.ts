const HEADER_OFFSET = -88;

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

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.15 });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
};
