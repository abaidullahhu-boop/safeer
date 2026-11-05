import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, GraduationCap, FolderCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

const HeroGlobe = lazy(() => import('./HeroGlobe').then((m) => ({ default: m.HeroGlobe })));

const HeroGlobeLazy: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fine && wide && !reduce) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <HeroGlobe />
    </Suspense>
  );
};

interface HeroCinematicProps {
  onExploreDestinations: () => void;
  onExploreServices: () => void;
  onCheckEligibility?: (params: { destination: string; service: string; travellers: number; date: string }) => void;
}

const FEATURE_CARDS = [
  {
    kicker: 'Visit · Business · Family',
    title: 'Visa Consultancy',
    description: 'Embassy-aligned checklists and file review from Lahore.',
    icon: FileText,
    href: '/services/visa-consultancy',
  },
  {
    kicker: 'After your offer',
    title: 'Study Visa',
    description: 'CAS, funds timeline, and SOP checks before you file.',
    icon: GraduationCap,
    href: '/services/study-visa',
  },
  {
    kicker: 'No visa guarantee',
    title: 'File Preparation',
    description: 'Indexed dossiers. We prepare — the embassy decides.',
    icon: FolderCheck,
    href: '/services/documentation',
  },
] as const;

const makeStar = (i: number, left: number, top: number) => {
  const seed = i * 17.31;
  const rand = (offset: number) => {
    const x = Math.sin(seed + offset) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: `${left}%`,
    top: `${top}%`,
    size: rand(3) > 0.82 ? 2.2 : rand(3) > 0.5 ? 1.5 : 1.05,
    duration: `${3.8 + rand(4) * 4.4}s`,
    delay: `${rand(5) * -6}s`,
    opacity: 0.4 + rand(6) * 0.5,
  };
};

