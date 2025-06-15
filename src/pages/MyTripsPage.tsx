import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Filter, Grid, List, Pin, PinOff, Search, Bot } from 'lucide-react';
import { AITravelAssistant } from '@/components/AITravelAssistant';
import { EnhancedTripCard } from '@/components/EnhancedTripCard';
import { mockTrips, savedLocations, type EnhancedTrip } from '@/utils/mockData';

// Enhanced mock data with progress indicators
const enhancedTrips = {
  current: [
    {
      ...mockTrips.current[0],
      travelers: [
        { id: '1', name: 'John Doe', confirmed: true },
        { id: '2', name: 'Jane Smith', confirmed: true }
      ],
      progress: {
        budget: { used: 1200, total: 3500 },
        activities: { planned: 6, total: 7 },
        confirmations: { flights: true, accommodation: true }
      },
      nextActivity: 'Visit Senso-ji Temple at 9:00 AM',
      pinned: true
    } as EnhancedTrip
  ],
  upcoming: [
    {
      ...mockTrips.upcoming[0],
      travelers: [
        { id: '1', name: 'John Doe', confirmed: true },
        { id: '2', name: 'Sarah Wilson', confirmed: false },
        { id: '3', name: 'Mike Johnson', confirmed: true }
      ],
      progress: {
        budget: { used: 0, total: 4000 },
        activities: { planned: 3, total: 10 },
        confirmations: { flights: false, accommodation: false }
      },
      pinned: false
    } as EnhancedTrip,
    {
      ...mockTrips.upcoming[1],
      travelers: [
        { id: '1', name: 'John Doe', confirmed: true },
        { id: '2', name: 'Alex Brown', confirmed: false }
      ],
      progress: {
        budget: { used: 0, total: 2800 },
        activities: { planned: 8, total: 8 },
        confirmations: { flights: true, accommodation: false }
      },
      pinned: false
    } as EnhancedTrip
  ],
  past: [
    {
      ...mockTrips.past[0],
      travelers: [
        { id: '1', name: 'John Doe', confirmed: true },
        { id: '2', name: 'Jane Smith', confirmed: true }
      ],
      progress: {
        budget: { used: 1850, total: 2000 },
        activities: { planned: 9, total: 9 },
        confirmations: { flights: true, accommodation: true }
      },
      pinned: false
    } as EnhancedTrip
  ]
};

const MyTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [pinnedTrips, setPinnedTrips] = useState<number[]>([1]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewItinerary = (tripId: number) => {
    navigate(`/itinerary?tripId=${tripId}`);
  };

  const handleViewBudget = (tripId: number) => {
    navigate(`/budget?tripId=${tripId}`);
  };

  const handleEditTrip = (tripId: number) => {
    navigate(`/trips/edit/${tripId}`);
  };

  const togglePin = (tripId: number) => {
    setPinnedTrips(prev => 
      prev.includes(tripId) 
        ? prev.filter(id => id !== tripId)
        : [...prev, tripId]
    );
  };

  // Get all trips for calendar view
  const allTrips = [...enhancedTrips.current, ...enhancedTrips.upcoming, ...enhancedTrips.past];
  
  // Create events for calendar from trip data
  const getTripEvents = (date: Date) => {
    return allTrips.filter(trip => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const TripCardGrid = ({ trips }: { trips: any[] }) => {
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
                    onViewItinerary={handleViewItinerary}
                    onViewBudget={handleViewBudget}
                    onEditTrip={handleEditTrip}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 left-2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
                    onClick={() => togglePin(trip.id)}
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
                    onViewItinerary={handleViewItinerary}
                    onViewBudget={handleViewBudget}
                    onEditTrip={handleEditTrip}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 left-2 w-8 h-8 p-0 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => togglePin(trip.id)}
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-muted-foreground">Manage your travel adventures with smart insights</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className={showAIAssistant ? 'bg-primary/10' : ''}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button className="gap-2" onClick={() => navigate('/trips/new')}>
            <Plus className="h-4 w-4" />
            New Trip
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        <div className={`transition-all duration-300 ${showAIAssistant ? 'flex-1' : 'w-full'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>

              {activeTab !== 'calendar' && activeTab !== 'saved' && (
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Sort by Date</SelectItem>
                      <SelectItem value="name">Sort by Name</SelectItem>
                      <SelectItem value="budget">Sort by Budget</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Trips</SelectItem>
                      <SelectItem value="solo">Solo Travel</SelectItem>
                      <SelectItem value="group">Group Travel</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <TabsContent value="current" className="space-y-4">
              {enhancedTrips.current.length > 0 ? (
                <TripCardGrid trips={enhancedTrips.current} />
              ) : (
                <div className="text-center p-12">
                  <h3 className="text-lg font-medium mb-2">No current trips</h3>
                  <p className="text-sm text-muted-foreground mb-4">Start planning your next adventure</p>
                  <Button onClick={() => navigate('/trips/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Trip
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              <TripCardGrid trips={enhancedTrips.upcoming} />
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              <TripCardGrid trips={enhancedTrips.past} />
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
                            <div className="flex gap-2 mt-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleViewItinerary(trip.id)}
                              >
                                View Itinerary
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleViewBudget(trip.id)}
                              >
                                Budget
                              </Button>
                            </div>
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

        {/* AI Assistant Panel */}
        {showAIAssistant && (
          <AITravelAssistant 
            isOpen={showAIAssistant} 
            onToggle={() => setShowAIAssistant(!showAIAssistant)} 
          />
        )}
      </div>

      {/* Floating AI Assistant */}
      {!showAIAssistant && (
        <AITravelAssistant 
          isOpen={false} 
          onToggle={() => setShowAIAssistant(true)} 
        />
      )}
    </div>
  );
};

export default MyTripsPage;
