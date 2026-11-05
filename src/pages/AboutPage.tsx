import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/shared/PageHero';
import { EnquirySection } from '../components/shared/EnquirySection';
import { BUSINESS_INFO, TRAVEL_SERVICES } from '../data/travelData';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  FileCheck,
  Landmark,
  ArrowUpRight,
  Compass,
  Mail,
  Building2,
} from 'lucide-react';

const corridors = [
  { code: 'LHE', city: 'Lahore', role: 'Head office', path: null, active: true },
  { code: 'IST', city: 'Istanbul', role: 'Turkey files', path: '/destinations/turkey' },
  { code: 'JED', city: 'Jeddah', role: 'Umrah & Hajj', path: '/destinations/umrah' },
  { code: 'LHR', city: 'London', role: 'UK visit & study', path: '/destinations/united-kingdom' },
  { code: 'BRU', city: 'Brussels', role: 'Schengen 29', path: '/destinations/schengen' },
];

const principles = [
  {
    icon: ShieldCheck,
    title: 'No visa guarantee',
    body: 'The embassy decides. We prepare the file honestly — documents, PNR, hotel voucher, appointment — without selling outcomes.',
  },
  {
    icon: FileCheck,
    title: 'File before promise',
    body: 'Tax, bank, employment, and travel history are audited against the destination checklist before anything is submitted.',
  },
  {
    icon: Landmark,
    title: 'Real bookings only',
    body: 'Flight reservations with live PNRs and embassy-readable hotel vouchers. No dummy tickets that fail a consular check.',
  },
  {
    icon: Compass,
    title: 'Lahore desk, WhatsApp first',
    body: 'Cases start on WhatsApp. In-person review is available at Bata Pur, Main GT Road, Monday to Saturday.',
  },
];

const chapters = [
  {
    index: '01',
    title: 'Why we exist',
    body: 'Visa desks in Pakistan too often sell certainty they cannot deliver. Safeer E Aman was founded in Lahore to replace that noise with a simple offer: send the case, we prepare the file, the embassy decides.',
  },
  {
    index: '02',
    title: 'Who we sit with',
    body: 'Families leaving for Umrah, first-time Turkey visitors, UK visit and study files, and Schengen itineraries that need a coherent story — not a stack of unrelated PDFs.',
  },
  {
    index: '03',
    title: 'How a file moves',
    body: 'WhatsApp intake, document gap list, verifiable bookings, then appointment-ready packing. You always know what is missing and what is already embassy-ready.',
  },
];

const facts = [
  { label: 'Head office', value: 'Bata Pur, Lahore' },
  { label: 'Corridors', value: 'Turkey · UK · Schengen · Saudi' },
  { label: 'Desk hours', value: 'Mon–Sat, 10am–7pm' },
  { label: 'Intake', value: 'WhatsApp & walk-in' },
];

const faqs = [
  {
    q: 'Do you guarantee a visa?',
    a: 'No. Consular decisions belong to the embassy or visa centre. We check the file, close gaps, and submit a truthful application. That is the work.',
  },
  {
    q: 'Which corridors do you handle?',
    a: 'Turkey, United Kingdom, Schengen, and Saudi / Umrah from Lahore — documents, PNR, hotel voucher, and appointment support.',
  },
  {
    q: 'What services sit under one desk?',
    a: 'Visa consultancy, visit, business, study, work, family and transit files, refusal review, documentation, appointments, Umrah, flights, and hotels.',
  },
  {
    q: 'Can I start without visiting the office?',
    a: 'Yes. Most files start on WhatsApp. Visit the Bata Pur office when a face-to-face document audit is useful.',
  },
];

