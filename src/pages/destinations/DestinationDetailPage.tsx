import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { ALL_DESTINATIONS, FEATURED_DESTINATIONS, BUSINESS_INFO } from '../../data/travelData';
import { PageHero } from '../../components/shared/PageHero';
import { FAQ, FAQItem } from '../../components/shared/FAQ';
import { EnquirySection } from '../../components/shared/EnquirySection';
import { RelatedLinks } from '../../components/shared/RelatedLinks';
import { SolenneBookingBar } from '../../components/SolenneBookingBar';
import { Plane, Compass, CheckCircle2, ShieldAlert, MapPin, MessageCircle } from 'lucide-react';

const DESTINATION_FAQS: Record<string, FAQItem[]> = {
  turkey: [
    {
      question: 'Can Pakistani passport holders apply for a Turkish e-Visa?',
      answer: 'Pakistani passport holders possessing a valid, used or unused visa or residence permit from a Schengen country, USA, UK, or Ireland are eligible to apply for an official 30-day single-entry Turkish e-Visa. Otherwise, a regular sticker visa application must be submitted through the designated visa processing center.',
    },
    {
      question: 'What is the standard processing time for Turkey sticker visas?',
      answer: 'Sticker visa applications generally take between 10 to 15 working days following biometric submission at the visa center.',
    },
    {
      question: 'Is travel health insurance mandatory for Turkey?',
      answer: 'Yes. The Turkish Embassy mandates approved travel health insurance covering emergency medical expenses for the full duration of your trip.',
    },
  ],
  'united-kingdom': [
    {
      question: 'How long can I stay on a UK Standard Visitor Visa?',
      answer: 'Standard Visitor Visas are typically granted for up to 6 months per visit. Multiple-entry visas valid for 2, 5, or 10 years are also available, though each individual stay must not exceed 180 days.',
    },
    {
      question: 'What are the main reasons UK visitor visas are refused?',
      answer: 'Common refusal grounds include unclear source of funds, sudden unexplained bank deposits, lack of strong socio-economic ties to Pakistan, and vague travel purposes. We focus on addressing all of these factors clearly in your cover letter and financial documentation.',
    },
    {
      question: 'Can I switch from a visitor visa to a work or study visa inside the UK?',
      answer: 'No. Under UK immigration rules, you cannot switch from a Standard Visitor Visa to a work or student route from within the UK.',
    },
  ],
  schengen: [
    {
      question: 'Which Schengen country should I apply to?',
      answer: 'You must apply to the embassy of the country that is your primary destination (where you will spend the greatest number of days). If visiting multiple countries with equal duration, you apply to the country of first entry into the Schengen zone.',
    },
    {
      question: 'What insurance is required for Schengen visas?',
      answer: 'You must provide travel medical insurance with a minimum coverage of €30,000 valid across all 29 Schengen member states, covering medical emergencies and repatriation.',
    },
    {
      question: 'How far in advance can I apply for a Schengen visa?',
      answer: 'You can submit your application up to 6 months prior to your intended date of travel, and no later than 15 calendar days before departure.',
    },
  ],
  'saudi-arabia': [
    {
      question: 'What is the validity of a Saudi Umrah visa?',
      answer: 'Umrah visas are typically valid for 90 days from issuance and allow a stay of up to 90 days within the Kingdom for performing Umrah and visiting holy sites.',
    },
    {
      question: 'Can women perform Umrah without a Mahram?',
      answer: 'Under current Saudi Ministry regulations, women are permitted to perform Umrah without a male guardian (Mahram) subject to standard visa criteria.',
    },
    {
      question: 'Do you arrange Haramain High-Speed Train bookings?',
      answer: 'Yes. We assist with booking the Haramain High-Speed Rail connecting Jeddah Airport, Makkah, and Madinah for rapid and comfortable pilgrimage travel.',
    },
  ],
};

