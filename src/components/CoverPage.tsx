import React from 'react';
import { SectionCoverChain } from './SectionCoverStack';
import { Footer } from './Footer';

interface CoverPageProps {
  /** Page sections in scroll order; Footer is always appended as the final cover. */
  layers: React.ReactNode[];
  className?: string;
}

/**
 * Stacks page sections so each covers the previous (desktop), then Footer covers the last.
 */
export const CoverPage: React.FC<CoverPageProps> = ({ layers, className = '' }) => (
  <SectionCoverChain
    className={className}
    layers={[...layers, <Footer key="site-footer" />]}
  />
);
