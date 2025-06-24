'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Trash2, Edit, Plus, Calendar } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  tags: string[];
  tripType: 'current' | 'future';
  addedAt: Date;
}

interface AIItineraryBuilderProps {
  addedDestinations: Destination[];
  onRemoveDestination: (id: string) => void;
}

const AIItineraryBuilder: React.FC<AIItineraryBuilderProps> = ({
  addedDestinations,
  onRemoveDestination
}) => {
  const [selectedTrip, setSelectedTrip] = useState<'current' | 'future'>('current');

  const currentTripDestinations = addedDestinations.filter(dest => dest.tripType === 'current');
  const futureTripDestinations = addedDestinations.filter(dest => dest.tripType === 'future');

  const displayDestinations = selectedTrip === 'current' ? currentTripDestinations : futureTripDestinations;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Itinerary</h2>
        <div className="flex gap-2">
          <Button
            variant={selectedTrip === 'current' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTrip('current')}
          >
            Current Trip ({currentTripDestinations.length})
          </Button>
          <Button
            variant={selectedTrip === 'future' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTrip('future')}
          >
            Future Trips ({futureTripDestinations.length})
          </Button>
        </div>
      </div>

      {displayDestinations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No destinations added yet</h3>
            <p className="text-muted-foreground text-center">
              Start exploring destinations and add them to your {selectedTrip} trip to build your itinerary.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayDestinations.map((destination, index) => (
            <Card key={destination.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{destination.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {destination.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => onRemoveDestination(destination.id.toString())}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{destination.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {destination.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Added {destination.addedAt.toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    View on Map
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Activities
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {displayDestinations.length > 0 && (
            <Card className="border-dashed">
              <CardContent className="flex items-center justify-center py-8">
                <Button variant="ghost" className="text-muted-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Add more destinations to your {selectedTrip} trip
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AIItineraryBuilder;
