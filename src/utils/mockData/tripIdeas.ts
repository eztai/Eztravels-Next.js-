
export interface TripIdea {
  id: number;
  title: string;
  location: string;
  duration: string;
  budget: string;
  image: string;
  rating: number;
  tags: string[];
  aiGenerated: boolean;
  description: string;
  category: string;
}

export const allTripIdeas: TripIdea[] = [
  {
    id: 1,
    title: "Cherry Blossom Adventure",
    location: "Tokyo, Japan",
    duration: "7 days",
    budget: "$2,500",
    image: "https://source.unsplash.com/400x300/?tokyo,cherry-blossom",
    rating: 4.9,
    tags: ["Culture", "Spring", "Photography"],
    aiGenerated: true,
    description: "Experience Japan's iconic cherry blossom season",
    category: "cultural"
  },
  {
    id: 2,
    title: "Mediterranean Escape",
    location: "Santorini, Greece",
    duration: "5 days",
    budget: "$1,800",
    image: "https://source.unsplash.com/400x300/?santorini",
    rating: 4.8,
    tags: ["Beach", "Romantic", "Sunset"],
    aiGenerated: true,
    description: "Stunning sunsets and white-washed villages",
    category: "beach"
  },
  {
    id: 3,
    title: "Alpine Adventure",
    location: "Swiss Alps",
    duration: "6 days",
    budget: "$3,200",
    image: "https://source.unsplash.com/400x300/?swiss-alps",
    rating: 4.7,
    tags: ["Adventure", "Hiking", "Nature"],
    aiGenerated: false,
    description: "Breathtaking mountain landscapes and hiking",
    category: "mountain"
  },
  {
    id: 4,
    title: "Cultural Immersion",
    location: "Marrakech, Morocco",
    duration: "4 days",
    budget: "$1,200",
    image: "https://source.unsplash.com/400x300/?marrakech",
    rating: 4.6,
    tags: ["Culture", "Markets", "Food"],
    aiGenerated: true,
    description: "Vibrant souks and stunning architecture",
    category: "cultural"
  },
  {
    id: 5,
    title: "Tropical Paradise",
    location: "Maldives",
    duration: "7 days",
    budget: "$4,500",
    image: "https://source.unsplash.com/400x300/?maldives",
    rating: 4.9,
    tags: ["Beach", "Luxury", "Relaxation"],
    aiGenerated: true,
    description: "Overwater bungalows and crystal clear waters",
    category: "beach"
  },
  {
    id: 6,
    title: "Summer Beach Getaway",
    location: "Amalfi Coast, Italy",
    duration: "6 days",
    budget: "$2,800",
    image: "https://source.unsplash.com/400x300/?amalfi-coast",
    rating: 4.8,
    tags: ["Beach", "Food", "July"],
    aiGenerated: true,
    description: "Coastal charm and Italian cuisine",
    category: "beach"
  }
];
