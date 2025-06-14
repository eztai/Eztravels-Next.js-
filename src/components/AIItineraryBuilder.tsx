
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  X, 
  Edit2,
  Navigation
} from 'lucide-react';

interface ItineraryItem {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'activity' | 'transport';
  time?: string;
  location: string;
  price?: string;
  description?: string;
}

interface ItineraryDay {
  date: string;
  items: ItineraryItem[];
}

const mockItinerary: ItineraryDay[] = [
  {
    date: "March 15, 2025",
    items: [
      {
        id: "1",
        name: "Hotel Check-in",
        type: "hotel",
        time: "3:00 PM",
        location: "Santorini Princess Hotel",
        price: "$250",
        description: "Luxury hotel with caldera views"
      },
      {
        id: "2",
        name: "Welcome Dinner",
        type: "restaurant",
        time: "7:30 PM",
        location: "Ammoudi Fish Tavern",
        price: "$85",
        description: "Fresh seafood by the water"
      }
    ]
  },
  {
    date: "March 16, 2025",
    items: [
      {
        id: "3",
        name: "Sunset Tour",
        type: "activity",
        time: "10:00 AM",
        location: "Oia Village",
        price: "$45",
        description: "Explore the famous blue domes"
      },
      {
        id: "4",
        name: "Wine Tasting",
        type: "activity",
        time: "3:00 PM",
        location: "Santo Wines Winery",
        price: "$35",
        description: "Local wine varieties with volcano views"
      }
    ]
  }
];

interface AIItineraryBuilderProps {
  addedDestinations: any[];
  onRemoveDestination: (id: string) => void;
}

const AIItineraryBuilder: React.FC<AIItineraryBuilderProps> = ({ 
  addedDestinations, 
  onRemoveDestination 
}) => {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(mockItinerary);
  const [totalBudget, setTotalBudget] = useState(415);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'restaurant': return '🍽️';
      case 'activity': return '🎯';
      case 'transport': return '🚗';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'bg-blue-500';
      case 'restaurant': return 'bg-orange-500';
      case 'activity': return 'bg-green-500';
      case 'transport': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Trip Itinerary</span>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4" />
              <span className="font-mono">${totalBudget}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recently Added */}
          {addedDestinations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Recently Added</h4>
              {addedDestinations.map(dest => (
                <div key={dest.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{dest.name}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveDestination(dest.id.toString())}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Separator />
            </div>
          )}

          {/* Itinerary Days */}
          {itinerary.map((day, dayIndex) => (
            <div key={dayIndex} className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="font-medium">{day.date}</h3>
              </div>
              
              <div className="space-y-2 ml-6">
                {day.items.map((item, itemIndex) => (
                  <div key={item.id} className="relative">
                    {/* Timeline line */}
                    {itemIndex < day.items.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-border" />
                    )}
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                      <div className={`w-8 h-8 rounded-full ${getTypeColor(item.type)} flex items-center justify-center text-white text-sm relative z-10`}>
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex items-center gap-2">
                            {item.price && (
                              <Badge variant="outline" className="text-xs">
                                {item.price}
                              </Badge>
                            )}
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          {item.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.time}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            {item.location}
                          </div>
                        </div>
                        
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            + Add Activity
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIItineraryBuilder;
