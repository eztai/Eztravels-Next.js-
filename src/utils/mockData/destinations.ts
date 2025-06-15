
export interface Destination {
  id: number;
  name: string;
  country: string;
  rating: number;
  image: string;
  tags: string[];
  description: string;
  price: string;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini, Greece",
    country: "Greece",
    rating: 4.8,
    image: "https://source.unsplash.com/400x300/?santorini",
    tags: ["Beach", "Romantic", "Views"],
    description: "Stunning sunsets and white-washed buildings",
    price: "$200-400/night"
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    country: "Japan",
    rating: 4.9,
    image: "https://source.unsplash.com/400x300/?kyoto",
    tags: ["Culture", "Temple", "Traditional"],
    description: "Ancient temples and beautiful gardens",
    price: "$100-250/night"
  },
  {
    id: 3,
    name: "Banff National Park",
    country: "Canada",
    rating: 4.7,
    image: "https://source.unsplash.com/400x300/?banff",
    tags: ["Nature", "Adventure", "Hiking"],
    description: "Breathtaking mountain landscapes",
    price: "$150-300/night"
  }
];
