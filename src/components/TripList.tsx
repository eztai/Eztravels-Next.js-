
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MapPin, Calendar, Users, Plane } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample trip data
const trips = [
  {
    id: 1,
    title: 'Bali Adventure',
    destination: 'Bali, Indonesia',
    startDate: 'May 10, 2025',
    endDate: 'May 17, 2025',
    participants: 2,
    status: 'upcoming',
    image: 'https://source.unsplash.com/random/300x200/?bali'
  },
  {
    id: 2,
    title: 'Tokyo Exploration',
    destination: 'Tokyo, Japan',
    startDate: 'July 15, 2025',
    endDate: 'July 25, 2025',
    participants: 1,
    status: 'planned',
    image: 'https://source.unsplash.com/random/300x200/?tokyo'
  },
  {
    id: 3,
    title: 'Paris Getaway',
    destination: 'Paris, France',
    startDate: 'October 3, 2025',
    endDate: 'October 10, 2025',
    participants: 2,
    status: 'draft',
    image: 'https://source.unsplash.com/random/300x200/?paris'
  }
];

const TripList: React.FC = () => {
  return (
    <div id="trips" className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Trips</h2>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          New Trip
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map(trip => (
          <Card key={trip.id} className="trip-card">
            <div 
              className="h-48 w-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${trip.image})` }}
            />
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{trip.title}</CardTitle>
                <Badge variant={
                  trip.status === 'upcoming' ? 'default' : 
                  trip.status === 'planned' ? 'outline' : 'secondary'
                }>
                  {trip.status === 'upcoming' ? 'Upcoming' : 
                   trip.status === 'planned' ? 'Planned' : 'Draft'}
                </Badge>
              </div>
              <CardDescription>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{trip.destination}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{trip.startDate} - {trip.endDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span>{trip.participants} {trip.participants === 1 ? 'Person' : 'People'}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="secondary" size="sm" className="gap-1">
                <Plane className="h-3 w-3" />
                View Itinerary
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        <Card className="trip-card border-dashed border-2 border-muted flex flex-col items-center justify-center h-[350px]">
          <div className="p-6 text-center">
            <div className="mb-4 bg-muted rounded-full p-3 inline-block">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Create New Trip</h3>
            <p className="text-sm text-muted-foreground mb-4">Plan your next adventure</p>
            <Button>Get Started</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TripList;
