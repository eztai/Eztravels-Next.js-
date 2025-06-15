
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Navigation, Plus, Users } from 'lucide-react';
import { TripSelector } from '@/components/TripSelector';

interface ItineraryHeaderProps {
  selectedTripId: string;
  onTripChange: (tripId: string) => void;
  editMode: boolean;
  onEditModeChange: (edit: boolean) => void;
  onAddActivity: () => void;
  tripTitle: string;
  currentDay: number;
  totalDays: number;
  isAllTrips: boolean;
}

export const ItineraryHeader: React.FC<ItineraryHeaderProps> = ({
  selectedTripId,
  onTripChange,
  editMode,
  onEditModeChange,
  onAddActivity,
  tripTitle,
  currentDay,
  totalDays,
  isAllTrips
}) => {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-4">
          <TripSelector
            selectedTripId={selectedTripId}
            onTripChange={onTripChange}
            placeholder="Select a trip to view itinerary"
            showAllTripsOption={true}
          />
          
          {!isAllTrips && (
            <div className="h-12 w-1 bg-primary rounded-full relative">
              <div 
                className="absolute w-3 h-3 bg-primary rounded-full -left-1 transition-all duration-500"
                style={{ 
                  top: `${(currentDay / totalDays) * 100}%`,
                  transform: 'translateY(-50%)'
                }}
              />
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={editMode ? "default" : "outline"} 
            size="sm"
            onClick={() => onEditModeChange(!editMode)}
            disabled={isAllTrips}
          >
            <Edit className="h-4 w-4 mr-1" />
            {editMode ? 'Done' : 'Edit'}
          </Button>
          <Button variant="outline" size="sm" disabled={isAllTrips}>
            <Navigation className="h-4 w-4 mr-1" />
            Navigate
          </Button>
          <Button size="sm" onClick={onAddActivity} disabled={isAllTrips}>
            <Plus className="h-4 w-4 mr-1" />
            Add Activity
          </Button>
        </div>
      </div>

      <div className="pb-2">
        <h1 className="text-3xl font-bold">{tripTitle}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          {isAllTrips ? (
            <>
              <span>{totalDays} days total</span>
              <Badge variant="outline" className="bg-blue-50">
                <Users className="h-3 w-3 mr-1" />
                All travelers
              </Badge>
            </>
          ) : (
            <>
              <span>Day {currentDay} of {totalDays}</span>
              <Badge variant="outline" className="bg-blue-50">
                <Users className="h-3 w-3 mr-1" />
                3 travelers
              </Badge>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
