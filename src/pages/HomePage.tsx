
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import ChatAssistant from '@/components/ChatAssistant';
import ExploreSection from '@/components/ExploreSection';
import AIItineraryBuilder from '@/components/AIItineraryBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to EzTravels</Text>
        <Text style={styles.subtitle}>Your AI-powered travel companion</Text>
      </View>

      <View style={styles.content}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'var(--muted-foreground)',
  },
  content: {
    flex: 1,
  },
});

export default HomePage;
