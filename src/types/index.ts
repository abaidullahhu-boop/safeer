export interface Destination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  overview: string;
  heroImage: string;
  galleryImages: string[];
  keyHighlights: string[];
  visaGuidance: string[];
  popularHubs: string[];
  flightDurationFromPakistan: string;
}

export interface TravelService {
  id: string;
  title: string;
  tagline: string;
  category: 'Visa Advisory' | 'Pilgrimage' | 'Ticketing & Stay' | 'Documentation';
  summary: string;
  fullDetails: string;
  processWorkflow: { step: string; title: string; description: string }[];
  deliverables: string[];
  iconName: string;
}

export interface NarrativeStage {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
}
