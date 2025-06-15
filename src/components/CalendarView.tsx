
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { TripCalendarEvents } from '@/components/TripCalendarEvents';
import { EnhancedTrip } from '@/utils/mockData';

interface CalendarViewProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  trips: EnhancedTrip[];
  onViewItinerary: (tripId: number) => void;
  onViewBudget: (tripId: number) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  onSelectDate,
  trips,
  onViewItinerary,
  onViewBudget
}) => {
  // Get all trip dates for calendar highlighting
  const getTripDates = () => {
    const dates: Date[] = [];
    trips.forEach(trip => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      
      // Add all dates between start and end
      const currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return dates;
  };

  const tripDates = getTripDates();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Trip Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className="rounded-md border pointer-events-auto"
            modifiers={{
              tripDay: (date) => 
                tripDates.some(tripDate => 
                  tripDate.toDateString() === date.toDateString()
                )
            }}
            modifiersStyles={{
              tripDay: { 
                backgroundColor: 'hsl(var(--primary))', 
                color: 'white',
                fontWeight: 'bold'
              },
            }}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? `Trips on ${selectedDate.toLocaleDateString()}` : 'Select a date'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TripCalendarEvents
            selectedDate={selectedDate}
            trips={trips}
            onViewItinerary={onViewItinerary}
            onViewBudget={onViewBudget}
          />
        </CardContent>
      </Card>
    </div>
  );
};
