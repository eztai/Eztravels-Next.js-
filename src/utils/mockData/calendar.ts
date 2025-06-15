
export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'travel' | 'accommodation' | 'activity' | 'food';
}

export const calendarEvents: CalendarEvent[] = [
  { id: 1, title: 'Flight to Bali', date: new Date(2025, 4, 10), time: '10:30 AM', location: 'JFK Airport', type: 'travel' },
  { id: 2, title: 'Hotel Check-in', date: new Date(2025, 4, 10), time: '3:00 PM', location: 'Beachfront Resort', type: 'accommodation' },
  { id: 3, title: 'Sunrise Trek', date: new Date(2025, 4, 11), time: '5:00 AM', location: 'Mount Batur', type: 'activity' },
  { id: 4, title: 'Spa Appointment', date: new Date(2025, 4, 12), time: '2:00 PM', location: 'Resort Spa', type: 'activity' },
  { id: 5, title: 'Dinner Reservation', date: new Date(2025, 4, 13), time: '7:30 PM', location: 'Seafood Restaurant', type: 'food' },
  { id: 6, title: 'Snorkeling Trip', date: new Date(2025, 4, 14), time: '9:00 AM', location: 'Coral Bay', type: 'activity' },
  { id: 7, title: 'Hotel Check-out', date: new Date(2025, 4, 17), time: '11:00 AM', location: 'Beachfront Resort', type: 'accommodation' },
  { id: 8, title: 'Flight to Home', date: new Date(2025, 4, 17), time: '4:45 PM', location: 'Denpasar Airport', type: 'travel' },
];
