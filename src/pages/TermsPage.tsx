import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/shared/PageHero';
import { BUSINESS_INFO } from '../data/travelData';
import { usePageMeta } from '../hooks/usePageMeta';
import { ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();
  usePageMeta({
    title: 'Safeer E Aman | Terms of Service',
    description:
      'Terms for Safeer E Aman advisory in Lahore: no visa guarantees, client responsibilities, and how consultation, ticketing, and Umrah enquiries are handled.',
    path: '/terms',
  });

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#182333]">
      <PageHero
        title="TERMS OF SERVICE & ADVISORY ENGAGEMENT"
        subtitle="Transparent operational conditions governing Safeer E Aman travel consulting services"
        breadcrumbItems={[
          { label: 'HOME', onClick: () => navigate('/') },
          { label: 'TERMS & CONDITIONS' },
        ]}
        accentColor="#B99A65"
      />

      <section className="py-20 md:py-28 max-w-4xl mx-auto px-6 md:px-12 font-sans space-y-8 text-[#687386] text-sm leading-relaxed">
        <div className="p-6 rounded-2xl bg-white border border-[#B99A65]/40 shadow-card-soft flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-[#B99A65] flex-shrink-0 mt-1" />
          <p className="text-[#182333]">
            <strong>Important Legal Notice:</strong> Safeer E Aman is an independent travel consultancy firm. We do not issue visas or guarantee visa approval. All decisions regarding visa issuance or refusal reside exclusively with sovereign foreign embassies and consulates.
          </p>
        </div>

        <div>
          <h2 className="font-editorial-serif text-2xl font-bold text-[#182333] mb-3">1. Scope of Services</h2>
          <p>
            Safeer E Aman assists clients with document evaluation, checklist preparation, procedural guidance, embassy form completion, flight itinerary reservations, and accommodation vouchers. We do not represent any government agency, embassy, high commission, or consular office.
          </p>
        </div>

        <div>
          <h2 className="font-editorial-serif text-2xl font-bold text-[#182333] mb-3">2. Document Authenticity Responsibility</h2>
          <p>
            The applicant bears 100% legal responsibility for the genuineness and truthfulness of all paperwork, financial records, employment proofs, and certificates submitted. Safeer E Aman strictly refuses any engagement involving falsified, fabricated, or altered documents.
          </p>
        </div>

        <div>
          <h2 className="font-editorial-serif text-2xl font-bold text-[#182333] mb-3">3. Professional Fees & Embassies Charges</h2>
          <p>
            Our consultancy fee covers the professional labor, case analysis, and administrative processing time of our advisors. Embassy visa application fees, biometric collection fees (e.g., VFS/Gerry’s), and medical examination charges are direct government/vendor fees and are non-refundable.
          </p>
        </div>

        <div>
          <h2 className="font-editorial-serif text-2xl font-bold text-[#182333] mb-3">4. Processing Timelines & Sovereign Delays</h2>
          <p>
            Any time estimates provided for visa processing represent historical averages published by embassies. Safeer E Aman has no control over administrative delays, additional background checks, or holiday backlogs incurred by consular authorities.
          </p>
        </div>

        <div className="pt-6 border-t border-[#DFD7C7] text-xs font-mono text-[#687386]">
          Safeer E Aman Travel Consultancy &bull; Registered in Lahore, Pakistan &bull; GT Road, Bata Pur &bull; {BUSINESS_INFO.phone}
        </div>
      </section>
    </div>
  );
};
