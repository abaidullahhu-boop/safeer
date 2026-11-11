import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TravelService } from '../types';
import { TRAVEL_SERVICES } from '../data/travelData';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

interface MaterialLabProps {
  onSelectService: (service: TravelService) => void;
  /** Renders on the section top edge so it can straddle hero + services without a second bg strip */
  topOverlay?: React.ReactNode;
}

const HOME_SERVICE_ORDER = [
  'visit-visa',
  'business-visa',
  'study-work-visa',
  'umrah',
  'work-visa',
  'family-visa',
  'transit-visa',
  'visa-refusal',
  'appointment-biometrics',
  'visa-consultancy',
  'visa-documentation',
  'flight-ticketing',
  'accommodation',
] as const;

const VISIBLE_COUNT = 4;

const serviceImages: Record<string, string> = {
  'visa-consultancy': '/images/visa-consultancy.jpg',
  'visit-visa': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=70',
  'business-visa': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=70',
  'study-work-visa': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=70',
  'work-visa': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=70',
  'family-visa': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=70',
  'transit-visa': '/images/transit-airport.jpg',
  'visa-refusal': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=70',
  'appointment-biometrics': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=70',
  'visa-documentation': 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=70',
  umrah: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=400&q=70',
  'flight-ticketing': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=70',
  accommodation: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=70',
};

const SERVICE_PATH: Record<string, string> = {
  'study-work-visa': '/services/study-visa',
  'visa-documentation': '/services/documentation',
  'flight-ticketing': '/services/flights',
};

