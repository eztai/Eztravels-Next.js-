import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Calendar, DollarSign, Users, MapPin, Clock, CreditCard, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExploreSection } from '@/components/ExploreSection';
import { TravelAtAGlance } from '@/components/TravelAtAGlance';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // Mock authentication state - replace with real auth later
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock upcoming trips data
  const upcomingTrips = [
    {
      id: 1,
      destination: 'Tokyo, Japan',
      startDate: '2024-07-15',
      endDate: '2024-07-22',
      budget: 3500,
      spent: 1200,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      destination: 'Paris, France',
      startDate: '2024-08-10',
      endDate: '2024-08-17',
      budget: 2800,
      spent: 800,
      image: '/placeholder.svg'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleLogin = () => {
    navigate('/profile');
  };

  // Temporary login toggle for demo
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <div className="space-y-6">
      {/* Header with subtle login prompt for non-authenticated users */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800">
                <span className="font-medium">Sign in</span> to access your trips, budgets, and personalized recommendations
              </p>
            </div>
            <Button onClick={handleLogin} size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </div>
        </div>
      )}

      {/* Demo toggle button - remove in production */}
      <div className="text-center">
        <Button onClick={toggleAuth} variant="outline" size="sm">
          {isAuthenticated ? 'Demo: Log Out' : 'Demo: Log In'}
        </Button>
      </div>

      <Tabs defaultValue="explore" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="explore" className="space-y-6">
          <ExploreSection />
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 upcoming</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">Across all trips</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Countries Visited</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Travel Companions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Friends & family</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Authenticated user sections - only show when logged in */}
      {isAuthenticated && (
        <div className="space-y-8 mt-8">
          {/* Your Upcoming Trips */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Plane className="h-6 w-6" />
                Your Upcoming Trips
              </h2>
              <Button onClick={() => navigate('/trips')} variant="outline">
                View All Trips
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-500 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{trip.destination}</h3>
                      <p className="text-sm opacity-90">
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          ${trip.spent.toLocaleString()} / ${trip.budget.toLocaleString()}
                        </span>
                      </div>
                      <Badge variant={trip.spent > trip.budget * 0.8 ? "destructive" : "secondary"}>
                        {Math.round((trip.spent / trip.budget) * 100)}% spent
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => navigate(`/trips/${trip.id}`)}
                        className="flex-1"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => navigate('/itinerary')}
                        className="flex-1"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Your Travel at a Glance */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                Your Travel at a Glance
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Remaining Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">$4,100</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Across all active trips
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tokyo Trip</span>
                      <span className="text-green-600">$2,300</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Paris Trip</span>
                      <span className="text-green-600">$1,800</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Next Itinerary Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold">Flight to Tokyo</div>
                      <div className="text-sm text-muted-foreground">
                        July 15, 2024 at 2:30 PM
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">
                        Terminal 3, Gate A12
                      </div>
                      <div className="text-xs text-blue-600">
                        Check-in opens 24h before
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Split Bills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium text-orange-800">You owe Sarah</div>
                        <div className="text-sm text-orange-600">Hotel booking</div>
                      </div>
                      <div className="text-lg font-bold text-orange-800">$18</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-green-800">Mike owes you</div>
                        <div className="text-sm text-green-600">Restaurant bill</div>
                      </div>
                      <div className="text-lg font-bold text-green-800">$25</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default HomePage;
