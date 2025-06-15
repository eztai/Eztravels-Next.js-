
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { savedLocations } from '@/utils/mockData';

export const SavedLocationsView: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {savedLocations.map(location => (
        <Card key={location.id}>
          <CardContent className="p-4">
            <h3 className="font-semibold">{location.name}</h3>
            <p className="text-sm text-muted-foreground">{location.category}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Saved {formatDate(location.savedDate)}
            </p>
            <Button size="sm" className="w-full mt-3">
              Add to Trip
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
