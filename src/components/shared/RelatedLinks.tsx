import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  accent?: string;
  image?: string;
}

interface RelatedLinksProps {
  title: string;
  items: LinkItem[];
}

export const RelatedLinks: React.FC<RelatedLinksProps> = ({ title, items }) => {
  return (
    <section
      className="py-16 border-t border-[#E3C078]/30"
      style={{ background: 'linear-gradient(160deg, #FBF7EA 0%, #F6E7BE 42%, #D6F1F5 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <span className="tag-gold mb-3 inline-flex">
          <span className="w-2 h-2 rounded-full bg-[#B58638]" />
          <span>Related</span>
        </span>
        <h3 className="heading-section mb-8">{title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className="rounded-2xl card-pearl text-left transition-transform hover:-translate-y-0.5 group flex flex-col justify-between min-h-[140px] overflow-hidden"
            >
              {item.image && (
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2A5C]/30 to-transparent pointer-events-none" />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="text-[12px] font-sans font-semibold text-[#85601B] block mb-1">
                    {item.subtitle}
                  </span>
                  <h4 className="font-sans text-base font-extrabold text-[#0C2A5C] group-hover:text-[#85601B] transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E3C078]/30 text-[11px] font-sans font-bold uppercase tracking-wider text-[#85601B]">
                  <span>Open</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
