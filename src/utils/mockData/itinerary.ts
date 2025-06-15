
export interface Activity {
  id: number;
  time: string;
  title: string;
  location: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming' | 'planned';
  type: 'transport' | 'accommodation' | 'dining' | 'sightseeing';
  description?: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Itinerary {
  tripTitle: string;
  currentDay: number;
  totalDays: number;
  days: ItineraryDay[];
}

export const mockItinerary: Itinerary = {
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
