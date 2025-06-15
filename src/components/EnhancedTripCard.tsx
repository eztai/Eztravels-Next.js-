
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, MapPin, Users, DollarSign, Calendar, Edit, Plane, Hotel, CheckCircle, Plus } from 'lucide-react';

interface Traveler {
  id: string;
  name: string;
  avatar?: string;
  confirmed: boolean;
}

interface TripProgress {
  budget: { used: number; total: number };
  activities: { planned: number; total: number };
  confirmations: {
    flights: boolean;
    accommodation: boolean;
  };
}

interface EnhancedTripCardProps {
  trip: {
    id: number;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    status: string;
    image: string;
    travelers: Traveler[];
    progress: TripProgress;
    nextActivity?: string;
  };
  onViewItinerary: (tripId: number) => void;
  onViewBudget: (tripId: number) => void;
  onEditTrip: (tripId: number) => void;
}

export const EnhancedTripCard: React.FC<EnhancedTripCardProps> = ({
  trip,
  onViewItinerary,
  onViewBudget,
  onEditTrip
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const budgetPercentage = Math.round((trip.progress.budget.used / trip.progress.budget.total) * 100);
  const activitiesPercentage = Math.round((trip.progress.activities.planned / trip.progress.activities.total) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'past': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div 
        className="h-40 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${trip.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge className={getStatusColor(trip.status)}>
            {trip.status}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="font-bold text-lg">{trip.title}</h3>
          <p className="text-sm opacity-90 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {trip.destination}
          </p>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Date and Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
        </div>

        {/* Travelers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {trip.travelers.slice(0, 3).map((traveler) => (
                <Avatar key={traveler.id} className="w-6 h-6 border-2 border-background">
                  <AvatarImage src={traveler.avatar} />
                  <AvatarFallback className="text-xs">
                    {traveler.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {trip.travelers.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs">+{trip.travelers.length - 3}</span>
                </div>
              )}
              <Button variant="ghost" size="sm" className="w-6 h-6 rounded-full p-0 ml-2">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {trip.travelers.filter(t => t.confirmed).length}/{trip.travelers.length} confirmed
          </span>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Budget Used
              </span>
              <span className="text-sm text-muted-foreground">{budgetPercentage}%</span>
            </div>
            <Progress value={budgetPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>${trip.progress.budget.used}</span>
              <span>${trip.progress.budget.total}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Activities Planned
              </span>
              <span className="text-sm text-muted-foreground">{activitiesPercentage}%</span>
            </div>
            <Progress value={activitiesPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{trip.progress.activities.planned}/{trip.progress.activities.total} days</span>
            </div>
          </div>
        </div>

        {/* Confirmations */}
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Plane className={`h-4 w-4 ${trip.progress.confirmations.flights ? 'text-green-500' : 'text-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">Flights</span>
            {trip.progress.confirmations.flights && <CheckCircle className="h-3 w-3 text-green-500" />}
          </div>
          <div className="flex items-center gap-1">
            <Hotel className={`h-4 w-4 ${trip.progress.confirmations.accommodation ? 'text-green-500' : 'text-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">Hotels</span>
            {trip.progress.confirmations.accommodation && <CheckCircle className="h-3 w-3 text-green-500" />}
          </div>
        </div>

        {/* Next Activity */}
        {trip.nextActivity && (
          <div className="bg-muted/50 rounded-lg p-2">
            <span className="text-xs font-medium text-muted-foreground">Next:</span>
            <p className="text-sm">{trip.nextActivity}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1" 
            onClick={() => onViewItinerary(trip.id)}
          >
            <Calendar className="h-3 w-3 mr-1" />
            Itinerary
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onViewBudget(trip.id)}
          >
            <DollarSign className="h-3 w-3 mr-1" />
            Budget
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onEditTrip(trip.id)}
          >
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
