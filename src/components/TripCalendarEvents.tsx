
import React from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedTrip } from '@/utils/mockData';

interface TripCalendarEventsProps {
  selectedDate: Date | undefined;
  trips: EnhancedTrip[];
  onViewItinerary: (tripId: number) => void;
  onViewBudget: (tripId: number) => void;
}

export const TripCalendarEvents: React.FC<TripCalendarEventsProps> = ({
  selectedDate,
  trips,
  onViewItinerary,
  onViewBudget
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTripEvents = (date: Date) => {
    return trips.filter(trip => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  if (!selectedDate) {
    return <p className="text-muted-foreground">Select a date to see your trips</p>;
  }

  const eventsOnDate = getTripEvents(selectedDate);

  return (
    <div className="space-y-3">
      {eventsOnDate.map(trip => (
        <div key={trip.id} className="p-3 border rounded-lg">
          <h4 className="font-semibold">{trip.title}</h4>
          <p className="text-sm text-muted-foreground">{trip.destination}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </p>
          <div className="flex gap-2 mt-2">
            <Button 
              size="sm" 
              onClick={() => onViewItinerary(trip.id)}
            >
              View Itinerary
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onViewBudget(trip.id)}
            >
              Budget
            </Button>
          </div>
        </div>
      ))}
      {eventsOnDate.length === 0 && (
        <p className="text-muted-foreground">No trips on this date</p>
      )}
    </div>
  );
};
