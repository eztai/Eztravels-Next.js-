
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pin, PinOff } from 'lucide-react';
import { EnhancedTripCard } from '@/components/EnhancedTripCard';
import { EnhancedTrip } from '@/utils/mockData';

interface TripCardGridProps {
  trips: EnhancedTrip[];
  pinnedTrips: number[];
  viewMode: 'grid' | 'list';
  onViewItinerary: (tripId: number) => void;
  onViewBudget: (tripId: number) => void;
  onEditTrip: (tripId: number) => void;
  onTogglePin: (tripId: number) => void;
}

export const TripCardGrid: React.FC<TripCardGridProps> = ({
  trips,
  pinnedTrips,
  viewMode,
  onViewItinerary,
  onViewBudget,
  onEditTrip,
  onTogglePin
}) => {
  const pinnedTripsData = trips.filter(trip => pinnedTrips.includes(trip.id));
  const unpinnedTrips = trips.filter(trip => !pinnedTrips.includes(trip.id));

  return (
    <div className="space-y-4">
      {pinnedTripsData.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Pin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Pinned</span>
          </div>
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {pinnedTripsData.map(trip => (
              <div key={trip.id} className="relative">
                <EnhancedTripCard
                  trip={trip}
                  onViewItinerary={onViewItinerary}
                  onViewBudget={onViewBudget}
                  onEditTrip={onEditTrip}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 left-2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
                  onClick={() => onTogglePin(trip.id)}
                >
                  <PinOff className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {unpinnedTrips.length > 0 && (
        <div>
          {pinnedTripsData.length > 0 && (
            <div className="flex items-center gap-2 mb-3 mt-6">
              <span className="text-sm font-medium text-muted-foreground">Other Trips</span>
            </div>
          )}
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {unpinnedTrips.map(trip => (
              <div key={trip.id} className="relative">
                <EnhancedTripCard
                  trip={trip}
                  onViewItinerary={onViewItinerary}
                  onViewBudget={onViewBudget}
                  onEditTrip={onEditTrip}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 left-2 w-8 h-8 p-0 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onTogglePin(trip.id)}
                >
                  <Pin className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
