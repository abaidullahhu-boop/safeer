import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-[12px] font-sans font-semibold tracking-wide uppercase text-[#FBFAF6]/70">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight className="w-3 h-3 text-[#E3C078]/50" />}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-[#E3C078] transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[#FBFAF6] font-bold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
