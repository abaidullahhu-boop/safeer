import React, { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle, MapPin, Phone, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';
import { isValidPhone, openWhatsApp, PHONE_ERROR, whatsAppLink } from '../utils/contact';

const OFFICE_MAP_QUERY = encodeURIComponent(BUSINESS_INFO.address);
const OFFICE_MAP_EMBED = `https://maps.google.com/maps?q=${OFFICE_MAP_QUERY}&z=15&output=embed`;
const OFFICE_MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${OFFICE_MAP_QUERY}`;

interface ConsultationSectionProps {
  prefilledService?: string;
}

const LazyOfficeMap: React.FC<{ src: string; title: string }> = ({ src, title }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {shouldLoad ? (
        <iframe
          title={title}
          src={src}
          className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-[1.05] pointer-events-none"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  );
};

export const PrivateConcierge: React.FC<ConsultationSectionProps> = ({ prefilledService }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Lahore',
    service: prefilledService || 'Visa Consultancy',
    destination: 'Umrah',
    travelDate: '',
    notes: '',
  });

  React.useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  const getWhatsAppDirectUrl = () =>
    whatsAppLink(
      `Hello Safeer E Aman,\nMy name is ${formData.fullName}.\nInquiry: ${formData.service} for ${formData.destination}.\nPhone: ${formData.phone}\nCity: ${formData.city}\nNotes: ${formData.notes || 'Looking for consular guidance.'}`
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) return;
    if (!isValidPhone(formData.phone)) {
      setPhoneError(PHONE_ERROR);
      return;
    }
    setPhoneError('');
    setSubmitted(true);
    openWhatsApp(getWhatsAppDirectUrl());
  };

  return (
    <section
      id="contact-section"
      className="relative py-24 md:py-36 text-[#0C2A5C] overflow-hidden select-none rounded-t-[1.75rem] sm:rounded-t-[2rem] shadow-[0_-16px_48px_rgba(6,20,40,0.14)]"
      style={{
        background: 'linear-gradient(160deg, #FBF7EA 0%, #F6E7BE 42%, #D6F1F5 100%)',
      }}
    >
      {/* Animated Mesh Behind */}
      <div className="animated-mesh-bg opacity-35">
        <div className="mesh-blob mesh-blob-gold" />
        <div className="mesh-blob mesh-blob-aqua" />
        <div className="mesh-blob mesh-blob-pearl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Business Credentials & Office Address */}
          <div className="reveal-text lg:col-span-5 space-y-6">
            <div className="mb-2">
              <span className="tag-gold">
                <span className="w-2 h-2 rounded-full bg-[#B58638]" />
                <span>Private consultation · Lahore</span>
              </span>
            </div>

            <div className="max-w-[800px]">
              <h2
                className="font-sans font-extrabold tracking-tight text-[#0C2A5C] leading-tight"
                style={{
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  lineHeight: 1.15,
                  marginBottom: '15px',
                }}
              >
                Send the case on WhatsApp.{' '}
                <span className="text-[#85601B]">We reply from Lahore.</span>
              </h2>
            </div>

            <p className="text-[15px] text-[#0C2A5C]/80 font-sans leading-relaxed">
              You may visit our office in Lahore or continue on WhatsApp. Submitting this form opens a WhatsApp message with your details so our advisors can assist you directly.
            </p>

            {/* Direct WhatsApp Callout */}
            

            {/* Physical Office Details */}
            <div className="space-y-4 pt-6 border-t border-[#E3C078]/30 text-[14px] font-sans text-[#0C2A5C]/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#85601B] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0C2A5C] block font-sans text-sm font-bold">Head Office Location</strong>
                  <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#85601B] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0C2A5C] block font-sans text-sm font-bold">Direct Phone & WhatsApp</strong>
                  <span className="text-[#85601B] font-bold">{BUSINESS_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#85601B] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0C2A5C] block font-sans text-sm font-bold">Advisory Hours</strong>
                  <span>{BUSINESS_INFO.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Consular Disclaimer Box */}
            
          </div>

          {/* Right Column: Structured Inquiry Form in Pearl Glass Card */}
          <div className="lg:col-span-7">
            <div className="reveal-card p-8 md:p-10 rounded-3xl card-pearl shadow-card-pearl">
              {submitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#E3C078]/30 border border-[#B58638] flex items-center justify-center text-[#85601B] mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <span className="text-[12px] font-sans text-[#85601B] font-bold tracking-wider uppercase">
                    Consultation request logged
                  </span>
                  <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-[#0C2A5C] mt-2">
                    Thank you, {formData.fullName}
                  </h3>
                  <p className="text-[#0C2A5C]/80 text-[15px] mt-3 max-w-md font-sans leading-relaxed">
                    WhatsApp should now be open with your <strong>{formData.service}</strong> enquiry for <strong>{formData.destination}</strong>. If it did not open, please continue using the button below.
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <a
                      href={getWhatsAppDirectUrl()}
                      onClick={(e) => {
                        e.preventDefault();
                        openWhatsApp(getWhatsAppDirectUrl(), { web: true });
                      }}
                      className="px-6 py-3 rounded-full btn-gold text-xs font-sans font-bold uppercase flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continue on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary px-5 py-3 text-xs font-bold uppercase"
                    >
                      New inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-[#E3C078]/30 pb-3 mb-2 flex items-center justify-between">
                    <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[#0C2A5C]">
                      Request case assessment
                    </h3>
                    
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="concierge-full-name" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                        Full name *
                      </label>
                      <input
                        id="concierge-full-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Muhammad Bilal"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="concierge-phone" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                        WhatsApp / Contact *
                      </label>
                      <input
                        id="concierge-phone"
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        aria-invalid={phoneError ? true : undefined}
                        aria-describedby={phoneError ? 'concierge-phone-error' : undefined}
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (phoneError && isValidPhone(e.target.value)) setPhoneError('');
                        }}
                        placeholder="+92 321 0000000 or +971 50 0000000"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                      />
                      {phoneError && (
                        <p id="concierge-phone-error" role="alert" className="mt-1.5 text-xs text-[#8B2E2E]">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Matching Dropdowns with identical styling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="concierge-service" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                        Service category
                      </label>
                      <select
                        id="concierge-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="Visa Consultancy">Visa Consultancy</option>
                        <option value="Visit Visa Assistance">Visit Visa Assistance</option>
                        <option value="Business Visa Guidance">Business Visa Guidance</option>
                        <option value="Study Visa Guidance">Study Visa Guidance</option>
                        <option value="Work Visa Guidance">Work Visa Guidance</option>
                        <option value="Family Visit & Dependent Visa">Family Visit & Dependent Visa</option>
                        <option value="Transit Visa Guidance">Transit Visa Guidance</option>
                        <option value="Visa Refusal Review">Visa Refusal Review</option>
                        <option value="Appointment & Biometrics Support">Appointment & Biometrics Support</option>
                        <option value="Visa Documentation Guidance">Visa Documentation Guidance</option>
                        <option value="Umrah Enquiries">Umrah Enquiries</option>
                        <option value="Flight Ticketing Assistance">Flight Ticketing Assistance</option>
                        <option value="Accommodation Assistance">Accommodation Assistance</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="concierge-destination" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                        Destination corridor
                      </label>
                      <select
                        id="concierge-destination"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="Umrah">Umrah</option>
                        <option value="Hajj">Hajj</option>
                        <option value="Turkey">Turkey</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Schengen Destinations">Schengen Destinations</option>
                        <option value="Multiple / Other">Other International Destination</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="concierge-city" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                        City in Pakistan
                      </label>
                      <input
                        id="concierge-city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Lahore / Gujranwala / Sheikhupura"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="concierge-travel-date" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                        Anticipated travel month
                      </label>
                      <input
                        id="concierge-travel-date"
                        type="text"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        placeholder="e.g. Next Month / Summer / Dec"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="concierge-notes" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                      Brief case background / requirements
                    </label>
                    <textarea
                      id="concierge-notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Mention your profession, prior travel history, or specific questions..."
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl btn-gold font-sans font-bold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01]"
                  >
                    <span>Submit enquiry on WhatsApp</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="tag-gold">
                <MapPin className="w-3 h-3" />
                <span>Office map · Bata Pur, Lahore</span>
              </span>
              <p className="mt-3 text-sm text-[#0C2A5C]/70 font-sans max-w-xl">
                Head office on GT Road, Bata Pur — open in Google Maps for directions.
              </p>
            </div>
            <a
              href={OFFICE_MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wide text-[#85601B] hover:text-[#0C2A5C] transition-colors"
            >
              Open in Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative h-[180px] sm:h-[220px] md:h-[260px] rounded-3xl overflow-hidden border border-[#E3C078]/50 shadow-card-pearl bg-[#D6E4EA]">
            <LazyOfficeMap
              title="Safeer E Aman office location, Bata Pur Lahore"
              src={OFFICE_MAP_EMBED}
            />

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0C2A5C]/25 via-transparent to-transparent" />

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-[70%] pointer-events-none flex flex-col items-center">
              <div className="px-3 py-1.5 mb-2 rounded-full bg-white/95 border border-[#E3C078] shadow-sm text-[11px] font-sans font-bold text-[#0C2A5C] whitespace-nowrap">
                Safeer E Aman
              </div>
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#B58638] opacity-50 animate-ping" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#85601B] border-2 border-white" />
              </span>
            </div>

            <a
              href={OFFICE_MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 pointer-events-auto max-w-md px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E3C078]/50 text-[13px] font-sans text-[#0C2A5C] shadow-sm hover:bg-white transition-colors"
            >
              <strong className="block text-[#85601B] text-[11px] uppercase tracking-wider mb-0.5">
                Head office
              </strong>
              {BUSINESS_INFO.address}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
