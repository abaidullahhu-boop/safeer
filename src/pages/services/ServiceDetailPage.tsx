import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { TRAVEL_SERVICES, BUSINESS_INFO } from '../../data/travelData';
import { PageHero } from '../../components/shared/PageHero';
import { FAQ, FAQItem } from '../../components/shared/FAQ';
import { EnquirySection } from '../../components/shared/EnquirySection';
import { RelatedLinks } from '../../components/shared/RelatedLinks';
import { CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';

const SERVICE_FAQS: Record<string, FAQItem[]> = {
  'visa-consultancy': [
    {
      question: 'Do you guarantee visa approval?',
      answer:
        'No. Embassies decide. We review your file, checklist, and weak spots so avoidable errors are not the reason a case fails.',
    },
    {
      question: 'Can you help after a refusal?',
      answer:
        'Yes. We read the refusal notice, fix document gaps, and only suggest a new filing if the profile can actually be stronger.',
    },
  ],
  'visit-visa': [
    {
      question: 'What funds are usually asked for a tourist visa?',
      answer:
        'Most missions want several months of bank statements with a clear income trail and enough cover for the trip. Exact rules differ by embassy.',
    },
    {
      question: 'Do I need bought tickets first?',
      answer:
        'Usually a verifiable reservation is enough. We avoid paying non-refundable fares before a visa is issued.',
    },
  ],
  'business-visa': [
    {
      question: 'What does my Pakistani company need to show?',
      answer: 'NTN, tax returns, chamber papers, company statements, and a host invitation that states purpose and dates.',
    },
    {
      question: 'Is a host invitation mandatory?',
      answer: 'For most business visas, yes — an official letter from the overseas company.',
    },
  ],
  'study-work-visa': [
    {
      question: 'Do you get me a university seat?',
      answer:
        'No. We work after you have an offer or CAS/I-20: funds timeline, SOP check, and form review.',
    },
    {
      question: 'What is the UK 28-day funds rule?',
      answer:
        'Tuition and living funds must sit in the account for 28 consecutive days before you apply. We check the dates against the current rule.',
    },
  ],
  'work-visa': [
    {
      question: 'Do you provide jobs abroad?',
      answer: 'No. We only guide paperwork when you already have a genuine offer. We do not sell jobs.',
    },
    {
      question: 'What papers are typical?',
      answer: 'Signed contract or invitation, host company details, experience letters, and that country’s embassy checklist.',
    },
  ],
  'family-visa': [
    {
      question: 'Do you handle spouse and parent visits?',
      answer:
        'Yes — invitation, relationship proofs, and sponsor funds for UK, Schengen, Turkey, and Gulf files from Lahore.',
    },
    {
      question: 'Is a nikahnama enough?',
      answer:
        'No. It proves the relationship. Officers still want sponsor income, stay plans, and the applicant’s ties to Pakistan.',
    },
  ],
  'transit-visa': [
    {
      question: 'Do I always need a transit visa?',
      answer:
        'No. It depends on passport, layover country, airside vs landside, and connection time. We check the routing first.',
    },
    {
      question: 'Can you guarantee the airline will board me?',
      answer: 'No. Airlines and border officers decide. We map published rules and the papers to carry.',
    },
  ],
  'visa-refusal': [
    {
      question: 'Can you reverse a refusal?',
      answer:
        'No one can reverse an embassy decision. We explain the grounds and rebuild a file only when new evidence exists.',
    },
    {
      question: 'Should I apply again immediately?',
      answer: 'Only if the refusal points can be answered with new documents. The same weak file usually fails again.',
    },
  ],
  'appointment-biometrics': [
    {
      question: 'Do you sell VFS priority slots?',
      answer: 'No. We use official portals and available dates. We do not buy unofficial appointments.',
    },
    {
      question: 'What should I take to biometrics?',
      answer: 'Confirmation, passport, photos to that centre’s spec, receipts, and the printed pack for that embassy.',
    },
  ],
  'visa-documentation': [
    {
      question: 'What is in a dossier assembly?',
      answer: 'Cover letter, financial summary, FRC/translation checks, and papers ordered to the embassy index.',
    },
    {
      question: 'Do you draft sponsorship affidavits?',
      answer: 'Yes, for family or company sponsors, written to match the stated facts of the file.',
    },
  ],
  umrah: [
    {
      question: 'How long do Umrah visas take?',
      answer: 'Eligible e-visas are often 24–72 hours, subject to Ministry / Nusuk processing.',
    },
    {
      question: 'Can you book hotels near the Haram?',
      answer: 'Yes. We shortlist stays by walking time to the Haramain, from budget to five-star.',
    },
  ],
  'flight-ticketing': [
    {
      question: 'Can you issue a PNR for a visa file?',
      answer: 'Yes — live reservations consular staff can check, without forcing a non-refundable ticket first.',
    },
    {
      question: 'Which airlines do you book?',
      answer: 'Major carriers from Lahore including PIA, Emirates, Qatar, Turkish, Saudia, and others as the route allows.',
    },
  ],
  accommodation: [
    {
      question: 'Do UK and Schengen accept hotel vouchers?',
      answer: 'They expect a verifiable booking with a reference and hotel contact — which we issue.',
    },
    {
      question: 'Can dates change if the visa is delayed?',
      answer: 'We prefer flexible rates so the stay can move once the passport is back.',
    },
  ],
};

const SERVICE_HERO_IMAGES: Record<string, string> = {
  'visa-consultancy': '/images/visa-consultancy.jpg',
  'visit-visa': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=85',
  'business-visa': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85',
  'study-work-visa': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=85',
  'work-visa': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=85',
  'family-visa': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=85',
  'transit-visa': '/images/transit-airport.jpg',
  'visa-refusal': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=85',
  'appointment-biometrics': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=85',
  'visa-documentation': 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1600&q=85',
  umrah: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=85',
  'flight-ticketing': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85',
  accommodation: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85',
};

const SERVICE_META: Record<string, { title: string; description: string }> = {
  'visa-consultancy': {
    title: 'Safeer E Aman | Visa Consultancy in Lahore',
    description: 'Case review in Lahore for embassy checklists, prior refusals, and file strength.',
  },
  'visit-visa': {
    title: 'Safeer E Aman | Visit Visa Assistance in Lahore',
    description: 'Tourist and family-visit visa files from Lahore: itineraries, hotels, and funds.',
  },
  'business-visa': {
    title: 'Safeer E Aman | Business Visa Guidance in Lahore',
    description: 'Invitation letters, NTN and chamber papers, and business-visa files from Lahore.',
  },
  'study-work-visa': {
    title: 'Safeer E Aman | Study Visa Guidance in Lahore',
    description: 'CAS or I-20 checks, 28-day funds, SOP review, and student visa forms from Lahore.',
  },
  'work-visa': {
    title: 'Safeer E Aman | Work Visa Guidance in Lahore',
    description: 'Document order for a genuine overseas job offer. No jobs sold, no guaranteed visas.',
  },
  'family-visa': {
    title: 'Safeer E Aman | Family Visit Visa Help in Lahore',
    description: 'Spouse, parent, and child visit files: invitation, relationship, and sponsor papers.',
  },
  'transit-visa': {
    title: 'Safeer E Aman | Transit Visa Guidance in Lahore',
    description: 'Layover checks for UK, Schengen, and Gulf — airside rules and onward tickets.',
  },
  'visa-refusal': {
    title: 'Safeer E Aman | Visa Refusal Review in Lahore',
    description: 'Honest review of refusal notices, with a rebuilt file only when it can be stronger.',
  },
  'appointment-biometrics': {
    title: 'Safeer E Aman | Visa Appointment & Biometrics',
    description: 'VFS, TLS, and Gerry’s appointment guidance. No unofficial slots.',
  },
  'visa-documentation': {
    title: 'Safeer E Aman | Visa Documentation Help in Lahore',
    description: 'Cover letters, affidavits, translations, and indexed dossiers from Lahore.',
  },
  umrah: {
    title: 'Safeer E Aman | Umrah Assistance from Lahore',
    description: 'Umrah visa guidance, flights, and Haram-area hotels from Lahore.',
  },
  'flight-ticketing': {
    title: 'Safeer E Aman | Flight Ticketing from Lahore',
    description: 'Airline tickets and embassy-ready reservations from Lahore.',
  },
  accommodation: {
    title: 'Safeer E Aman | Hotel & Stay Assistance',
    description: 'Verified hotel vouchers for visa files, students, and Umrah.',
  },
};

interface ServiceDetailPageProps {
  forcedId?: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ forcedId }) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = forcedId || params.id || 'visa-consultancy';

  const service = TRAVEL_SERVICES.find((s) => s.id === serviceId) || TRAVEL_SERVICES[0];
  const meta = SERVICE_META[service.id] ?? {
    title: `Safeer E Aman | ${service.title} in Lahore`,
    description: service.summary,
  };
  usePageMeta({ title: meta.title, description: meta.description, path: location.pathname });
  const faqs = SERVICE_FAQS[service.id] || SERVICE_FAQS['visa-consultancy'];
  const otherServices = TRAVEL_SERVICES.filter((s) => s.id !== service.id).slice(0, 4);
  const heroImage = SERVICE_HERO_IMAGES[service.id] || SERVICE_HERO_IMAGES['visa-consultancy'];

  return (
    <div
      className="min-h-screen text-[#0C2A5C] select-none font-sans"
      style={{
        background: 'linear-gradient(160deg, #FBF7EA 0%, #F6E7BE 42%, #D6F1F5 100%)',
      }}
    >
      <PageHero
        title={service.title}
        subtitle={service.tagline}
        backgroundImage={heroImage}
        breadcrumbItems={[
          { label: 'Home', onClick: () => navigate('/') },
          { label: 'Services', onClick: () => navigate('/#services-section') },
          { label: service.title },
        ]}
        accentColor="#B58638"
      />

      <section className="py-14 md:py-20 max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="tag-gold mb-3 inline-flex">
                <span className="w-2 h-2 rounded-full bg-[#B58638]" />
                <span>{service.category}</span>
              </span>
              <h2 className="heading-section max-w-[800px] mb-4">{service.title}</h2>
              <p className="text-[15px] text-[#0C2A5C]/80 font-sans leading-relaxed">{service.summary}</p>
              <p className="mt-4 text-[15px] text-[#0C2A5C]/80 font-sans leading-relaxed">{service.fullDetails}</p>
            </div>

            <div>
              <h3 className="font-sans text-lg font-extrabold text-[#0C2A5C] mb-4">How we work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.processWorkflow.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl card-pearl">
                    <span className="text-[11px] font-sans font-bold text-[#85601B] tracking-wide">
                      {step.step}
                    </span>
                    <h4 className="font-sans text-[15px] font-extrabold text-[#0C2A5C] mt-1">{step.title}</h4>
                    <p className="text-[13px] text-[#0C2A5C]/70 font-sans mt-1 leading-snug">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl card-pearl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#85601B] flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#0C2A5C]/80 font-sans leading-relaxed">
                Safeer E Aman does not issue visas. We audit files and help with paperwork. The embassy decides.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 md:p-8 rounded-3xl card-pearl shadow-card-pearl space-y-5 lg:sticky lg:top-28">
              <h3 className="font-sans text-xl font-extrabold text-[#0C2A5C]">What you get</h3>
              <div className="space-y-3">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3E9B5B] flex-shrink-0 mt-0.5" />
                    <span className="text-[14px] font-sans text-[#0C2A5C] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] font-sans text-[#0C2A5C]/70">{BUSINESS_INFO.workingHours}</p>
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                  `Hello Safeer E Aman, I would like to inquire regarding ${service.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full btn-gold text-xs font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#0C2A5C]" />
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  document.getElementById('enquiry-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-full btn-secondary text-xs font-sans font-bold tracking-wider uppercase"
              >
                Write to the desk
              </button>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqs} title="Quick answers" />

      <div id="enquiry-section">
        <EnquirySection defaultService={service.title} />
      </div>

      <RelatedLinks
        title="Other services"
        items={otherServices.map((s) => ({
          id: s.id,
          title: s.title,
          subtitle: s.category,
          image: SERVICE_HERO_IMAGES[s.id] || SERVICE_HERO_IMAGES['visa-consultancy'],
          onClick: () => {
            navigate(`/services/${s.id}`);
          },
        }))}
      />
    </div>
  );
};