const ServiceRow: React.FC<{
  service: TravelService;
  index: number;
  isHovered: boolean;
  onHover: (service: TravelService | null) => void;
  onOpen: (service: TravelService) => void;
  reveal?: boolean;
  delayMs?: number;
}> = ({ service, index, isHovered, onHover, onOpen, reveal = true, delayMs = 0 }) => (
  <div
    onMouseEnter={() => onHover(service)}
    onMouseLeave={() => onHover(null)}
    onClick={() => onOpen(service)}
    style={{ transitionDelay: `${delayMs}ms` }}
    className={`group relative py-5 sm:py-6 cursor-pointer grid grid-cols-[auto_1fr] lg:grid-cols-[48px_minmax(0,1.15fr)_minmax(0,1fr)_auto] items-center gap-x-4 sm:gap-x-6 gap-y-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
      reveal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
    }`}
  >
    <span
      className={`hidden lg:block text-[11px] font-sans font-extrabold tracking-widest transition-colors duration-300 ${
        isHovered ? 'text-[#B58638]' : 'text-[#85601B]/70'
      }`}
    >
      {String(index + 1).padStart(2, '0')}
      <span className="ml-0.5 opacity-50">//</span>
    </span>

    <div className="flex items-center gap-3 sm:gap-4 min-w-0 col-span-2 lg:col-span-1">
      <span
        className={`lg:hidden shrink-0 text-[11px] font-sans font-extrabold tracking-widest ${
          isHovered ? 'text-[#B58638]' : 'text-[#85601B]/70'
        }`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div
        className={`relative shrink-0 overflow-hidden rounded-xl border border-[#E3C078]/40 shadow-[0_10px_30px_rgba(12,42,92,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isHovered
            ? 'w-[108px] h-[72px] sm:w-[132px] sm:h-[88px] rotate-[-2deg] scale-100'
            : 'w-[72px] h-[52px] sm:w-[88px] sm:h-[64px] rotate-0'
        }`}
      >
        <img
          src={serviceImages[service.id] || serviceImages['visa-consultancy']}
          alt=""
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2A5C]/35 to-transparent pointer-events-none" />
      </div>

      <div className="min-w-0">
        <h3
          className={`font-sans text-xl sm:text-2xl font-extrabold tracking-tight truncate transition-colors duration-300 ${
            isHovered ? 'text-[#85601B]' : 'text-[#0C2A5C]'
          }`}
        >
          {service.title}
        </h3>
        <p className="text-[11px] sm:text-xs font-medium text-[#85601B] mt-0.5 truncate">
          &ldquo;{service.tagline}&rdquo;
        </p>
      </div>
    </div>

    <p className="hidden lg:block text-[14px] text-[#0C2A5C]/75 font-sans leading-relaxed line-clamp-2 pr-4">
      {service.summary}
    </p>

    <div className="col-span-2 lg:col-span-1 flex items-center justify-between lg:justify-end gap-3 pl-[52px] sm:pl-[72px] lg:pl-0">
      <p className="lg:hidden text-xs text-[#0C2A5C]/70 font-sans leading-relaxed line-clamp-2 flex-1 pr-2">
        {service.summary}
      </p>
      <span className="shrink-0 text-[12px] font-sans font-semibold text-[#0C2A5C] bg-white/80 border border-[#E3C078]/40 px-3 py-1 rounded-full group-hover:border-[#B58638] group-hover:bg-white transition-colors">
        {service.category}
      </span>
      <div
        className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'bg-[#B58638] border-[#B58638] text-white translate-x-0.5 -translate-y-0.5 shadow-md'
            : 'bg-white/80 border-[#E3C078]/50 text-[#0C2A5C]'
        }`}
      >
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  </div>
);

export const MaterialLab: React.FC<MaterialLabProps> = ({ onSelectService, topOverlay }) => {
  const navigate = useNavigate();
  const orderedServices = HOME_SERVICE_ORDER.map((id) => TRAVEL_SERVICES.find((s) => s.id === id)).filter(
    (s): s is TravelService => Boolean(s)
  );
  const visibleServices = orderedServices.slice(0, VISIBLE_COUNT);
  const extraServices = orderedServices.slice(VISIBLE_COUNT);
  const [showAll, setShowAll] = useState(false);
  const [hoveredService, setHoveredService] = useState<TravelService | null>(null);

  const openService = (service: TravelService) => {
    onSelectService(service);
    navigate(SERVICE_PATH[service.id] || `/services/${service.id}`);
  };

  return (
    <section
      id="services-section"
      className={`relative w-full pb-24 md:pb-32 text-[#0C2A5C] select-none overflow-x-clip overflow-y-visible rounded-t-[1.75rem] sm:rounded-t-[2rem] shadow-[0_-16px_48px_rgba(6,20,40,0.14)] ${
        topOverlay ? 'pt-28 sm:pt-32 md:pt-36' : 'pt-16 md:pt-20'
      }`}
      style={{
        background: 'linear-gradient(160deg, #FBF7EA 0%, #F6E7BE 42%, #D6F1F5 100%)',
      }}
    >
      {topOverlay ? (
        <div className="absolute inset-x-0 top-0 z-20 -translate-y-8 max-md:relative max-md:translate-y-0 max-md:pt-4">
          {topOverlay}
        </div>
      ) : null}

      <div className="animated-mesh-bg opacity-40">
        <div className="mesh-blob mesh-blob-gold" />
        <div className="mesh-blob mesh-blob-aqua" />
        <div className="mesh-blob mesh-blob-pearl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E3C078]/35">
          <div className="max-w-[800px] reveal-text">
            <div className="mb-2">
              <span className="tag-gold">
                <span className="w-2 h-2 rounded-full bg-[#B58638]" />
                <span>02 — Services</span>
              </span>
            </div>
            <h2
              className="font-sans font-extrabold tracking-tight text-[#0C2A5C]"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                lineHeight: 1.15,
                marginBottom: '15px',
              }}
            >
              Visa, Umrah, flights,{' '}
              <span className="text-[#85601B]">stays.</span>
            </h2>
          </div>

          <p className="reveal-text text-[15px] text-[#0C2A5C]/75 font-sans max-w-md leading-relaxed">
            Visit, study, work, Umrah, tickets, and hotel vouchers. Four services show first; open the rest if you need refusal review, transit, or biometrics.
          </p>
        </div>

        <div className="divide-y divide-[#E3C078]/30 mt-2">
          {visibleServices.map((service, idx) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={idx}
              isHovered={hoveredService?.id === service.id}
              onHover={setHoveredService}
              onOpen={openService}
            />
          ))}
        </div>

        {extraServices.length > 0 && (
          <div
            className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              showAll ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="divide-y divide-[#E3C078]/30 border-t border-[#E3C078]/30">
                {extraServices.map((service, idx) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    index={VISIBLE_COUNT + idx}
                    isHovered={hoveredService?.id === service.id}
                    onHover={setHoveredService}
                    onOpen={openService}
                    reveal={showAll}
                    delayMs={showAll ? idx * 55 : 0}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {extraServices.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((open) => !open)}
              className="inline-flex items-center gap-2 rounded-full border border-[#E3C078]/60 bg-white/70 px-6 py-3 text-sm font-sans font-extrabold text-[#0C2A5C] hover:bg-white hover:border-[#B58638] transition-colors duration-300"
              aria-expanded={showAll}
            >
              {showAll ? 'View less' : `View more (${extraServices.length} more)`}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  showAll ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
