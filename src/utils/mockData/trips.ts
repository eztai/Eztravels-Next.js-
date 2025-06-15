
export interface Trip {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'planned' | 'completed';
  budget: number;
  spent: number;
  travelers: number;
  image: string;
}

export interface EnhancedTrip extends Omit<Trip, 'travelers'> {
  travelers: Array<{
    id: string;
    name: string;
    confirmed: boolean;
  }>;
  progress: {
    budget: { used: number; total: number };
    activities: { planned: number; total: number };
    confirmations: { flights: boolean; accommodation: boolean };
  };
  nextActivity?: string;
  pinned?: boolean;
}

export const currentTrips: Trip[] = [
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
];

export const upcomingTrips: Trip[] = [
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
];

export const pastTrips: Trip[] = [
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
];

export const mockTrips = {
  current: currentTrips,
  upcoming: upcomingTrips,
  past: pastTrips
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
