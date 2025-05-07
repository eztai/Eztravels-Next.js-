
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, MapPin, Users, Search, Plane, Route, Compass, Ticket } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';

// Sample destination recommendations
const popularDestinations = [
  { 
    name: 'Bali, Indonesia', 
    image: 'https://source.unsplash.com/random/300x200/?bali', 
    description: 'Tropical paradise with beaches and temples',
    activities: ['Beaches', 'Temples', 'Surfing']
  },
  { 
    name: 'Kyoto, Japan', 
    image: 'https://source.unsplash.com/random/300x200/?kyoto', 
    description: 'Historic city with beautiful temples and gardens',
    activities: ['Temples', 'Gardens', 'Culture']
  },
  { 
    name: 'Santorini, Greece', 
    image: 'https://source.unsplash.com/random/300x200/?santorini', 
    description: 'Stunning island with white buildings and blue domes',
    activities: ['Views', 'Beaches', 'Cuisine']
  }
];

const TripPlanner: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState('');
  const [tripType, setTripType] = useState('');
  
  // Handle date selection ensuring end date is after start date
  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (date && (!endDate || endDate < date)) {
      setEndDate(addDays(date, 7)); // Default to a week-long trip
    }
  };

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, this would trigger an API call to search for destinations
  };

  // Handle trip type selection
  const handleTripTypeSelect = (type: string) => {
    setTripType(type);
  };
  
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Plan Your Trip</h2>
      </div>
      
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="create">Create Trip</TabsTrigger>
          <TabsTrigger value="discover">Discover Destinations</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary Builder</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>New Adventure</CardTitle>
              <CardDescription>Fill in the details to start planning your next trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trip-name">Trip Name</Label>
                    <Input id="trip-name" placeholder="E.g., Summer Vacation 2025" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="flex">
                      <Input 
                        id="destination" 
                        placeholder="Search for a destination" 
                        className="rounded-r-none" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button variant="outline" className="rounded-l-none border-l-0" onClick={handleSearch}>
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={handleStartDateSelect}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => (startDate ? date < startDate : false)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Travelers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Number of travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 traveler</SelectItem>
                        <SelectItem value="2">2 travelers</SelectItem>
                        <SelectItem value="3">3 travelers</SelectItem>
                        <SelectItem value="4">4 travelers</SelectItem>
                        <SelectItem value="5+">5+ travelers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Trip Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button 
                      variant={tripType === 'leisure' ? 'default' : 'outline'} 
                      className="justify-start"
                      onClick={() => handleTripTypeSelect('leisure')}
                    >
                      Leisure
                    </Button>
                    <Button 
                      variant={tripType === 'business' ? 'default' : 'outline'} 
                      className="justify-start"
                      onClick={() => handleTripTypeSelect('business')}
                    >
                      Business
                    </Button>
                    <Button 
                      variant={tripType === 'adventure' ? 'default' : 'outline'} 
                      className="justify-start"
                      onClick={() => handleTripTypeSelect('adventure')}
                    >
                      Adventure
                    </Button>
                    <Button 
                      variant={tripType === 'cultural' ? 'default' : 'outline'} 
                      className="justify-start"
                      onClick={() => handleTripTypeSelect('cultural')}
                    >
                      Cultural
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">$</span>
                      <Input type="number" placeholder="Minimum" />
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">$</span>
                      <Input type="number" placeholder="Maximum" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button>Create Trip</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="discover">
          <Card>
            <CardHeader>
              <CardTitle>Discover Destinations</CardTitle>
              <CardDescription>Find inspiration for your next adventure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="explore">Explore Destinations</Label>
                    <div className="flex">
                      <Input 
                        id="explore" 
                        placeholder="Search by location, activity, or interest" 
                        className="rounded-r-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button variant="default" className="rounded-l-none" onClick={handleSearch}>
                        <Search className="h-4 w-4 mr-2" />
                        Explore
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Popular Categories</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Beaches</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Mountains</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Cities</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Historical</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Food & Wine</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Wellness</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Adventure</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Family-Friendly</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Popular Destinations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {popularDestinations.map((destination, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div 
                          className="h-40 w-full bg-cover bg-center" 
                          style={{ backgroundImage: `url(${destination.image})` }}
                        />
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-lg">{destination.name}</CardTitle>
                          <CardDescription>{destination.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex flex-wrap gap-1 mt-2">
                            {destination.activities.map((activity, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{activity}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button variant="outline" size="sm">
                            <Compass className="h-4 w-4 mr-2" />
                            Explore
                          </Button>
                          <Button size="sm">
                            <Plane className="h-4 w-4 mr-2" />
                            Plan Trip
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="itinerary">
          <Card>
            <CardHeader>
              <CardTitle>Itinerary Builder</CardTitle>
              <CardDescription>Create a day-by-day plan for your trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-medium text-lg">Tokyo Exploration</h3>
                    <p className="text-sm text-muted-foreground">July 15 - July 25, 2025</p>
                  </div>
                  <Button>
                    <Route className="h-4 w-4 mr-2" />
                    Auto-Plan
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-1 bg-primary rounded-full mr-3"></div>
                    <h3 className="font-medium">Day 1 - July 15, 2025</h3>
                  </div>
                  
                  <Card className="border-dashed">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-secondary/30 rounded-full p-2 mr-3">
                          <Plane className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Arrival - Narita International Airport</p>
                          <p className="text-sm text-muted-foreground">2:30 PM</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Ticket className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Button variant="outline" className="w-full border-dashed">
                    + Add Activity
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-1 bg-primary rounded-full mr-3"></div>
                    <h3 className="font-medium">Day 2 - July 16, 2025</h3>
                  </div>
                  
                  <Card className="border-dashed">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-secondary/30 rounded-full p-2 mr-3">
                          <MapPin className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Tokyo Skytree</p>
                          <p className="text-sm text-muted-foreground">10:00 AM - 12:00 PM</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Ticket className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-secondary/30 rounded-full p-2 mr-3">
                          <MapPin className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Asakusa Temple</p>
                          <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Ticket className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Button variant="outline" className="w-full border-dashed">
                    + Add Activity
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  + Add Day
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Export Itinerary</Button>
              <Button>Save Itinerary</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripPlanner;
