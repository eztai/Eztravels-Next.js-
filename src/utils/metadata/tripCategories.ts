
export interface TripCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const tripCategories: TripCategory[] = [
  {
    id: 'assistant-picks',
    name: 'Assistant Picks',
    slug: 'assistant-picks',
    description: 'AI-curated recommendations',
    icon: 'Sparkles'
  },
  {
    id: 'beach',
    name: 'Beach Escapes',
    slug: 'beach',
    description: 'Coastal destinations and beach resorts',
    icon: 'Sun'
  },
  {
    id: 'mountain',
    name: 'Mountain Adventures',
    slug: 'mountain',
    description: 'Mountain hiking and alpine experiences',
    icon: 'Mountain'
  },
  {
    id: 'cultural',
    name: 'Cultural Cities',
    slug: 'cultural',
    description: 'Cities rich in culture and history',
    icon: 'Building'
  }
];
