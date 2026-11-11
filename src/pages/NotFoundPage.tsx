import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';
import { usePageMeta } from '../hooks/usePageMeta';
import { CoverPage } from '../components/CoverPage';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();
  usePageMeta({
    title: 'Safeer E Aman | Page Not Found',
    description:
      'This address is not a page on the Safeer E Aman site. Return home or message the Lahore desk on WhatsApp.',
    path: location.pathname,
    noindex: true,
  });

  return (
    <CoverPage
      layers={[
        <section
          key="main"
          className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-[#F4F3EE] text-[#0C2A5C]"
        >
          <div className="max-w-xl text-center">
            <p className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-[#85601B]">
              Page not found
            </p>
            <h1 className="font-editorial-serif text-4xl sm:text-5xl font-bold mt-3">
              This page is not on the route.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#0C2A5C]/80">
              The address may be mistyped, or the page may have moved. Return home, or message the
              Lahore desk on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="px-6 py-3 rounded-full btn-gold text-xs font-sans font-bold uppercase"
              >
                Back to Home
              </Link>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full btn-secondary text-xs font-sans font-bold uppercase inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </section>,
      ]}
    />
  );
};
