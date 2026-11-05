import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_DESTINATIONS } from '../data/travelData';
import { ArrowUpRight } from 'lucide-react';

const VISA_BLURBS: Record<string, string> = {
  umrah: 'Nusuk, Umrah / tourist e-Visa, Haram-side hotel options.',
  hajj: 'Quota window, Nusuk Hajj, vaccination and bank proofs.',
  turkey: 'Sticker visa & e-Visa file check, hotel voucher, return itinerary.',
  'united-kingdom': 'Visitor / student file: funds, ties to Pakistan, Gerry’s appointment.',
};

export const CompactDestinations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="destinations-section"
      className="relative w-full py-20 md:py-28 section-night text-[#FBFAF6] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="reveal-text mb-10 max-w-2xl">
          <span className="tag-gold text-[13px] bg-white/10 text-[#E3C078] border-[#E3C078]/30">
            <span className="w-2 h-2 rounded-full bg-[#E3C078]" />
            <span>03 — Destinations</span>
          </span>
          <h2
            className="font-sans font-extrabold text-white mt-4"
            style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.15 }}
          >
            Four corridors we file most
          </h2>
          <p className="mt-3 text-[15px] text-white/75 font-sans leading-relaxed">
            Open a destination for visa notes, hubs, and a WhatsApp enquiry. Full itinerary copy lives on the inner page — not here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURED_DESTINATIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => navigate(`/destinations/${d.id}`)}
              className="reveal-card group flex flex-col text-left rounded-3xl overflow-hidden border border-[#E3C078]/30 bg-white/5 hover:border-[#E3C078]/70 transition-all"
            >
              <div className="relative aspect-[16/8] w-full shrink-0 overflow-hidden bg-[#0C2A5C]">
                <img
                  src={d.heroImage}
                  alt={d.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-sans font-bold uppercase tracking-wider text-[#E3C078]">
                    {d.region} · {d.flightDurationFromPakistan}
                  </p>
                  <h3 className="font-sans text-2xl font-extrabold text-white mt-1">{d.name}</h3>
                  <p className="mt-2 text-sm text-white/75 font-sans leading-relaxed">
                    {VISA_BLURBS[d.id] || d.tagline}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#E3C078] text-[#0C2A5C] flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
