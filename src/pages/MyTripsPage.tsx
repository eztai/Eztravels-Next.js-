
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, MapPin, Users, DollarSign, Plus, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock trip data
const mockTrips = {
  current: [
    {
      id: 1,
      title: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      startDate: "2024-06-15",
      endDate: "2024-06-22",
      status: "active",
      budget: 3500,
      spent: 1200,
      travelers: 2,
      image: "https://source.unsplash.com/400x200/?tokyo"
    }
  ],
  upcoming: [
    {
      id: 2,
      title: "European Summer",
      destination: "Paris, France",
      startDate: "2024-08-10",
      endDate: "2024-08-20",
      status: "planned",
      budget: 4000,
      spent: 0,
      travelers: 3,
      image: "https://source.unsplash.com/400x200/?paris"
    },
    {
      id: 3,
      title: "Iceland Road Trip",
      destination: "Reykjavik, Iceland",
      startDate: "2024-09-05",
      endDate: "2024-09-12",
      status: "planned",
      budget: 2800,
      spent: 0,
      travelers: 2,
      image: "https://source.unsplash.com/400x200/?iceland"
    }
  ],
  past: [
    {
      id: 4,
      title: "Bali Retreat",
      destination: "Ubud, Bali",
      startDate: "2024-03-01",
      endDate: "2024-03-10",
      status: "completed",
      budget: 2000,
      spent: 1850,
      travelers: 2,
      image: "https://source.unsplash.com/400x200/?bali"
    }
  ]
};

const savedLocations = [
  { id: 1, name: "Santorini, Greece", category: "Beach", savedDate: "2024-05-01" },
  { id: 2, name: "Machu Picchu, Peru", category: "Adventure", savedDate: "2024-04-15" },
  { id: 3, name: "Swiss Alps", category: "Nature", savedDate: "2024-03-20" }
];

const MyTripsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const TripCard = ({ trip }: { trip: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${trip.image})` }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{trip.title}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {trip.destination}
            </p>
          </div>
          <Badge variant={trip.status === 'active' ? 'default' : trip.status === 'planned' ? 'secondary' : 'outline'}>
            {trip.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {trip.travelers} travelers
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            ${trip.spent}/${trip.budget}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            View Details
          </Button>
          <Button size="sm" variant="outline">
            <Calendar className="h-3 w-3 mr-1" />
            Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-muted-foreground">Manage your travel adventures</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Trip
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTrips.current.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTrips.upcoming.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTrips.past.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTripsPage;
