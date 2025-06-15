
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, MapPin, DollarSign, Clock, Plane, ArrowRight } from 'lucide-react';

interface ActiveTrip {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetUsed: number;
  budgetTotal: number;
  nextActivity: string;
  nextActivityTime: string;
  status: 'active' | 'upcoming';
}

const activeTrip: ActiveTrip = {
  id: 1,
  name: "Tokyo Adventure",
  destination: "Tokyo, Japan",
  startDate: "2024-03-15",
  endDate: "2024-03-22",
  budgetUsed: 1250,
  budgetTotal: 3500,
  nextActivity: "Visit Senso-ji Temple",
  nextActivityTime: "9:00 AM",
  status: "active"
};

export const TravelAtAGlance: React.FC = () => {
  const budgetPercentage = Math.round((activeTrip.budgetUsed / activeTrip.budgetTotal) * 100);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Your Travel at a Glance</h2>
        <p className="text-muted-foreground">Quick overview of your current and upcoming trips</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Trip Card */}
        <Card className="lg:col-span-2 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{activeTrip.name}</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {activeTrip.destination}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {activeTrip.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Trip Dates */}
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(activeTrip.startDate)} - {formatDate(activeTrip.endDate)}</span>
            </div>

            {/* Next Activity */}
            <div className="bg-white/80 rounded-lg p-3 border border-primary/10">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Up Next</span>
              </div>
              <p className="text-sm">{activeTrip.nextActivity}</p>
              <p className="text-xs text-muted-foreground">{activeTrip.nextActivityTime}</p>
            </div>

            {/* Budget Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Budget Used
                </span>
                <span className="text-sm text-muted-foreground">{budgetPercentage}%</span>
              </div>
              <Progress value={budgetPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${activeTrip.budgetUsed}</span>
                <span>${activeTrip.budgetTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                <CalendarDays className="h-3 w-3 mr-1" />
                View Itinerary
              </Button>
              <Button size="sm" variant="outline">
                <DollarSign className="h-3 w-3 mr-1" />
                Edit Budget
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Active Trips</p>
              </div>
              <Plane className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">$8,450</p>
                <p className="text-sm text-muted-foreground">Total Budget</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Activities Planned</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>
      </div>

      {/* Upcoming Trips Preview */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Upcoming Trips</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Paris Getaway", destination: "Paris, France", date: "Apr 10-15", status: "Planning" },
              { name: "Iceland Adventure", destination: "Reykjavik, Iceland", date: "May 2-9", status: "Booked" }
            ].map((trip, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{trip.name}</p>
                  <p className="text-sm text-muted-foreground">{trip.destination} • {trip.date}</p>
                </div>
                <Badge variant="outline">{trip.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
