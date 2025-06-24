'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TripCardGrid } from '@/components/TripCardGrid';
import { type EnhancedTrip } from '@/utils/mockData';

interface TripsTabContentProps {
  trips: EnhancedTrip[];
  pinnedTrips: number[];
  viewMode: 'grid' | 'list';
  onViewItinerary: (tripId: number) => void;
  onViewBudget: (tripId: number) => void;
  onEditTrip: (tripId: number) => void;
  onTogglePin: (tripId: number) => void;
  emptyTitle: string;
  emptyDescription: string;
}

export const TripsTabContent: React.FC<TripsTabContentProps> = ({
  trips,
  pinnedTrips,
  viewMode,
  onViewItinerary,
  onViewBudget,
  onEditTrip,
  onTogglePin,
  emptyTitle,
  emptyDescription
}) => {
  const router = useRouter();

  if (trips.length === 0) {
    return (
      <div className="text-center p-12">
        <h3 className="text-lg font-medium mb-2">{emptyTitle}</h3>
        <p className="text-sm text-muted-foreground mb-4">{emptyDescription}</p>
        <Button onClick={() => router.push('/trips/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Trip
        </Button>
      </div>
    );
  }

  return (
    <TripCardGrid
      trips={trips}
      pinnedTrips={pinnedTrips}
      viewMode={viewMode}
      onViewItinerary={onViewItinerary}
      onViewBudget={onViewBudget}
      onEditTrip={onEditTrip}
      onTogglePin={onTogglePin}
    />
  );
};
