import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverNightSection, setIsOverNightSection] = useState(false);
  const [isOverDarkHero, setIsOverDarkHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Check if header is currently over the night section (#destinations-section)
      const nightEl = document.getElementById('destinations-section');
      if (nightEl) {
        const rect = nightEl.getBoundingClientRect();
        // Header height is ~70px
        const isOver = rect.top <= 65 && rect.bottom >= 65;
        setIsOverNightSection(isOver);
      } else {
        setIsOverNightSection(false);
      }

      // Transparent/light-on-dark while the home hero fills the viewport top
      const heroEl = document.getElementById('hero-section');
      if (heroEl && location.pathname === '/') {
        const rect = heroEl.getBoundingClientRect();
        setIsOverDarkHero(rect.top <= 65 && rect.bottom > 120);
      } else {
        setIsOverDarkHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) menu.removeAttribute('inert');
    else menu.setAttribute('inert', '');
  }, [menuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop?.();
    } else {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start?.();
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start?.();
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const items = menu
      ? Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : [];
    items[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleNavClick = (path: string, targetId?: string) => {
    setMenuOpen(false);

    if (targetId) {
      if (location.pathname !== '/') {
        navigate(`/#${targetId}`);
      } else if (location.hash !== `#${targetId}`) {
        navigate(`/#${targetId}`);
        scrollToSection(targetId);
      } else {
        scrollToSection(targetId);
      }
      return;
    }

    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrent = (path: string, targetId?: string) => {
    if (targetId) {
      return location.pathname === '/' && location.hash === `#${targetId}`;
    }
    return location.pathname === path;
  };

  const useLightOnDark = menuOpen || isOverNightSection || isOverDarkHero;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          menuOpen || isOverNightSection
            ? 'py-2.5 sm:py-3 bg-[#081B3D] border-b border-[#E3C078]/25 text-[#FBFAF6] shadow-[0_4px_25px_rgba(8,27,61,0.35)]'
            : isOverDarkHero
            ? isScrolled
              ? 'py-2.5 sm:py-3 bg-[#081B3D]/90 md:bg-[#081B3D]/75 md:backdrop-blur-md border-b border-[#E3C078]/20 text-[#FBFAF6]'
              : 'py-3.5 sm:py-4 bg-transparent border-b border-transparent text-[#FBFAF6]'
            : isScrolled
            ? 'py-2.5 sm:py-3 bg-[#F4F3EE]/95 md:bg-[#F4F3EE]/80 md:backdrop-blur-sm border-b border-[#E3C078]/30 text-[#0C2A5C] shadow-sm'
            : 'py-3.5 sm:py-4 bg-[#F4F3EE]/95 md:bg-[#F4F3EE]/80 md:backdrop-blur-sm border-b border-[#E3C078]/25 text-[#0C2A5C]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-1.5 sm:gap-3.5 group focus:outline-none text-left min-w-0 flex-1 lg:flex-none overflow-hidden"
            aria-label="Safeer E Aman Home"
          >
            <div className="w-8 h-8 sm:w-11 sm:h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/brand/logo-circle-512-transparent.png"
                alt="Safeer E Aman Emblem"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col leading-tight min-w-0 overflow-hidden">
              <span
                className={`font-editorial-serif tracking-[0.04em] sm:tracking-[0.06em] text-[11px] sm:text-lg md:text-xl font-bold truncate transition-colors duration-300 ${
                  useLightOnDark ? 'text-[#FBFAF6] group-hover:text-[#E3C078]' : 'text-[#0C2A5C] group-hover:text-[#85601B]'
                }`}
              >
                SAFEER E AMAN
              </span>
              <span className="brand-arabic text-[10px] sm:text-base text-[#B58638] truncate">
                سفير الأمان
              </span>
              <span
                className={`hidden 2xl:block text-[12px] font-sans font-medium whitespace-nowrap transition-colors ${
                  useLightOnDark ? 'text-[#E3C078]' : 'text-[#85601B]'
                }`}
              >
                Ethical Visa Advisory & Bespoke Travel
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (visible from lg / 1024px) */}
          <nav
            className={`hidden lg:flex items-center gap-4 xl:gap-7 text-[13px] font-sans font-bold whitespace-nowrap ${
              useLightOnDark ? 'text-[#FBFAF6]/80' : 'text-[#0C2A5C]/80'
            }`}
          >
            <button
              onClick={() => handleNavClick('/', 'hero-section')}
              className={`hover:text-[#B58638] transition-colors py-1 ${
                location.pathname === '/' && (!location.hash || location.hash === '#hero-section')
                  ? 'text-[#B58638] font-bold border-b-2 border-[#B58638]'
                  : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`hover:text-[#B58638] transition-colors py-1 ${
                location.pathname === '/about' ? 'text-[#B58638] font-bold border-b-2 border-[#B58638]' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('/', 'destinations-section')}
              className={`hover:text-[#B58638] transition-colors py-1 ${
                isCurrent('/', 'destinations-section') || location.pathname.startsWith('/destinations')
                  ? 'text-[#B58638] font-bold border-b-2 border-[#B58638]'
                  : ''
              }`}
            >
              Destinations
            </button>
            <button
              onClick={() => handleNavClick('/', 'services-section')}
              className={`hover:text-[#B58638] transition-colors py-1 ${
                isCurrent('/', 'services-section') || location.pathname.startsWith('/services')
                  ? 'text-[#B58638] font-bold border-b-2 border-[#B58638]'
                  : ''
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('/', 'process-section')}
              className={`hover:text-[#B58638] transition-colors py-1 ${
                isCurrent('/', 'process-section') ? 'text-[#B58638] font-bold border-b-2 border-[#B58638]' : ''
              }`}
            >
              Process
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Primary Button CTA: Gold Gradient */}
            <button
              onClick={onOpenConsultation}
              className="px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full btn-gold text-[#0C2A5C] text-[11px] sm:text-[13px] font-sans font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm whitespace-nowrap shrink-0"
            >
              Consultation
            </button>

            {/* Hamburger — hidden on lg+ where all nav links are in the bar */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58638] group p-1"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span
                className={`block h-[2px] transition-all duration-300 ${
                  useLightOnDark ? 'bg-white' : 'bg-[#0C2A5C]'
                } ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6 group-hover:w-7'}`}
              ></span>
              <span
                className={`block h-[2px] transition-all duration-300 ${
                  useLightOnDark ? 'bg-white' : 'bg-[#0C2A5C]'
                } ${menuOpen ? 'opacity-0' : 'w-4 group-hover:w-7'}`}
              ></span>
              <span
                className={`block h-[2px] transition-all duration-300 ${
                  useLightOnDark ? 'bg-white' : 'bg-[#0C2A5C]'
                } ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6 group-hover:w-7'}`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation Overlay */}
      <div
        ref={menuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={menuOpen ? undefined : true}
        className={`fixed inset-0 z-[45] flex flex-col overflow-y-auto transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#081B3D' }}
      >
        <nav className="flex-1 max-w-xl mx-auto w-full px-5 sm:px-10 pt-24 sm:pt-28 pb-10 flex flex-col">
          {[
            { label: 'Home', path: '/', targetId: 'hero-section' },
            { label: 'About', path: '/about' },
            { label: 'Destinations', path: '/', targetId: 'destinations-section' },
            { label: 'Services', path: '/', targetId: 'services-section' },
            { label: 'How it works', path: '/', targetId: 'process-section' },
            { label: 'Privacy', path: '/privacy' },
            { label: 'Terms', path: '/terms' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path, item.targetId)}
              className="text-left group flex items-center gap-4 py-3 sm:py-3.5 border-b border-white/10 hover:border-[#E3C078]/40 transition-colors"
            >
              <span className="flex-1 font-editorial-serif text-[22px] sm:text-[28px] leading-none font-semibold text-[#FBFAF6] group-hover:text-[#E3C078] transition-colors">
                {item.label}
              </span>
              <ArrowUpRight className="w-5 h-5 text-[#E3C078] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
