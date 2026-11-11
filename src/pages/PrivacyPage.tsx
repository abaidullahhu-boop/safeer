import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/shared/PageHero';
import { CoverPage } from '../components/CoverPage';
import { BUSINESS_INFO } from '../data/travelData';
import { usePageMeta } from '../hooks/usePageMeta';
import { Lock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();
  usePageMeta({
    title: 'Safeer E Aman | Privacy Policy',
    description:
      'How Safeer E Aman in Lahore collects, uses, and returns passport, financial, and travel documents shared for visa and booking advice.',
    path: '/privacy',
  });

  return (
    <CoverPage
      layers={[
        <div key="main" className="min-h-screen bg-[#F5F1E8] text-[#182333]">
          <PageHero
            title="CLIENT PRIVACY POLICY"
            subtitle="Our commitment to safeguarding applicant records, financial proofs, and identity data"
            breadcrumbItems={[
              { label: 'HOME', onClick: () => navigate('/') },
              { label: 'PRIVACY POLICY' },
            ]}
            accentColor="#B99A65"
          />

          <section className="py-20 md:py-28 max-w-4xl mx-auto px-6 md:px-12 font-sans space-y-8 text-[#687386] text-sm leading-relaxed">
            <div className="p-6 rounded-2xl bg-white border border-[#E9E3D7] shadow-card-soft flex items-start gap-4">
              <Lock className="w-6 h-6 text-[#B99A65] flex-shrink-0 mt-1" />
              <p className="text-[#182333]">
                Safeer E Aman handles sensitive personal, academic, and financial documents with strict confidentiality. We do not sell, rent, or distribute client data to any external marketing entities.
              </p>
            </div>

            <div>
              <h2 className="font-editorial-serif text-2xl font-bold text-[#182333] mb-3">1. Information Collection</h2>
              <p>
                To compile accurate consular applications and secure travel reservations, we collect necessary identification documents (passport biographical copies, CNIC), employment letters, bank statements, tax returns, and travel itineraries willingly shared by you.
              </p>
            </div>

            <div>
              <h2 className="font-editorial-serif text-2xl font-bold text-[#182333] mb-3">2. Purpose of Use</h2>
              <p>
                Your information is utilized solely for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1.5 pl-4">
                <li>Form filling on official embassy or visa portal platforms (e.g. VFS, Gerry’s, TLS, Nusuk).</li>
                <li>Drafting personalized cover letters, sponsorship affidavits, and itineraries.</li>
                <li>Securing confirmed flight reservations and hotel booking vouchers.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-editorial-serif text-2xl font-bold text-[#182333] mb-3">3. Data Retention & Security</h2>
              <p>
                Physical documents provided for office review are handled with care and returned promptly. Digital records transmitted for form processing are kept under secure systems and purged upon conclusion of the advisory engagement unless required for subsequent consular follow-up.
              </p>
            </div>

            <div className="pt-6 border-t border-[#DFD7C7] text-xs font-mono text-[#687386]">
              For privacy inquiries, please contact our Data Officer at info@safeereaman.com or visit our office at {BUSINESS_INFO.address}.
            </div>
          </section>
        </div>,
      ]}
    />
  );
};