const SERVICE_CATEGORIES: Array<typeof TRAVEL_SERVICES[number]['category']> = [
  'Visa Advisory',
  'Documentation',
  'Pilgrimage',
  'Ticketing & Stay',
];

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  usePageMeta({
    title: 'Safeer E Aman | About',
    description:
      'Safeer E Aman is an independent Lahore consultancy. Meet the desk that prepares visa files, Umrah travel, and documentation without promising a stamp.',
    path: '/about',
  });

  return (
    <div
      className="min-h-screen text-[#0C2A5C] select-none"
      style={{
        background: 'linear-gradient(160deg, #FBF7EA 0%, #F6E7BE 42%, #D6F1F5 100%)',
      }}
    >
      <PageHero
        title="The Lahore desk behind the file"
        subtitle="Independent travel consultancy on Main GT Road, Bata Pur. Visa files, Umrah, ticketing, and hotels — prepared honestly. The embassy decides."
        backgroundImage="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80"
        breadcrumbItems={[
          { label: 'Home', onClick: () => navigate('/') },
          { label: 'About us' },
        ]}
        accentColor="#B58638"
      />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="animated-mesh-bg opacity-25 pointer-events-none">
          <div className="mesh-blob mesh-blob-gold" />
          <div className="mesh-blob mesh-blob-aqua" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl card-pearl px-4 py-4 sm:px-5 sm:py-5">
                <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#85601B]">
                  {fact.label}
                </span>
                <span className="mt-1.5 block text-sm sm:text-[15px] font-sans font-extrabold text-[#0C2A5C] leading-snug">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="tag-gold">
                <span className="w-2 h-2 rounded-full bg-[#B58638]" />
                <span>Company profile · {BUSINESS_INFO.name}</span>
              </span>

              <h2 className="heading-hero">
                Peace of mind through precision — not through promises we cannot keep.
              </h2>

              <p className="text-[15px] sm:text-base text-[#0C2A5C]/80 font-sans leading-relaxed">
                <strong className="text-[#0C2A5C]">{BUSINESS_INFO.name}</strong> is an independent travel
                consultancy on Main GT Road, Bata Pur, Lahore. {BUSINESS_INFO.mission} We exist so families,
                pilgrims, students, and first-time travellers can send a case on WhatsApp and receive a
                file that is complete, honest, and embassy-readable.
              </p>
              <p className="text-[15px] text-[#0C2A5C]/80 font-sans leading-relaxed">
                Opaque fees and “guaranteed visa” language still crowd this industry. We refuse both.
                Appraisal is candid. Documents are checked against official lists. Bookings are live.
                You remain the applicant; we remain the desk that prepares the file.
              </p>
              <p className="text-[15px] text-[#0C2A5C]/80 font-sans leading-relaxed">
                Under one desk we handle visa consultancy, visit and business files, study and work
                guidance, family and transit cases, refusal reviews, documentation and biometrics,
                Umrah assistance, flight reservations, and verified hotel vouchers.
              </p>

              <blockquote className="relative pl-6 py-1 border-l-2 border-[#B58638]">
                <p className="font-editorial-serif italic text-lg sm:text-xl text-[#0C2A5C] leading-snug">
                  Send your case on WhatsApp. We prepare the file — the embassy decides.
                </p>
                <cite className="mt-2 not-italic text-[12px] font-sans font-bold tracking-wide uppercase text-[#85601B]">
                  House rule · {BUSINESS_INFO.name}
                </cite>
              </blockquote>
            </div>

            <aside className="lg:col-span-5">
              <div className="p-7 sm:p-8 rounded-3xl card-pearl shadow-card-pearl space-y-5 lg:sticky lg:top-28">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#85601B]" />
                  <span className="text-[13px] font-sans font-bold text-[#85601B] block">
                    Lahore headquarters
                  </span>
                </div>
                <h3 className="font-sans text-2xl font-extrabold text-[#0C2A5C] leading-tight">
                  Visit for a personal file review
                </h3>
                <p className="text-[13px] text-[#0C2A5C]/70 leading-relaxed">
                  Bring passport, bank statements, tax returns, and travel history. Or start on WhatsApp
                  and we will tell you what is missing.
                </p>

                <div className="space-y-4 text-[14px] font-sans text-[#0C2A5C]/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#85601B] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#85601B] flex-shrink-0" />
                    <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="font-semibold text-[#0C2A5C] hover:text-[#85601B]">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#85601B] flex-shrink-0" />
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="font-semibold text-[#0C2A5C] hover:text-[#85601B]">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#85601B] flex-shrink-0" />
                    <span>{BUSINESS_INFO.workingHours}</span>
                  </div>
                </div>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full btn-gold text-xs font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp the desk</span>
                </a>
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-[#E3C078]/30">
            {chapters.map((chapter) => (
              <article key={chapter.index} className="space-y-3">
                <span className="text-sm font-sans font-extrabold text-[#85601B]">{chapter.index}</span>
                <h3 className="font-sans text-xl font-bold text-[#0C2A5C] tracking-tight">{chapter.title}</h3>
                <p className="text-[15px] text-[#0C2A5C]/75 leading-relaxed">{chapter.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 border-t border-[#E3C078]/30 bg-[#FBFAF6]/60">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <span className="tag-gold mb-4 inline-flex">
            <span className="w-2 h-2 rounded-full bg-[#B58638]" />
            <span>Full service desk</span>
          </span>
          <h2 className="heading-section mb-3">Every service under Safeer E Aman</h2>
          <p className="text-[15px] text-[#0C2A5C]/75 max-w-2xl mb-12 leading-relaxed">
            Thirteen practices from the same Lahore office. Open any file type below for process,
            deliverables, and a WhatsApp enquiry.
          </p>

          <div className="space-y-12">
            {SERVICE_CATEGORIES.map((category) => {
              const items = TRAVEL_SERVICES.filter((s) => s.category === category);
              if (!items.length) return null;
              return (
                <div key={category}>
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <h3 className="font-sans text-lg sm:text-xl font-extrabold text-[#0C2A5C]">{category}</h3>
                    <span className="text-[12px] font-sans font-bold uppercase tracking-wider text-[#85601B]">
                      {items.length} service{items.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => navigate(`/services/${service.id}`)}
                        className="text-left p-6 rounded-2xl card-pearl shadow-sm hover:-translate-y-0.5 transition-transform group"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-sans text-base sm:text-[17px] font-extrabold text-[#0C2A5C] group-hover:text-[#85601B] transition-colors">
                            {service.title}
                          </h4>
                          <ArrowUpRight className="w-4 h-4 text-[#85601B] shrink-0 mt-0.5" />
                        </div>
                        <p className="text-[13px] font-sans font-semibold text-[#85601B] mb-2">
                          {service.tagline}
                        </p>
                        <p className="text-[14px] text-[#0C2A5C]/75 leading-relaxed">{service.summary}</p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-[#E3C078]/30">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span className="tag-gold mb-4 inline-flex">
                <span className="w-2 h-2 rounded-full bg-[#B58638]" />
                <span>Corridors from Lahore</span>
              </span>
              <h2 className="heading-section">Four files we know by heart</h2>
            </div>
            <p className="text-[14px] text-[#0C2A5C]/70 max-w-sm">
              Each corridor has its own checklist. We do not treat a Turkey e-visa like a UK visit file.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl card-pearl shadow-card-pearl overflow-hidden">
            <div className="relative hidden sm:block">
              <div className="h-0.5 bg-[#E3C078]/40 w-full absolute top-5 left-0 right-0 z-0" />
              <div className="relative z-10 grid grid-cols-5 gap-2">
                {corridors.map((pt) => (
                  <button
                    key={pt.code}
                    type="button"
                    onClick={() => pt.path && navigate(pt.path)}
                    className={`flex flex-col items-center text-center ${pt.path ? 'cursor-pointer group' : 'cursor-default'}`}
                    disabled={!pt.path}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-transform group-hover:scale-110 ${
                        pt.active
                          ? 'bg-[#081B3D] text-[#FBFAF6] border-2 border-[#E3C078] shadow-md'
                          : 'bg-white text-[#0C2A5C] border border-[#E3C078]/50'
                      }`}
                    >
                      {pt.code}
                    </div>
                    <span className="font-sans text-sm font-bold text-[#0C2A5C] mt-2 block">{pt.city}</span>
                    <span className="text-xs font-sans text-[#0C2A5C]/60">{pt.role}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:hidden">
              {corridors.map((pt) => (
                <button
                  key={pt.code}
                  type="button"
                  onClick={() => pt.path && navigate(pt.path)}
                  disabled={!pt.path}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-[#E3C078]/30 text-left"
                >
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                      pt.active ? 'bg-[#081B3D] text-white' : 'bg-[#FBF7EA] text-[#0C2A5C]'
                    }`}
                  >
                    {pt.code}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{pt.city}</span>
                    <span className="block text-xs text-[#0C2A5C]/60">{pt.role}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <span className="tag-gold mb-4 inline-flex">
            <span className="w-2 h-2 rounded-full bg-[#B58638]" />
            <span>Operating standard</span>
          </span>
          <h2 className="heading-section mb-10">How this desk actually works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="p-6 sm:p-7 rounded-2xl card-pearl shadow-sm space-y-3">
                  <Icon className="w-6 h-6 text-[#85601B]" />
                  <h3 className="font-sans text-lg font-bold text-[#0C2A5C]">{item.title}</h3>
                  <p className="text-[14px] text-[#0C2A5C]/75 leading-relaxed">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-[#E3C078]/30">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <h2 className="heading-section mb-8">Straight answers</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl card-pearl px-5 py-4 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-sans font-bold text-[#0C2A5C]">
                  {item.q}
                  <ArrowUpRight className="w-4 h-4 text-[#85601B] shrink-0 transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-[14px] text-[#0C2A5C]/75 leading-relaxed pr-8">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-[13px] text-[#0C2A5C]/60">
            <CheckCircle2 className="w-4 h-4 text-[#3E9B5B]" />
            Honest appraisal. No fabricated papers. No consular outcome sold as a product.
          </p>
        </div>
      </section>

      <EnquirySection defaultService="General Visa & Travel Consultation" />
    </div>
  );
};
