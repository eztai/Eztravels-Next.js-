
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Layers, Clock } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  location: string;
  time: string;
  type: string;
  status: string;
}

interface MapViewComponentProps {
  activities: Activity[];
}

export const MapViewComponent: React.FC<MapViewComponentProps> = ({ activities }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transport': return '🚗';
      case 'accommodation': return '🏨';
      case 'dining': return '🍽️';
      case 'sightseeing': return '📸';
      default: return '📍';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      case 'upcoming': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Map placeholder with activity pins */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
              {/* Simulated map pins */}
              {activities.slice(0, 6).map((activity, index) => (
                <div
                  key={activity.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    left: `${20 + (index * 12)}%`,
                    top: `${30 + (index % 3) * 20}%`,
                  }}
                >
                  <div className={`w-8 h-8 rounded-full ${getStatusColor(activity.status)} flex items-center justify-center text-white text-sm shadow-lg border-2 border-white`}>
                    {index + 1}
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap border">
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
              
              {/* Route lines */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 20% 30% Q 35% 25% 32% 50% Q 45% 65% 44% 70% Q 55% 45% 56% 90%"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  fill="none"
                  className="opacity-60"
                />
              </svg>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <Button variant="outline" size="sm" className="bg-white/90">
                <Layers className="h-4 w-4 mr-1" />
                Layers
              </Button>
              <Button variant="outline" size="sm" className="bg-white/90">
                <Navigation className="h-4 w-4 mr-1" />
                Directions
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg">
              <h3 className="font-semibold text-sm mb-2">Legend</h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Upcoming</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List for Map View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((activity, index) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${getStatusColor(activity.status)} flex items-center justify-center text-white text-sm font-medium`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{activity.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                    <MapPin className="h-3 w-3 ml-2" />
                    {activity.location}
                  </div>
                </div>
                <div className="text-lg">{getTypeIcon(activity.type)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
