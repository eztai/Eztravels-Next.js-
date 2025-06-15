
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Globe } from 'lucide-react';
import { trips } from '@/utils/mockData';

interface TripSelectorProps {
  selectedTripId?: string;
  onTripChange: (tripId: string) => void;
  placeholder?: string;
  showAllTripsOption?: boolean;
}

export const TripSelector: React.FC<TripSelectorProps> = ({
  selectedTripId,
  onTripChange,
  placeholder = "Select a trip",
  showAllTripsOption = false
}) => {
  const selectedTrip = selectedTripId === 'all' ? null : trips.find(trip => trip.id.toString() === selectedTripId);

  return (
    <Select value={selectedTripId} onValueChange={onTripChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder={placeholder}>
          {selectedTripId === 'all' ? (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="font-medium">All Trips</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {trips.length} trips
              </div>
            </div>
          ) : selectedTrip && (
            <div className="flex items-center gap-2">
              <span className="font-medium">{selectedTrip.title}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {selectedTrip.destination}
              </div>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[400px] bg-background border shadow-lg">
        {showAllTripsOption && (
          <SelectItem value="all" className="p-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  All Trips
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  View data across all {trips.length} trips
                </div>
              </div>
              <Badge variant="outline" className="ml-2">
                Overview
              </Badge>
            </div>
          </SelectItem>
        )}
        {trips.map((trip) => (
          <SelectItem key={trip.id} value={trip.id.toString()} className="p-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex-1">
                <div className="font-medium">{trip.title}</div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {trip.destination}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {trip.startDate} - {trip.endDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {trip.participants}
                  </div>
                </div>
              </div>
              <Badge 
                variant={
                  trip.status === 'upcoming' ? 'default' : 
                  trip.status === 'planned' ? 'outline' : 'secondary'
                }
                className="ml-2"
              >
                {trip.status === 'upcoming' ? 'Upcoming' : 
                 trip.status === 'planned' ? 'Planned' : 'Draft'}
              </Badge>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