const SPACE_STARS = [
  ...Array.from({ length: 20 }, (_, i) => {
    const seed = i * 11.7;
    const rx = Math.sin(seed) * 43758.5453;
    const ry = Math.sin(seed + 2.1) * 43758.5453;
    const left = (rx - Math.floor(rx)) * 96 + 2;
    const top = (ry - Math.floor(ry)) * 16 + 2;
    return makeStar(i, left, top);
  }),
  ...Array.from({ length: 16 }, (_, i) => {
    const seed = (i + 40) * 13.4;
    const rx = Math.sin(seed) * 43758.5453;
    const ry = Math.sin(seed + 3.3) * 43758.5453;
    const left = (rx - Math.floor(rx)) * 11 + 1;
    const top = (ry - Math.floor(ry)) * 42 + 10;
    return makeStar(i + 40, left, top);
  }),
  ...Array.from({ length: 16 }, (_, i) => {
    const seed = (i + 80) * 15.2;
    const rx = Math.sin(seed) * 43758.5453;
    const ry = Math.sin(seed + 4.6) * 43758.5453;
    const left = (rx - Math.floor(rx)) * 11 + 88;
    const top = (ry - Math.floor(ry)) * 42 + 10;
    return makeStar(i + 80, left, top);
  }),
  ...Array.from({ length: 14 }, (_, i) => {
    const seed = (i + 120) * 12.8;
    const rx = Math.sin(seed) * 43758.5453;
    const ry = Math.sin(seed + 1.9) * 43758.5453;
    const left = (rx - Math.floor(rx)) * 12 + 1;
    const top = (ry - Math.floor(ry)) * 22 + 64;
    return makeStar(i + 120, left, top);
  }),
  ...Array.from({ length: 14 }, (_, i) => {
    const seed = (i + 160) * 14.1;
    const rx = Math.sin(seed) * 43758.5453;
    const ry = Math.sin(seed + 2.8) * 43758.5453;
    const left = (rx - Math.floor(rx)) * 12 + 87;
    const top = (ry - Math.floor(ry)) * 22 + 64;
    return makeStar(i + 160, left, top);
  }),
];

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  onExploreDestinations,
  onExploreServices,
}) => {
  const navigate = useNavigate();

  return (
    <section
      id="hero-section"
      className="relative w-full select-none"
    >
      {/* Full-bleed photo plane */}
      <div className="relative min-h-[62vh] md:min-h-[68vh] overflow-hidden flex flex-col">
        <div className="absolute inset-0 z-0 bg-[#061428]">
          <HeroGlobeLazy />
          <div className="hero-stars" aria-hidden="true">
            {SPACE_STARS.map((star, i) => (
              <span
                key={i}
                className="hero-star"
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                  ['--star-duration' as string]: star.duration,
                  ['--star-delay' as string]: star.delay,
                }}
              />
            ))}
            <svg
              className="hero-mini-planes"
              viewBox="0 0 1440 720"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <path id="hero-plane-path-a" d="M 30 168 C 380 132, 980 138, 1410 175" />
                <path id="hero-plane-path-b" d="M 1425 210 C 1288 330, 1310 510, 1395 655" />
                <path id="hero-plane-path-c" d="M 18 210 C 155 330, 130 510, 48 655" />
                <path
                  id="hero-plane-mark"
                  d="M-8 0 C-7.3 -0.3 -5 -0.8 -2.8 -0.85 L-1.1 -0.85 L-4.5 -5.8 L-3.2 -5.8 L1.3 -0.85 L4.4 -0.85 C6 -0.85 7.3 -0.35 8.1 0 C7.3 0.35 6 0.85 4.4 0.85 L1.3 0.85 L-3.2 5.8 L-4.5 5.8 L-1.1 0.85 L-2.8 0.85 C-5 0.8 -7.3 0.3 -8 0 Z"
                />
              </defs>
              <g className="hero-mini-plane" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.45" strokeLinejoin="round">
                <use href="#hero-plane-mark" />
                <animateMotion dur="26s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#hero-plane-path-a" />
                </animateMotion>
              </g>
              <g className="hero-mini-plane" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.45" strokeLinejoin="round">
                <use href="#hero-plane-mark" />
                <animateMotion dur="32s" begin="-14s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#hero-plane-path-b" />
                </animateMotion>
              </g>
              <g className="hero-mini-plane" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.45" strokeLinejoin="round">
                <use href="#hero-plane-mark" />
                <animateMotion dur="30s" begin="-8s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#hero-plane-path-c" />
                </animateMotion>
              </g>
            </svg>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,20,40,0.7) 0%, rgba(6,20,40,0.58) 32%, rgba(6,20,40,0.5) 50%, rgba(6,20,40,0.82) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(52% 46% at 50% 38%, rgba(4,14,32,0.72), transparent 74%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(55% 48% at 50% 42%, rgba(62,191,210,0.12), transparent 70%), radial-gradient(70% 55% at 50% 40%, rgba(181,134,56,0.08), transparent 72%)',
            }}
          />
        </div>

        {/* Centered hero copy */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-24 sm:pt-28 pb-28 sm:pb-32">
          <div className="reveal-text w-full max-w-3xl mx-auto flex flex-col items-center">
            <p className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-[#F0D28A] mb-4 sm:mb-5 drop-shadow-[0_2px_10px_rgba(4,14,32,0.95)]">
              Visa consultancy · Lahore
            </p>

            <h1 className="font-editorial-serif text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-[1.12] tracking-tight text-[#FBFAF6] max-w-3xl drop-shadow-[0_2px_16px_rgba(4,14,32,0.9)]">
              Safeer E Aman
            </h1>
            <p className="mt-3 sm:mt-4 font-sans text-lg sm:text-2xl md:text-[1.75rem] font-extrabold leading-snug text-[#FBFAF6] max-w-2xl drop-shadow-[0_2px_14px_rgba(4,14,32,0.9)]">
              We prepare the file. The embassy decides.
            </p>

            <p className="mt-4 sm:mt-5 font-sans text-sm sm:text-base text-[#FBFAF6] leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(4,14,32,0.95)]">
              Turkey, UK, Schengen, Umrah, and Hajj — checklists, live PNRs, hotel vouchers, and
              WhatsApp intake. Send the case; we say if it is ready to file.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.12em]"
              >
                WhatsApp us
              </a>
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center px-7 sm:px-9 py-3 sm:py-3.5 rounded-full border border-white/70 text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.12em] bg-transparent hover:bg-white/10 hover:border-[#E3C078] transition-all duration-250"
              >
                See services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping feature cards */}
      <div className="relative z-20 -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-6 md:px-12 pointer-events-none">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pointer-events-auto">
          {FEATURE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.href)}
                className="reveal-card group flex flex-col items-center text-center rounded-xl bg-[#FBFAF6] border border-[#E3C078]/30 px-4 py-4 sm:px-5 sm:py-[18px] shadow-[0_10px_28px_rgba(12,42,92,0.12)] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(12,42,92,0.18)] hover:border-[#B58638]/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F6E2A8]/50 border border-[#E3C078]/40 flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px] text-[#B58638]" strokeWidth={1.85} />
                </div>
                <p className="mt-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#B58638]">
                  {card.kicker}
                </p>
                <h3 className="mt-1 font-sans text-sm sm:text-[15px] font-extrabold text-[#0C2A5C] tracking-tight leading-none">
                  {card.title}
                </h3>
                <p className="mt-1.5 font-sans text-[11px] sm:text-xs text-[#0C2A5C]/65 leading-snug line-clamp-2">
                  {card.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer so next section clears the overlapping cards */}
      <div className="h-6 sm:h-8 md:h-10 bg-transparent" aria-hidden="true" />

      {/* Destinations quick path kept accessible for header anchors */}
      <button
        type="button"
        className="sr-only"
        onClick={onExploreDestinations}
        aria-label="Explore destinations"
      />
    </section>
  );
};
