
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Star, Settings, Edit } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const userStats = {
    tripsCompleted: 12,
    countriesVisited: 8,
    totalDistance: 45000,
    memberSince: 'March 2023'
  };

  const recentTrips = [
    { name: 'Tokyo Adventure', date: 'June 2024', rating: 5 },
    { name: 'Bali Retreat', date: 'March 2024', rating: 4 },
    { name: 'Paris Weekend', date: 'January 2024', rating: 5 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button variant="outline" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src="" alt="John Doe" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">John Doe</CardTitle>
              <p className="text-muted-foreground">john.doe@email.com</p>
              <Badge className="w-fit mx-auto">Premium Member</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Member since {userStats.memberSince}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Based in San Francisco, CA</span>
              </div>
              <Button className="w-full gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Travel Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Travel Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{userStats.tripsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Trips Completed</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{userStats.countriesVisited}</div>
                  <div className="text-sm text-muted-foreground">Countries Visited</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{userStats.totalDistance.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Miles Traveled</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">4.8</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trips */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrips.map((trip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{trip.name}</p>
                      <p className="text-sm text-muted-foreground">{trip.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(trip.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Travel Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Favorite Destinations</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Beach destinations</p>
                    <p>• Cultural cities</p>
                    <p>• Mountain retreats</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Travel Style</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Mid-range budget</p>
                    <p>• Adventure seeker</p>
                    <p>• Food enthusiast</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
