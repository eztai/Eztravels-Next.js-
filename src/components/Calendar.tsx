
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

// Sample calendar events
const events = [
  { id: 1, title: 'Flight to Bali', date: new Date(2025, 4, 10), time: '10:30 AM', location: 'JFK Airport', type: 'travel' },
  { id: 2, title: 'Hotel Check-in', date: new Date(2025, 4, 10), time: '3:00 PM', location: 'Beachfront Resort', type: 'accommodation' },
  { id: 3, title: 'Sunrise Trek', date: new Date(2025, 4, 11), time: '5:00 AM', location: 'Mount Batur', type: 'activity' },
  { id: 4, title: 'Spa Appointment', date: new Date(2025, 4, 12), time: '2:00 PM', location: 'Resort Spa', type: 'activity' },
  { id: 5, title: 'Dinner Reservation', date: new Date(2025, 4, 13), time: '7:30 PM', location: 'Seafood Restaurant', type: 'food' },
  { id: 6, title: 'Snorkeling Trip', date: new Date(2025, 4, 14), time: '9:00 AM', location: 'Coral Bay', type: 'activity' },
  { id: 7, title: 'Hotel Check-out', date: new Date(2025, 4, 17), time: '11:00 AM', location: 'Beachfront Resort', type: 'accommodation' },
  { id: 8, title: 'Flight to Home', date: new Date(2025, 4, 17), time: '4:45 PM', location: 'Denpasar Airport', type: 'travel' },
];

const Calendar: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );

  // Get event dates for highlighting in calendar
  const eventDates = events.map(event => event.date);
  
  // Function to get CSS class for event type
  const getEventClass = (type: string) => {
    switch(type) {
      case 'travel':
        return 'bg-primary text-primary-foreground';
      case 'accommodation':
        return 'bg-secondary text-secondary-foreground';
      case 'activity':
        return 'bg-accent text-accent-foreground';
      case 'food':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <div id="calendar" className="py-8">
      <h2 className="text-2xl font-bold mb-6">Trip Calendar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                eventDay: (day) => 
                  eventDates.some(eventDate => 
                    eventDate.toDateString() === day.toDate().toDateString()
                  )
              }}
              modifiersStyles={{
                eventDay: {
                  fontWeight: 'bold',
                  border: '2px solid var(--primary)',
                  color: 'var(--primary)'
                }
              }}
            />
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Travel</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span>Accommodation</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span>Activity</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={`p-3 rounded-lg ${getEventClass(event.type)} flex flex-col`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No events scheduled for this day</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
