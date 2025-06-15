
export interface UpcomingTrip {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  image: string;
}

export const mockUpcomingTrips: UpcomingTrip[] = [
  {
    id: 1,
    destination: 'Tokyo, Japan',
    startDate: '2024-07-15',
    endDate: '2024-07-22',
    budget: 3500,
    spent: 1200,
    image: '/placeholder.svg'
  },
  {
    id: 2,
    destination: 'Paris, France',
    startDate: '2024-08-10',
    endDate: '2024-08-17',
    budget: 2800,
    spent: 800,
    image: '/placeholder.svg'
  }
];

export const mockUserStats = {
  remainingBudget: {
    total: 4100,
    trips: [
      { name: 'Tokyo Trip', amount: 2300 },
      { name: 'Paris Trip', amount: 1800 }
    ]
  },
  nextItineraryItem: {
    title: 'Flight to Tokyo',
    date: 'July 15, 2024 at 2:30 PM',
    details: {
      terminal: 'Terminal 3, Gate A12',
      note: 'Check-in opens 24h before'
    }
  },
  splitBills: [
    {
      id: 1,
      type: 'owe',
      person: 'Sarah',
      description: 'Hotel booking',
      amount: 18,
      color: 'orange'
    },
    {
      id: 2,
      type: 'owed',
      person: 'Mike',
      description: 'Restaurant bill',
      amount: 25,
      color: 'green'
    }
  ]
};