DESTINATION_FAQS.umrah = DESTINATION_FAQS['saudi-arabia'];
DESTINATION_FAQS.hajj = [
  {
    question: 'Do you guarantee a Hajj seat or visa?',
    answer: 'No. Hajj is quota-based. Registration, lottery or allocation, and Saudi issuance sit with official authorities. We only guide documents, timelines, and bookings after your status is clear.',
  },
  {
    question: 'When should Pakistani pilgrims start a Hajj file?',
    answer: 'Watch the official Ministry of Religious Affairs / Nusuk Hajj window each season. Passports, vaccinations, and bank proofs should be ready before the portal opens — not after.',
  },
  {
    question: 'Is Hajj the same file as Umrah?',
    answer: 'No. Umrah can run through the year with tourist or Umrah visas. Hajj has a fixed season, quotas, and extra health and camp arrangements. We treat them as separate corridors.',
  },
];

interface DestinationDetailPageProps {
  forcedId?: string;
}

const DESTINATION_META: Record<string, { title: string; description: string }> = {
  turkey: {
    title: 'Safeer E Aman | Turkey Visa Consultant in Lahore',
    description:
      'Turkey sticker visa and e-Visa guidance from Lahore: bank proofs, hotels, insurance, and itineraries for Istanbul and beyond.',
  },
  'united-kingdom': {
    title: 'Safeer E Aman | UK Visa Consultant in Lahore',
    description:
      'UK visitor, study, and family-visit file review in Lahore, focused on funds, ties to Pakistan, and a clear travel purpose.',
  },
  schengen: {
    title: 'Safeer E Aman | Schengen Visa Consultant in Lahore',
    description:
      'Schengen visa preparation in Lahore: main-destination choice, day-by-day itinerary, insurance, and hotel proofs for 29 countries.',
  },
  'saudi-arabia': {
    title: 'Safeer E Aman | Saudi Arabia & Umrah Visa Help in Lahore',
    description:
      'Umrah, tourist, and family-visit guidance for Saudi Arabia from the Safeer E Aman desk in Lahore, including hotels near the Haram.',
  },
  umrah: {
    title: 'Safeer E Aman | Umrah from Lahore',
    description:
      'Umrah visa, Nusuk, Haram-side hotels, and Haramain transfers from the Safeer E Aman desk in Lahore.',
  },
  hajj: {
    title: 'Safeer E Aman | Hajj Guidance from Lahore',
    description:
      'Hajj quota, Nusuk Hajj, vaccination and document order from Lahore. No seat or visa guarantees.',
  },
};

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ forcedId }) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const destId = forcedId || params.id || 'umrah';

  const destination =
    ALL_DESTINATIONS.find((d) => d.id === destId) || FEATURED_DESTINATIONS[0];
  const meta = DESTINATION_META[destination.id] ?? {
    title: `Safeer E Aman | ${destination.name} Visa Consultant in Lahore`,
    description: destination.overview,
  };
  usePageMeta({ title: meta.title, description: meta.description, path: location.pathname });
  const faqs = DESTINATION_FAQS[destination.id] || DESTINATION_FAQS['turkey'];
  const otherDestinations = FEATURED_DESTINATIONS.filter((d) => d.id !== destination.id);

  return (
    <div
      className="min-h-screen text-[#0C2A5C] select-none"
      style={{
        background: 'linear-gradient(160deg, #FBF7EA 0%, #F6E7BE 42%, #D6F1F5 100%)',
      }}
    >
      {/* Hero Header with photo */}
      <PageHero
        title={destination.name}
        subtitle={destination.tagline}
        backgroundImage={destination.heroImage}
        breadcrumbItems={[
          { label: 'Home', onClick: () => navigate('/') },
          { label: 'Destinations', onClick: () => navigate('/#destinations-section') },
          { label: destination.name },
        ]}
        accentColor="#B58638"
      />

      {/* Solenne Interactive Booking Bar */}
      <div className="-mt-10 relative z-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <SolenneBookingBar
          onCheckEligibility={() => {
            const el = document.getElementById('enquiry-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* Travel Overview with Dawn Pearl Styling */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3.5 py-1 rounded-full text-[13px] font-sans font-bold text-[#85601B] card-pearl">
                  {destination.region} corridor
                </span>
                <span className="text-xs font-sans text-[#0C2A5C]/80 flex items-center gap-1.5 font-medium">
                  <Plane className="w-3.5 h-3.5 text-[#B58638]" />
                  {destination.flightDurationFromPakistan}
                </span>
              </div>
              <h2
                className="font-sans font-extrabold tracking-tight text-[#0C2A5C]"
                style={{
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  lineHeight: 1.15,
                  maxWidth: '800px',
                  marginBottom: '15px',
                }}
              >
                Travel & consular dossier
              </h2>
            </div>

            <p className="text-[15px] sm:text-base text-[#0C2A5C]/85 font-sans leading-relaxed">
              {destination.overview}
            </p>

            {/* Gallery Images with 3D Depth Hover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {destination.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E3C078]/40 shadow-card-pearl bg-white group"
                >
                  <img
                    src={img}
                    alt={`${destination.name} showcase ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Key Travel Highlights */}
            <div className="pt-6">
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0C2A5C] mb-4">
                Travel & cultural highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.keyHighlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl card-pearl shadow-sm flex items-start gap-3"
                  >
                    <Compass className="w-4 h-4 text-[#B58638] flex-shrink-0 mt-0.5" />
                    <span className="text-[14px] text-[#0C2A5C]/80 leading-relaxed font-sans">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer notice */}
            <div className="p-5 rounded-2xl card-pearl border border-[#E3C078]/40 flex items-start gap-3.5 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-[#85601B] flex-shrink-0 mt-0.5" />
              <div className="text-[13px] text-[#0C2A5C]/80 leading-relaxed">
                <strong className="text-[#0C2A5C]">Consular Advisory Disclaimer:</strong> Visa requirements, processing timelines, and embassy fees are determined exclusively by sovereign government authorities and foreign embassies. Safeer E Aman assists with preparation and documentation formatting.
              </div>
            </div>
          </div>

          {/* Right Sidebar: Visa guidance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl card-pearl sticky top-28 space-y-6 shadow-card-pearl">
              <div>
                <span className="text-[13px] font-sans font-bold text-[#85601B] block mb-1">
                  Consular requirements
                </span>
                <h3 className="font-sans text-2xl font-extrabold text-[#0C2A5C]">
                  Visa preparation checklist
                </h3>
              </div>

              <div className="space-y-3">
                {destination.visaGuidance.map((guide, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-[#0C2A5C]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#3E9B5B] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug text-[#0C2A5C] font-sans text-[14px]">{guide}</span>
                  </div>
                ))}
              </div>

              {/* Major Hubs */}
              <div className="pt-4 border-t border-[#E3C078]/30">
                <span className="text-[12px] font-sans text-[#85601B] block mb-3 font-bold">
                  Primary hubs & stopovers
                </span>
                <div className="flex flex-wrap gap-2">
                  {destination.popularHubs.map((hub) => (
                    <span
                      key={hub}
                      className="px-3 py-1 rounded-lg bg-white/80 border border-[#E3C078]/40 text-xs font-sans text-[#0C2A5C] font-medium flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#B58638]" />
                      {hub}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                  `Hello Safeer E Aman, I would like to inquire about visa and travel guidance for ${destination.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full btn-gold text-xs font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#0C2A5C]" />
                <span>Inquire for {destination.name}</span>
              </a>

              <button
                onClick={() => {
                  const el = document.getElementById('enquiry-form-dest');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 rounded-full btn-secondary text-xs font-sans font-bold tracking-wider uppercase text-center block"
              >
                Book office consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQ items={faqs} title={`${destination.name} visa clarifications`} />

      {/* Inquiry Form in Deep Navy */}
      <div id="enquiry-form-dest">
        <EnquirySection
          defaultDestination={destination.name}
          defaultService={`Visa Advisory for ${destination.name}`}
        />
      </div>

      {/* Related Destinations */}
      <RelatedLinks
        title="Other featured travel corridors"
        items={otherDestinations.map((d) => ({
          id: d.id,
          title: d.name,
          subtitle: d.region,
          onClick: () => {
            navigate(`/destinations/${d.id}`);
          },
        }))}
      />
    </div>
  );
};
