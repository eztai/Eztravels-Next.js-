
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Users, DollarSign, Plus, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { mockTrips, savedLocations } from '@/utils/mockData';

const MyTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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
          <Button 
            size="sm" 
            className="flex-1" 
            onClick={() => navigate(`/itinerary?tripId=${trip.id}`)}
          >
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

  // Get all trips for calendar view
  const allTrips = [...mockTrips.current, ...mockTrips.upcoming, ...mockTrips.past];
  
  // Create events for calendar from trip data
  const getTripEvents = (date: Date) => {
    return allTrips.filter(trip => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-muted-foreground">Manage your travel adventures</p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/trips/new')}>
          <Plus className="h-4 w-4" />
          New Trip
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
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

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trip Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    booked: (date) => getTripEvents(date).length > 0,
                  }}
                  modifiersStyles={{
                    booked: { backgroundColor: 'hsl(var(--primary))', color: 'white' },
                  }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? `Trips on ${selectedDate.toLocaleDateString()}` : 'Select a date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-3">
                    {getTripEvents(selectedDate).map(trip => (
                      <div key={trip.id} className="p-3 border rounded-lg">
                        <h4 className="font-semibold">{trip.title}</h4>
                        <p className="text-sm text-muted-foreground">{trip.destination}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                        </p>
                        <Button 
                          size="sm" 
                          className="mt-2" 
                          onClick={() => navigate(`/itinerary?tripId=${trip.id}`)}
                        >
                          View Itinerary
                        </Button>
                      </div>
                    ))}
                    {getTripEvents(selectedDate).length === 0 && (
                      <p className="text-muted-foreground">No trips on this date</p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Select a date to see your trips</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTripsPage;
