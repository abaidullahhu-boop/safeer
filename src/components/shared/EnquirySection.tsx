import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/travelData';
import { isValidPakistaniPhone, PAKISTANI_PHONE_ERROR, whatsAppLink } from '../../utils/contact';

interface EnquirySectionProps {
  defaultService?: string;
  defaultDestination?: string;
  accentColor?: string;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  defaultService = 'Visa Consultancy',
  defaultDestination = 'Turkey',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: defaultService,
    destination: defaultDestination,
    notes: '',
  });

  const getWhatsAppDirectUrl = () =>
    whatsAppLink(
      `Hello Safeer E Aman,\nMy name is ${formData.fullName}.\nInquiry: ${formData.service} (${formData.destination})\nPhone: ${formData.phone}\nNotes: ${formData.notes || 'Interested in structured travel guidance.'}`
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) return;
    if (!isValidPakistaniPhone(formData.phone)) {
      setPhoneError(PAKISTANI_PHONE_ERROR);
      return;
    }
    setPhoneError('');
    setSubmitted(true);
    window.open(getWhatsAppDirectUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden border-t border-[#E3C078]/30 text-[#0C2A5C]"
      style={{ background: 'linear-gradient(160deg, #FBF7EA 0%, #F6E7BE 42%, #D6F1F5 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="tag-gold inline-flex">
              <span className="w-2 h-2 rounded-full bg-[#B58638]" />
              <span>Enquiry</span>
            </span>
            <h2 className="heading-section">Speak with the Lahore desk</h2>
            <p className="text-[15px] text-[#0C2A5C]/80 font-sans leading-relaxed">
              Submit this form to open WhatsApp with your details. We do not store the message on this site.
            </p>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-gold text-xs font-sans font-bold uppercase"
            >
              <MessageCircle className="w-4 h-4" />
              {BUSINESS_INFO.phone}
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl card-pearl shadow-card-pearl">
              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <CheckCircle className="w-10 h-10 mb-3 text-[#85601B]" />
                  <h3 className="font-sans text-2xl font-extrabold text-[#0C2A5C]">
                    Thank you, {formData.fullName}
                  </h3>
                  <p className="text-[14px] text-[#0C2A5C]/75 mt-2 max-w-sm font-sans">
                    WhatsApp should have opened with your {formData.service} enquiry. If it did not, use the button below.
                  </p>
                  <a
                    href={getWhatsAppDirectUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 px-6 py-2.5 rounded-full text-xs font-sans font-bold uppercase btn-gold"
                  >
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-sans text-xl font-extrabold text-[#0C2A5C]">Request a case look</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-full-name" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                        Full name *
                      </label>
                      <input
                        id="enquiry-full-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Tariq Mehmood"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638]"
                      />
                    </div>
                    <div>
                      <label htmlFor="enquiry-phone" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                        WhatsApp *
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        aria-invalid={phoneError ? true : undefined}
                        aria-describedby={phoneError ? 'enquiry-phone-error' : undefined}
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (phoneError && isValidPakistaniPhone(e.target.value)) setPhoneError('');
                        }}
                        placeholder="+92 321 0000000"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638]"
                      />
                      {phoneError && (
                        <p id="enquiry-phone-error" role="alert" className="mt-1.5 text-xs text-[#8B2E2E]">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="enquiry-notes" className="block text-[13px] font-sans text-[#85601B] font-semibold mb-1.5">
                      Notes
                    </label>
                    <textarea
                      id="enquiry-notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Travel history or questions…"
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E3C078]/40 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-sans font-bold text-sm uppercase flex items-center justify-center gap-2 btn-gold"
                  >
                    Submit on WhatsApp
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
