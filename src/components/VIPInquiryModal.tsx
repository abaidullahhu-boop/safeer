import React, { useEffect, useState } from 'react';
import { X, MessageCircle, CheckCircle, Send } from 'lucide-react';
import { isValidPhone, openWhatsApp, PHONE_ERROR, whatsAppLink } from '../utils/contact';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ANIMATION_MS = 320;

export const VIPInquiryModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Visa Consultancy',
    destination: 'Umrah',
    inquiry: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(id);
    }

    setVisible(false);
    const timer = window.setTimeout(() => {
      setMounted(false);
      setSubmitted(false);
      setPhoneError('');
    }, ANIMATION_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  if (!mounted) return null;

  const getWhatsAppUrl = () =>
    whatsAppLink(
      `Hello Safeer E Aman,\nI would like to book a consultation.\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nDestination: ${formData.destination}\nDetails: ${formData.inquiry || 'Looking for visa & travel assistance.'}`
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    if (!isValidPhone(formData.phone)) {
      setPhoneError(PHONE_ERROR);
      return;
    }
    setPhoneError('');
    setSubmitted(true);
    openWhatsApp(getWhatsAppUrl());
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C2A5C]/45 backdrop-blur-md transition-opacity ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDuration: `${ANIMATION_MS}ms` }}
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Schedule consultation"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-3xl bg-white border border-[#E3C078]/50 shadow-card-pearl p-5 sm:p-8 md:p-10 text-[#0C2A5C] transition-all ease-out ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-[0.96]'
        }`}
        style={{ transitionDuration: `${ANIMATION_MS}ms` }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 p-1.5 sm:p-2 rounded-full bg-[#0C2A5C]/5 border border-[#0C2A5C]/15 text-[#0C2A5C]/70 hover:text-[#0C2A5C] hover:border-[#E3C078] transition-colors"
          aria-label="Close portal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#E3C078]/20 border border-[#E3C078] flex items-center justify-center text-[#E3C078] mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-[12px] font-sans text-[#E3C078] font-bold tracking-wider uppercase">
              Consultation Initiated
            </span>
            <h3 className="font-editorial-serif text-2xl font-bold text-[#0C2A5C] mt-2">
              WhatsApp opened, {formData.name}
            </h3>
            <p className="text-[#0C2A5C]/80 text-sm mt-3 font-sans leading-relaxed">
              WhatsApp should have opened with your consultation request. This form does not store your details. If the chat did not open, use the button below.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={getWhatsAppUrl()}
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsApp(getWhatsAppUrl(), { web: true });
                }}
                className="w-full py-3.5 rounded-full btn-gold text-xs font-sans font-bold uppercase flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#0C2A5C]" />
                <span>Connect on WhatsApp Now</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 rounded-full btn-secondary text-xs font-sans font-bold uppercase"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 pr-10 sm:pr-12 border-b border-[#E3C078]/40">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <img
                  src="/brand/logo-circle-512-transparent.png"
                  alt="Safeer E Aman Seal"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-editorial-serif text-lg sm:text-2xl font-bold text-[#0C2A5C] leading-tight">
                  Schedule Consultation
                </h3>
                <span className="text-[11px] sm:text-[12px] font-sans text-[#85601B] font-medium block mt-0.5">
                  Safeer E Aman · Lahore Head Office
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="vip-name" className="block text-[12px] font-sans text-[#85601B] font-semibold mb-1">
                  Your Full Name *
                </label>
                <input
                  id="vip-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Muhammad Bilal"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7FBFF] border border-[#0C2A5C]/15 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="vip-phone" className="block text-[12px] font-sans text-[#85601B] font-semibold mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  id="vip-phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={phoneError ? true : undefined}
                  aria-describedby={phoneError ? 'vip-phone-error' : undefined}
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (phoneError && isValidPhone(e.target.value)) setPhoneError('');
                  }}
                  placeholder="+92 321 0000000 or +971 50 0000000"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7FBFF] border border-[#0C2A5C]/15 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                />
                {phoneError && (
                  <p id="vip-phone-error" role="alert" className="mt-1.5 text-xs text-[#8B2E2E]">
                    {phoneError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="vip-service" className="block text-[12px] font-sans text-[#85601B] font-semibold mb-1">
                    Service Required
                  </label>
                  <select
                    id="vip-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#F7FBFF] border border-[#0C2A5C]/15 text-[#0C2A5C] text-xs focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                  >
                    <option value="Visa Consultancy">Visa Consultancy</option>
                    <option value="Visit Visa Assistance">Visit Visa Assistance</option>
                    <option value="Business Visa Guidance">Business Visa Guidance</option>
                    <option value="Study & Work Guidance">Study & Work Guidance</option>
                    <option value="Family Visit & Dependent Visa">Family Visit & Dependent Visa</option>
                    <option value="Transit Visa Guidance">Transit Visa Guidance</option>
                    <option value="Visa Refusal Review">Visa Refusal Review</option>
                    <option value="Appointment & Biometrics">Appointment & Biometrics</option>
                    <option value="Umrah Enquiries">Umrah Enquiries</option>
                    <option value="Flight & Hotel Bookings">Flight & Hotel Bookings</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vip-destination" className="block text-[12px] font-sans text-[#85601B] font-semibold mb-1">
                    Target Destination
                  </label>
                  <select
                    id="vip-destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#F7FBFF] border border-[#0C2A5C]/15 text-[#0C2A5C] text-xs focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                  >
                    <option value="Umrah">Umrah</option>
                    <option value="Hajj">Hajj</option>
                    <option value="Turkey">Turkey</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Schengen Europe">Schengen Europe</option>
                    <option value="Other">Other Region</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="vip-inquiry" className="block text-[12px] font-sans text-[#85601B] font-semibold mb-1">
                  Additional Case Details
                </label>
                <textarea
                  id="vip-inquiry"
                  rows={2}
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                  placeholder="Share any prior refusals, target travel month, or family size..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7FBFF] border border-[#0C2A5C]/15 text-[#0C2A5C] placeholder-[#0C2A5C]/40 text-sm focus:outline-none focus:border-[#B58638] focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl btn-gold text-xs font-sans font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              >
                <span>Book Consultation Review</span>
                <Send className="w-4 h-4 text-[#0C2A5C]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
