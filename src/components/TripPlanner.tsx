
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, MapPin, Users, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const TripPlanner: React.FC = () => {
  const [date, setDate] = React.useState<Date>();
  
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Plan Your Trip</h2>
      </div>
      
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
                  <Input id="destination" placeholder="Search for a destination" className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none border-l-0">
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
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
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
                      <span>Pick a date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      initialFocus
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
                <Button variant="outline" className="justify-start">Leisure</Button>
                <Button variant="outline" className="justify-start">Business</Button>
                <Button variant="outline" className="justify-start">Adventure</Button>
                <Button variant="outline" className="justify-start">Cultural</Button>
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
    </div>
  );
};

export default TripPlanner;
