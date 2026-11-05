import React from 'react';
import { Breadcrumb } from './Breadcrumb';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbItems: { label: string; onClick?: () => void }[];
  accentColor?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  breadcrumbItems,
  accentColor = '#B99A65',
}) => {
  return (
    <section className="relative w-full min-h-[48vh] flex items-end overflow-hidden bg-[#101B2A]">
      {/* Background image with carefully calibrated luxury overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover brightness-[0.45] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B2A] via-[#101B2A]/60 to-[#101B2A]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101B2A]/80 via-transparent to-transparent" />
        </div>
      )}

      {/* Fallback gradient background */}
      {!backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(180deg, #18283A 0%, #101B2A 100%)`,
          }}
        >
          <div
            className="absolute top-1/2 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none -translate-y-1/2"
            style={{
              background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 pb-12 pt-36">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="font-sans text-3xl sm:text-5xl md:text-[56px] font-extrabold text-[#FBFAF6] tracking-tight leading-[1.12] mt-4 max-w-[800px]">
          {title}
        </h1>
        {subtitle && (
          <p className="font-sans text-[15px] sm:text-base mt-3 max-w-2xl text-[#E3C078] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};
