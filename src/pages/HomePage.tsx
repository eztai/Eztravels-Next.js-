
import React, { useState } from 'react';
import ChatAssistant from '@/components/ChatAssistant';
import ExploreSection from '@/components/ExploreSection';
import AIItineraryBuilder from '@/components/AIItineraryBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, MessageSquare, Route } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HomePage: React.FC = () => {
  const [addedDestinations, setAddedDestinations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('explore');

  const handleAddToTrip = (destination: any, tripType: 'current' | 'future') => {
    const newDestination = {
      ...destination,
      tripType,
      addedAt: new Date()
    };
    setAddedDestinations(prev => [...prev, newDestination]);
    
    // Switch to itinerary tab to show the addition
    if (tripType === 'current') {
      setActiveTab('itinerary');
    }
  };

  const handleRemoveDestination = (id: string) => {
    setAddedDestinations(prev => prev.filter(dest => dest.id.toString() !== id));
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to EzTravels</h1>
        <p className="text-muted-foreground">Your AI-powered travel companion</p>
      </div>

      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Explore
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              Itinerary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            <ExploreSection onAddToTrip={handleAddToTrip} />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Travel Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatAssistant />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <AIItineraryBuilder 
              addedDestinations={addedDestinations}
              onRemoveDestination={handleRemoveDestination}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
