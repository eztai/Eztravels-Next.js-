
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Calendar, DollarSign, Users, MapPin, Clock, CreditCard, LogIn, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExploreSection } from '@/components/ExploreSection';
import { TravelAtAGlance } from '@/components/TravelAtAGlance';
import SearchChatAssistant from '@/components/SearchChatAssistant';
import SignInDialog from '@/components/SignInDialog';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Mock authentication state - replace with real auth later
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatContext, setChatContext] = useState('');
  const [showSignInDialog, setShowSignInDialog] = useState(false);

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

  const handleLogin = (provider?: string) => {
    // Simulate login success
    setIsAuthenticated(true);
    console.log(`Signed in with ${provider || 'email'}`);
    // Stay on the same page (home) after login
  };

  return (
    <div className="space-y-6">
      {/* Subtle Sign In Button for non-authenticated users */}
      {!isAuthenticated && (
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSignInDialog(true)}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Sign In
          </Button>
        </div>
      )}

      {/* Sign In Dialog */}
      <SignInDialog 
        open={showSignInDialog}
        onOpenChange={setShowSignInDialog}
        onSignIn={handleLogin}
      />

      {/* Main Explore Section with Search Chat */}
      <div className="space-y-6">
        {/* AI Search Chat Assistant */}
        <SearchChatAssistant onContextChange={setChatContext} />
        
        {/* Explore Results */}
        <ExploreSection chatContext={chatContext} />
      </div>

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
