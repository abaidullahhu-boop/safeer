import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  accentColor?: string;
}

export const FAQ: React.FC<FAQProps> = ({
  items,
  title = 'Quick answers',
  subtitle = 'Plain replies — no visa guarantees',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden border-t border-[#E3C078]/30"
      style={{ background: 'linear-gradient(160deg, #FBF7EA 0%, #F6E7BE 42%, #D6F1F5 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-16">
        <div className="mb-8">
          <span className="tag-gold mb-3 inline-flex">
            <span className="w-2 h-2 rounded-full bg-[#B58638]" />
            <span>{title}</span>
          </span>
          <h2 className="heading-section">Straight answers</h2>
          <p className="mt-2 text-[15px] text-[#0C2A5C]/70 font-sans">{subtitle}</p>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="rounded-2xl card-pearl overflow-hidden border border-[#E3C078]/35"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-sans text-[15px] sm:text-base font-extrabold text-[#0C2A5C]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#85601B] flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={`px-5 pb-5 text-[14px] text-[#0C2A5C]/75 font-sans leading-relaxed transition-opacity duration-500 motion-reduce:transition-none ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
