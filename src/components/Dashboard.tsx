
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Welcome back, John!</h2>
        <span className="text-sm text-muted-foreground">Wednesday, May 07, 2025</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="trip-card border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Trip</CardTitle>
            <CardDescription>In 3 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">Bali, Indonesia</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">May 10 - May 17, 2025</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="trip-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Budget Status</CardTitle>
            <CardDescription>Total: $2,500</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={65} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">$1,625 spent</span>
                <span className="text-muted-foreground">$875 remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="trip-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tasks</CardTitle>
            <CardDescription>3 pending items</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm">Book airport transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm">Exchange currency</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm">Check in online</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Trips</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Trip Statistics</CardTitle>
                <CardDescription>Your travel summary for 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary">3</span>
                    <span className="text-sm text-muted-foreground">Trips Planned</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary">12</span>
                    <span className="text-sm text-muted-foreground">Days Traveling</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary">2</span>
                    <span className="text-sm text-muted-foreground">Countries</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary">$3.2k</span>
                    <span className="text-sm text-muted-foreground">Total Budget</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Next Adventure</CardTitle>
                <CardDescription>Popular among travelers like you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md overflow-hidden h-32 bg-gradient-to-r from-accent to-secondary opacity-80"></div>
                  <h3 className="font-medium">Japan Cherry Blossom Tour</h3>
                  <p className="text-sm text-muted-foreground">Experience the magic of cherry blossom season in Japan with our curated 10-day tour.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="text-center p-12">
            <h3 className="text-lg font-medium mb-2">Your upcoming trips will appear here</h3>
            <p className="text-sm text-muted-foreground">Start planning your next adventure</p>
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="text-center p-12">
            <h3 className="text-lg font-medium mb-2">Your past trips will appear here</h3>
            <p className="text-sm text-muted-foreground">Create memories to look back on</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
