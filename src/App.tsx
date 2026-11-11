import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { HeroCinematic, HeroFeatureCards } from './components/HeroCinematic';
import { StackedScrollPair } from './components/StackedScrollPair';
import { SectionCoverChain } from './components/SectionCoverStack';
import { MaterialLab } from './components/MaterialLab';
import { CompactDestinations } from './components/CompactDestinations';
import { TravelProcess } from './components/TravelProcess';
import { PrivateConcierge } from './components/PrivateConcierge';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { VIPInquiryModal } from './components/VIPInquiryModal';
import { usePageMeta } from './hooks/usePageMeta';
import { useScrollReveal } from './hooks/useScrollReveal';
import { scrollToSection, scrollToTop } from './utils/scrollToSection';

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const ServiceDetailPage = lazy(() =>
  import('./pages/services/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const VisaConsultancyPage = lazy(() =>
  import('./pages/services/IndividualServicePages').then((m) => ({ default: m.VisaConsultancyPage }))
);
const VisitVisaPage = lazy(() =>
  import('./pages/services/IndividualServicePages').then((m) => ({ default: m.VisitVisaPage }))
);
const BusinessVisaPage = lazy(() =>
  import('./pages/services/IndividualServicePages').then((m) => ({ default: m.BusinessVisaPage }))
);
const StudyVisaPage = lazy(() =>
  import('./pages/services/IndividualServicePages').then((m) => ({ default: m.StudyVisaPage }))
);
const WorkVisaPage = lazy(() =>
  import('./pages/services/IndividualServicePages').then((m) => ({ default: m.WorkVisaPage }))
);
const DocumentationPage = lazy(() =>
  import('./pages/services/IndividualServicePages').then((m) => ({ default: m.DocumentationPage }))
);
const UmrahPage = lazy(() => import('./pages/services/IndividualServicePages').then((m) => ({ default: m.UmrahPage })));
const FlightsPage = lazy(() =>
  import('./pages/services/IndividualServicePages').then((m) => ({ default: m.FlightsPage }))
);
const AccommodationPage = lazy(() =>
  import('./pages/services/IndividualServicePages').then((m) => ({ default: m.AccommodationPage }))
);
const DestinationDetailPage = lazy(() =>
  import('./pages/destinations/DestinationDetailPage').then((m) => ({ default: m.DestinationDetailPage }))
);
const UmrahDestinationPage = lazy(() =>
  import('./pages/destinations/IndividualDestinationPages').then((m) => ({ default: m.UmrahDestinationPage }))
);
const HajjPage = lazy(() =>
  import('./pages/destinations/IndividualDestinationPages').then((m) => ({ default: m.HajjPage }))
);
const TurkeyPage = lazy(() =>
  import('./pages/destinations/IndividualDestinationPages').then((m) => ({ default: m.TurkeyPage }))
);
const UKPage = lazy(() =>
  import('./pages/destinations/IndividualDestinationPages').then((m) => ({ default: m.UKPage }))
);
const SchengenPage = lazy(() =>
  import('./pages/destinations/IndividualDestinationPages').then((m) => ({ default: m.SchengenPage }))
);
const SaudiArabiaPage = lazy(() =>
  import('./pages/destinations/IndividualDestinationPages').then((m) => ({ default: m.SaudiArabiaPage }))
);

gsap.registerPlugin(ScrollTrigger);

// Scroll restoration helper on route transition
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      scrollToTop(true);
    }
  }, [pathname, hash]);

  return null;
};

// Home View Component
interface HomeViewProps {
  onCheckEligibility: (params: { destination: string; service: string; travellers: number; date: string }) => void;
  inquiryService: string;
}

const HomeView: React.FC<HomeViewProps> = ({
  onCheckEligibility,
  inquiryService,
}) => {
  usePageMeta({
    title: 'Safeer E Aman | Visa Consultant in Lahore',
    description:
      'Visa consultancy in Lahore for Turkey, the UK, Schengen, Umrah, and Hajj — file review, live bookings, WhatsApp intake. We prepare the case; the embassy decides.',
    path: '/',
  });

  const scrollTo = (id: string) => {
    scrollToSection(id);
  };

  const homeLower = (
    <SectionCoverChain
      layers={[
        <MaterialLab
          key="services"
          onSelectService={() => {}}
          topOverlay={<HeroFeatureCards />}
        />,
        <CompactDestinations key="destinations" />,
        <TravelProcess key="process" />,
        <PrivateConcierge key="contact" prefilledService={inquiryService} />,
        <Footer key="footer" />,
      ]}
    />
  );

  return (
    <StackedScrollPair
      upper={
        <HeroCinematic
          showFeatureCards={false}
          onExploreDestinations={() => scrollTo('destinations-section')}
          onExploreServices={() => scrollTo('services-section')}
          onCheckEligibility={onCheckEligibility}
        />
      }
      lower={homeLower}
    />
  );
};

export const App: React.FC = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [inquiryService, setInquiryService] = useState<string>('Visa Consultancy');
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  useScrollReveal();

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.65,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(updateTicker);
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as never);
      if (window.__lenis === lenis) window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  // Handle hash scrolling on page load
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(targetId);
      }, 200);
    }
  }, [location]);

  const handleCheckEligibility = (params: {
    destination: string;
    service: string;
    travellers: number;
    date: string;
  }) => {
    setInquiryService(`${params.service} for ${params.destination} (${params.travellers} Guest${params.travellers > 1 ? 's' : ''})`);
    scrollToSection('contact-section');
  };

  return (
    <div className="relative min-h-screen bg-[#F4F3EE] text-[#0C2A5C] selection:bg-[#E3C078]/40 selection:text-[#0C2A5C]">
      <ScrollToTop />

      {/* Global Navigation Header */}
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Routed Content */}
      <main className="relative z-10 w-full overflow-x-clip overflow-y-visible">
        <Suspense fallback={<div className="min-h-screen bg-[#F4F3EE]" aria-hidden="true" />}>
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                onCheckEligibility={handleCheckEligibility}
                inquiryService={inquiryService}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Dynamic Service Routes */}
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/services/visa-consultancy" element={<VisaConsultancyPage />} />
          <Route path="/services/visit-visa" element={<VisitVisaPage />} />
          <Route path="/services/business-visa" element={<BusinessVisaPage />} />
          <Route path="/services/study-visa" element={<StudyVisaPage />} />
          <Route path="/services/work-visa" element={<WorkVisaPage />} />
          <Route path="/services/documentation" element={<DocumentationPage />} />
          <Route path="/services/umrah" element={<UmrahPage />} />
          <Route path="/services/flights" element={<FlightsPage />} />
          <Route path="/services/accommodation" element={<AccommodationPage />} />

          {/* Dynamic Destination Routes */}
          <Route path="/destinations/:id" element={<DestinationDetailPage />} />
          <Route path="/destinations/umrah" element={<UmrahDestinationPage />} />
          <Route path="/destinations/hajj" element={<HajjPage />} />
          <Route path="/destinations/turkey" element={<TurkeyPage />} />
          <Route path="/destinations/united-kingdom" element={<UKPage />} />
          <Route path="/destinations/schengen" element={<SchengenPage />} />
          <Route path="/destinations/saudi-arabia" element={<SaudiArabiaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </main>

      <WhatsAppFloat />

      <VIPInquiryModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
};

export default App;
