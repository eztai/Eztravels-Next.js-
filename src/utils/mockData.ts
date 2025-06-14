
// Mock trip data
export const mockTrips = {
  current: [
    {
      id: 1,
      title: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      startDate: "2024-06-15",
      endDate: "2024-06-22",
      status: "active",
      budget: 3500,
      spent: 1200,
      travelers: 2,
      image: "https://source.unsplash.com/400x200/?tokyo"
    }
  ],
  upcoming: [
    {
      id: 2,
      title: "European Summer",
      destination: "Paris, France",
      startDate: "2024-08-10",
      endDate: "2024-08-20",
      status: "planned",
      budget: 4000,
      spent: 0,
      travelers: 3,
      image: "https://source.unsplash.com/400x200/?paris"
    },
    {
      id: 3,
      title: "Iceland Road Trip",
      destination: "Reykjavik, Iceland",
      startDate: "2024-09-05",
      endDate: "2024-09-12",
      status: "planned",
      budget: 2800,
      spent: 0,
      travelers: 2,
      image: "https://source.unsplash.com/400x200/?iceland"
    }
  ],
  past: [
    {
      id: 4,
      title: "Bali Retreat",
      destination: "Ubud, Bali",
      startDate: "2024-03-01",
      endDate: "2024-03-10",
      status: "completed",
      budget: 2000,
      spent: 1850,
      travelers: 2,
      image: "https://source.unsplash.com/400x200/?bali"
    }
  ]
};

export const savedLocations = [
  { id: 1, name: "Santorini, Greece", category: "Beach", savedDate: "2024-05-01" },
  { id: 2, name: "Machu Picchu, Peru", category: "Adventure", savedDate: "2024-04-15" },
  { id: 3, name: "Swiss Alps", category: "Nature", savedDate: "2024-03-20" }
];

// Mock itinerary data
export const mockItinerary = {
  tripTitle: "Tokyo Adventure",
  currentDay: 2,
  totalDays: 7,
  days: [
    {
      day: 1,
      date: "June 15, 2024",
      activities: [
        {
          id: 1,
          time: "09:00",
          title: "Arrive at Narita Airport",
          location: "Narita International Airport",
          duration: "2 hours",
          status: "completed",
          type: "transport"
        },
        {
          id: 2,
          time: "14:00",
          title: "Check-in at Hotel",
          location: "Shibuya District",
          duration: "1 hour",
          status: "completed",
          type: "accommodation"
        },
        {
          id: 3,
          time: "16:00",
          title: "Explore Shibuya Crossing",
          location: "Shibuya Crossing",
          duration: "2 hours",
          status: "completed",
          type: "sightseeing"
        }
      ]
    },
    {
      day: 2,
      date: "June 16, 2024",
      activities: [
        {
          id: 4,
          time: "09:00",
          title: "Visit Senso-ji Temple",
          location: "Asakusa",
          duration: "2 hours",
          status: "current",
          type: "sightseeing"
        },
        {
          id: 5,
          time: "12:00",
          title: "Lunch at Traditional Restaurant",
          location: "Asakusa",
          duration: "1.5 hours",
          status: "upcoming",
          type: "dining"
        },
        {
          id: 6,
          time: "15:00",
          title: "Tokyo Skytree",
          location: "Sumida",
          duration: "3 hours",
          status: "upcoming",
          type: "sightseeing"
        }
      ]
    },
    {
      day: 3,
      date: "June 17, 2024",
      activities: [
        {
          id: 7,
          time: "10:00",
          title: "Tsukiji Outer Market",
          location: "Tsukiji",
          duration: "2 hours",
          status: "planned",
          type: "dining"
        },
        {
          id: 8,
          time: "14:00",
          title: "Imperial Palace Gardens",
          location: "Chiyoda",
          duration: "2 hours",
          status: "planned",
          type: "sightseeing"
        }
      ]
    }
  ]
};

// Sample trip data for TripList component
export const trips = [
  {
    id: 1,
    title: 'Bali Adventure',
    destination: 'Bali, Indonesia',
    startDate: 'May 10, 2025',
    endDate: 'May 17, 2025',
    participants: 2,
    status: 'upcoming',
    image: 'https://source.unsplash.com/random/300x200/?bali'
  },
  {
    id: 2,
    title: 'Tokyo Exploration',
    destination: 'Tokyo, Japan',
    startDate: 'July 15, 2025',
    endDate: 'July 25, 2025',
    participants: 1,
    status: 'planned',
    image: 'https://source.unsplash.com/random/300x200/?tokyo'
  },
  {
    id: 3,
    title: 'Paris Getaway',
    destination: 'Paris, France',
    startDate: 'October 3, 2025',
    endDate: 'October 10, 2025',
    participants: 2,
    status: 'draft',
    image: 'https://source.unsplash.com/random/300x200/?paris'
  }
];

// Sample calendar events
export const calendarEvents = [
  { id: 1, title: 'Flight to Bali', date: new Date(2025, 4, 10), time: '10:30 AM', location: 'JFK Airport', type: 'travel' },
  { id: 2, title: 'Hotel Check-in', date: new Date(2025, 4, 10), time: '3:00 PM', location: 'Beachfront Resort', type: 'accommodation' },
  { id: 3, title: 'Sunrise Trek', date: new Date(2025, 4, 11), time: '5:00 AM', location: 'Mount Batur', type: 'activity' },
  { id: 4, title: 'Spa Appointment', date: new Date(2025, 4, 12), time: '2:00 PM', location: 'Resort Spa', type: 'activity' },
  { id: 5, title: 'Dinner Reservation', date: new Date(2025, 4, 13), time: '7:30 PM', location: 'Seafood Restaurant', type: 'food' },
  { id: 6, title: 'Snorkeling Trip', date: new Date(2025, 4, 14), time: '9:00 AM', location: 'Coral Bay', type: 'activity' },
  { id: 7, title: 'Hotel Check-out', date: new Date(2025, 4, 17), time: '11:00 AM', location: 'Beachfront Resort', type: 'accommodation' },
  { id: 8, title: 'Flight to Home', date: new Date(2025, 4, 17), time: '4:45 PM', location: 'Denpasar Airport', type: 'travel' },
];

// Destinations for trip creation
export const destinations = [
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
