import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/shared/PageHero';
import { PrivateConcierge } from '../components/PrivateConcierge';
import { BUSINESS_INFO } from '../data/travelData';
import { usePageMeta } from '../hooks/usePageMeta';
import { MessageCircle, Compass, Navigation } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  usePageMeta({
    title: 'Safeer E Aman | Contact',
    description:
      'Visit Safeer E Aman at Bata Pur, GT Road, Lahore, or send your case on WhatsApp. Office hours Monday to Saturday, 10:00 AM to 7:00 PM PKT.',
    path: '/contact',
  });

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#182333]">
      <PageHero
        title="CONTACT & LOCATION"
        subtitle="Conveniently located on Main Grand Trunk Road, Bata Pur, Lahore with direct digital advisory across Pakistan"
        backgroundImage="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80"
        breadcrumbItems={[
          { label: 'HOME', onClick: () => navigate('/') },
          { label: 'CONTACT' },
        ]}
        accentColor="#B99A65"
      />

      {/* Dimensional Map-Inspired Composition */}
      <section className="py-16 max-w-6xl mx-auto px-6 md:px-16">
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-[#E9E3D7] shadow-card-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F1E8] border border-[#B99A65]/30 text-xs font-mono tracking-widest text-[#B99A65] uppercase font-bold">
              <Navigation className="w-3.5 h-3.5" />
              <span>HEAD OFFICE COORDINATES · LAHORE</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold editorial-dark-text">
              Awan Brothers Oil Mills, Raam Pura Stop
            </h2>
            <p className="text-sm text-[#687386] font-sans leading-relaxed">
              Main Grand Trunk (GT) Road, Bata Pur, Lahore, Pakistan. Easy road access from Lahore Cantt, Ring Road, and surrounding districts of Punjab.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full btn-champagne uppercase font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>DIRECT WHATSAPP DESK</span>
              </a>
              <span className="text-[#687386]">{BUSINESS_INFO.phone}</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#101B2A] text-white border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#D3BA8D] text-xs font-mono">
              <Compass className="w-4 h-4 text-[#B99A65]" />
              <span>IN-PERSON APPOINTMENTS</span>
            </div>
            <h4 className="font-editorial-serif text-xl font-bold">
              Face-to-Face Document Audit
            </h4>
            <p className="text-xs text-[#E9E3D7] leading-relaxed">
              Bring your passport, bank statements, tax returns, and travel history for a thorough, confidential review by our advisors.
            </p>
            <div className="pt-2 text-xs font-mono text-[#D3BA8D] border-t border-white/10">
              Monday – Saturday: 10:00 AM – 7:00 PM (PKT)
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Concierge Inquiry Form */}
      <PrivateConcierge prefilledService="Comprehensive In-Person Consultation" />
    </div>
  );
};
