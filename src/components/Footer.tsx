import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Bird,
  Compass,
  Briefcase,
  GraduationCap,
  FileText,
  BriefcaseBusiness,
  Moon,
  Ticket,
  Landmark,
  Flag,
  Globe2,
  Building2,
  Info,
  Mail,
  Shield,
  Scale,
  Users,
  Plane,
  type LucideIcon,
} from 'lucide-react';
import { BUSINESS_INFO, TRAVEL_SERVICES, FEATURED_DESTINATIONS } from '../data/travelData';
import { scrollToSection } from '../utils/scrollToSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'visa-consultancy': Compass,
  'business-visa': Briefcase,
  'study-work-visa': GraduationCap,
  'work-visa': BriefcaseBusiness,
  'family-visa': Users,
  'transit-visa': Plane,
  'visa-documentation': FileText,
  umrah: Moon,
  'flight-ticketing': Ticket,
};

const DESTINATION_ICONS: Record<string, LucideIcon> = {
  umrah: Moon,
  hajj: Building2,
  turkey: Landmark,
  'united-kingdom': Flag,
  schengen: Globe2,
  'saudi-arabia': Building2,
};

const FOOTER_SERVICES = TRAVEL_SERVICES.filter(
  (svc) =>
    svc.id !== 'visit-visa' &&
    svc.id !== 'visa-refusal' &&
    svc.id !== 'appointment-biometrics' &&
    svc.id !== 'accommodation'
);

const FooterNavLink: React.FC<{
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}> = ({ icon: Icon, label, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className="group flex items-center gap-2.5 text-left text-[13.5px] font-medium text-white/72 hover:text-[#F6E2A8] transition-colors duration-300"
    >
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 group-hover:border-[#E3C078]/50 group-hover:bg-[#E3C078]/10 transition-colors duration-300">
        <Icon className="h-3.5 w-3.5 text-[#E3C078]" />
      </span>
      <span className="leading-snug">{label}</span>
    </button>
  </li>
);

const ColumnHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-5 flex items-center gap-2.5 text-[11px] font-sans font-bold text-[#E3C078] uppercase tracking-[0.18em]">
    <span className="h-px w-5 bg-[#E3C078]/70" />
    {children}
  </h3>
);

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mastheadRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (path: string, targetId?: string) => {
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

  useEffect(() => {
    const el = mastheadRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(
          el,
          { backgroundPosition: '-200% 0' },
          { backgroundPosition: '200% 0', duration: 2.2, ease: 'power2.out' }
        );
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden section-night text-[#FBFAF6] cover-surface"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(227, 192, 120, 0.65), transparent)' }}
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(227, 192, 120, 0.18), transparent 68%)' }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-end justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <div
          ref={mastheadRef}
          className="font-editorial-serif font-semibold uppercase whitespace-nowrap leading-none tracking-[0.04em] pb-2 md:pb-3"
          style={{
            fontSize: 'min(9.5rem, calc((100vw - 2.75rem) / 8.85))',
            backgroundImage:
              'linear-gradient(110deg, #F6E2A8 0%, #E3C078 25%, #FFFFFF 50%, #B58638 75%, #F6E2A8 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0.09,
          }}
        >
          SAFEER E AMAN
        </div>
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-14 pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12">
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => handleLink('/')}
              className="flex items-center gap-3.5 text-left focus:outline-none group"
            >
              <div className="w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/brand/logo-circle-512-transparent.png"
                  alt="Safeer E Aman Seal"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className="block font-editorial-serif tracking-[0.06em] text-2xl font-bold text-[#FBFAF6]">
                  SAFEER E AMAN
                </span>
                <span className="brand-arabic text-xl">سفير الأمان</span>
                <span className="block text-[12px] font-sans text-[#E3C078] font-medium mt-0.5">
                  Visa files from Lahore — no guarantees
                </span>
              </div>
            </button>

            <p className="text-[14px] text-white/70 font-sans leading-relaxed max-w-md">
              Independent visa desk in Bata Pur, Lahore. Turkey, UK, Schengen, Umrah, and Hajj files
              — checklists, live bookings, WhatsApp intake. We prepare the case; the embassy decides.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 space-y-3.5">
              <div className="flex items-start gap-3 text-[13px] text-white/78">
                <MapPin className="w-4 h-4 text-[#E3C078] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-white/78">
                <Phone className="w-4 h-4 text-[#E3C078] flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="text-white font-medium hover:text-[#E3C078] transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-white/78">
                <Mail className="w-4 h-4 text-[#E3C078] flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#E3C078] transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-white/78">
                <Clock className="w-4 h-4 text-[#E3C078] flex-shrink-0" />
                <span>{BUSINESS_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <ColumnHeading>Travel & Visa Services</ColumnHeading>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
              {FOOTER_SERVICES.map((svc) => (
                <FooterNavLink
                  key={svc.id}
                  icon={SERVICE_ICONS[svc.id] ?? Compass}
                  label={svc.id === 'visa-consultancy' ? 'Visa Consultancy & Visit Visa' : svc.title}
                  onClick={() => handleLink(`/services/${svc.id}`)}
                />
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <ColumnHeading>Destinations</ColumnHeading>
            <ul className="space-y-2.5">
              {FEATURED_DESTINATIONS.map((dest) => (
                <FooterNavLink
                  key={dest.id}
                  icon={DESTINATION_ICONS[dest.id] ?? Globe2}
                  label={dest.name}
                  onClick={() => handleLink(`/destinations/${dest.id}`)}
                />
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <ColumnHeading>Company</ColumnHeading>
            <ul className="space-y-2.5">
              <FooterNavLink icon={Info} label="About Us" onClick={() => handleLink('/about')} />
              <FooterNavLink icon={Mail} label="Lahore Office" onClick={() => handleLink('/', 'contact-section')} />
              <FooterNavLink icon={Shield} label="Privacy Policy" onClick={() => handleLink('/privacy')} />
              <FooterNavLink icon={Scale} label="Terms & Disclaimer" onClick={() => handleLink('/terms')} />
            </ul>
          </div>
        </div>

        <div className="relative z-10 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-white/55 gap-4">
          <p>&copy; {new Date().getFullYear()} Safeer E Aman Travel Consultancy. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={() => handleLink('/privacy')} className="hover:text-[#E3C078] transition-colors">
              Privacy
            </button>
            <button onClick={() => handleLink('/terms')} className="hover:text-[#E3C078] transition-colors">
              Terms
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-full border border-[#E3C078]/40 px-3.5 py-1.5 text-[11px] font-semibold text-[#E3C078] hover:bg-[#E3C078]/10 transition-colors group"
            >
              Back to Top
              <Bird className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
