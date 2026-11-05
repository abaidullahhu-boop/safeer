import React, { useMemo, useState } from 'react';
import { ChevronDown, ArrowRight, X, MessageCircle, Calendar } from 'lucide-react';
import { openWhatsApp, whatsAppLink } from '../utils/contact';

interface SolenneBookingBarProps {
  onCheckEligibility: (params: { destination: string; service: string; travellers: number; date: string }) => void;
}

const fieldShell =
  'relative min-w-0 rounded-[18px] bg-[#FFFDF6] px-4 py-2.5 shadow-[inset_0_0_0_1px_rgba(227,192,120,0.28)]';

export const SolenneBookingBar: React.FC<SolenneBookingBarProps> = ({ onCheckEligibility }) => {
  const [destination, setDestination] = useState('Umrah (Makkah & Madinah)');
  const [service, setService] = useState('Visit & Tourist Visa');
  const [travellers, setTravellers] = useState(1);
  const [date, setDate] = useState('2026-11-18');
  const [showStamp, setShowStamp] = useState(false);

  const destinationsList = [
    'Umrah (Makkah & Madinah)',
    'Hajj',
    'Turkey (Istanbul)',
    'United Kingdom (London)',
    'Schengen Europe (Paris/Rome)',
    'Dubai & UAE',
    'United States (B1/B2)',
    'Canada (Visitor Visa)',
  ];

  const servicesList = [
    'Visit & Tourist Visa',
    'Business & Trade Visa',
    'Student Visa Guidance',
    'Umrah Pilgrimage Package',
    'Flight PNR & Hotel Voucher',
    'Complete Dossier Audit',
  ];

  const formattedDate = useMemo(() => {
    if (!date) return 'Select date';
    const parsed = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  }, [date]);

  const getWhatsAppUrl = () =>
    whatsAppLink(
      `Hello Safeer E Aman,\nI checked eligibility for:\nDestination: ${destination}\nService: ${service}\nTravellers: ${travellers}\nIntended Date: ${date}\nPlease evaluate my case.`
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowStamp(true);
    onCheckEligibility({ destination, service, travellers, date });
    openWhatsApp(getWhatsAppUrl());
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto z-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row lg:items-stretch gap-2.5 lg:gap-2 rounded-[28px] lg:rounded-full bg-[#FBFAF6] p-2.5 lg:pl-3 lg:pr-1.5 lg:py-1.5 border border-[#E3C078]/45 shadow-[0_18px_50px_rgba(12,42,92,0.14)] text-[#0C2A5C]"
      >
        <div className={`${fieldShell} lg:flex-[1.35]`}>
          <label htmlFor="booking-destination" className="block text-[10px] font-sans font-bold text-[#85601B] uppercase tracking-[0.14em] mb-0.5">
            Destination Corridor
          </label>
          <div className="relative">
            <select
              id="booking-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-[13px] font-sans font-semibold text-[#0C2A5C] appearance-none cursor-pointer focus:outline-none pr-6 truncate"
            >
              {destinationsList.map((d) => (
                <option key={d} value={d} className="bg-[#FBFAF6] text-[#0C2A5C]">
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-[#0C2A5C]/55 pointer-events-none" />
          </div>
        </div>

        <div className={`${fieldShell} lg:flex-[1.15]`}>
          <label htmlFor="booking-service" className="block text-[10px] font-sans font-bold text-[#85601B] uppercase tracking-[0.14em] mb-0.5">
            Service Discipline
          </label>
          <div className="relative">
            <select
              id="booking-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-transparent text-[13px] font-sans font-semibold text-[#0C2A5C] appearance-none cursor-pointer focus:outline-none pr-6 truncate"
            >
              {servicesList.map((s) => (
                <option key={s} value={s} className="bg-[#FBFAF6] text-[#0C2A5C]">
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-[#0C2A5C]/55 pointer-events-none" />
          </div>
        </div>

        <div className={`${fieldShell} lg:flex-[0.85]`}>
          <label htmlFor="booking-date" className="block text-[10px] font-sans font-bold text-[#85601B] uppercase tracking-[0.14em] mb-0.5">
            Intended Date
          </label>
          <div className="relative flex items-center">
            <span className="pointer-events-none text-[13px] font-sans font-semibold text-[#0C2A5C]">
              {formattedDate}
            </span>
            <Calendar className="ml-auto w-4 h-4 text-[#0C2A5C]/50 pointer-events-none" />
            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className={`${fieldShell} lg:flex-[0.9] flex items-center justify-between gap-3`}>
          <div className="min-w-0">
            <label htmlFor="booking-travellers" className="block text-[10px] font-sans font-bold text-[#85601B] uppercase tracking-[0.14em] mb-0.5">
              Travellers
            </label>
            <output id="booking-travellers" className="block text-[13px] font-sans font-semibold text-[#0C2A5C]">
              {travellers} {travellers === 1 ? 'Guest' : 'Guests'}
            </output>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setTravellers(Math.max(1, travellers - 1))}
              aria-label="Fewer travellers"
              className="w-7 h-7 rounded-full bg-transparent text-[#0C2A5C]/70 hover:text-[#0C2A5C] text-lg leading-none flex items-center justify-center font-medium transition-colors"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setTravellers(Math.min(10, travellers + 1))}
              aria-label="More travellers"
              className="w-7 h-7 rounded-full bg-transparent text-[#0C2A5C]/70 hover:text-[#0C2A5C] text-lg leading-none flex items-center justify-center font-medium transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-gold shrink-0 w-full lg:w-auto self-stretch px-7 py-3.5 lg:py-0 rounded-full text-[12px] font-sans font-extrabold tracking-[0.08em] uppercase flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_4px_20px_rgba(181,134,56,0.35)]"
        >
          <span>Check Eligibility</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {showStamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-[#FBFAF6] border border-[#E3C078] shadow-[0_25px_60px_rgba(8,27,61,0.4)] p-8 text-center overflow-hidden animate-stampIn">
            <button
              onClick={() => setShowStamp(false)}
              aria-label="Close eligibility summary"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#0C2A5C]/60 hover:text-[#0C2A5C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-28 h-28 mx-auto mb-5 rounded-full border-4 border-dashed border-[#3EBFD2] flex flex-col items-center justify-center text-[#0C2A5C] rotate-[-12deg] shadow-[0_0_30px_rgba(62,191,210,0.35)] bg-[#E3F6F9]/80 transform scale-100 animate-stampSlam">
              <span className="text-xs font-sans font-bold text-[#85601B] uppercase tracking-wider">
                SAFEER E AMAN
              </span>
              <span className="text-base font-editorial-serif font-black text-[#0C2A5C] tracking-wide">
                ELIGIBILITY
              </span>
              <span className="text-xs font-sans font-extrabold text-[#3E9B5B] uppercase">
                AUDITED · LHE
              </span>
              <span className="text-xs font-mono text-[#0C2A5C]/60">
                {new Date().toLocaleDateString('en-GB')}
              </span>
            </div>

            <h3 className="font-editorial-serif text-2xl font-bold text-[#0C2A5C]">
              Preliminary Check Logged
            </h3>
            <p className="mt-2 text-xs sm:text-[13px] text-[#0C2A5C]/75 font-sans leading-relaxed">
              WhatsApp should have opened with your <strong>{destination}</strong> ({service}) check for {travellers} traveller(s). Nothing is stored on this site. If the chat did not open, use the button below.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={getWhatsAppUrl()}
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsApp(getWhatsAppUrl(), { web: true });
                }}
                className="w-full py-3.5 rounded-full btn-gold text-xs font-sans font-bold uppercase flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#0C2A5C]" />
                <span>Get Full Evaluation on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setShowStamp(false)}
                className="w-full py-2.5 rounded-full btn-secondary text-xs font-sans font-semibold text-[#0C2A5C]"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
