
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, MapPin, Users, Send, Bot, User } from 'lucide-react';
import { TripIdea, currentTrips, upcomingTrips } from '@/utils/mockData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AddToTripDialogProps {
  tripIdea: TripIdea | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTripCreated: () => void;
}

export const AddToTripDialog: React.FC<AddToTripDialogProps> = ({
  tripIdea,
  open,
  onOpenChange,
  onTripCreated
}) => {
  const [activeTab, setActiveTab] = useState('existing');
  const [selectedTrip, setSelectedTrip] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Great choice! I'll help you plan your trip to ${tripIdea?.title || 'this destination'}. What dates are you thinking, and how many people will be traveling?`,
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [tripDetails, setTripDetails] = useState({
    name: tripIdea?.title ? `${tripIdea.title} Adventure` : '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: tripIdea?.budget || ''
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Perfect! I've noted your preferences. Feel free to adjust the trip details on the right, and when you're ready, click 'Create Trip' to get started!",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleAddToExistingTrip = () => {
    if (!selectedTrip) return;
    console.log(`Added ${tripIdea?.title} to trip ${selectedTrip}`);
    onTripCreated();
    onOpenChange(false);
  };

  const handleCreateNewTrip = () => {
    console.log('Creating new trip:', { tripDetails, tripIdea });
    onTripCreated();
    onOpenChange(false);
  };

  if (!tripIdea) return null;

  const existingTrips = [...currentTrips, ...upcomingTrips];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add {tripIdea.title} to Trip
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Add to Existing Trip</TabsTrigger>
            <TabsTrigger value="new">Create New Trip</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {existingTrips.map(trip => (
                <Card 
                  key={trip.id}
                  className={`cursor-pointer transition-all ${
                    selectedTrip === trip.id.toString() ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedTrip(trip.id.toString())}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{trip.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {trip.destination}
                          <Calendar className="h-3 w-3 ml-2" />
                          {new Date(trip.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant={trip.status === 'active' ? 'default' : 'secondary'}>
                        {trip.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={handleAddToExistingTrip}
              disabled={!selectedTrip}
              className="w-full"
            >
              Add to Selected Trip
            </Button>
          </TabsContent>

          <TabsContent value="new" className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* AI Chat Section */}
              <Card className="flex flex-col h-[400px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bot className="h-4 w-4" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-2 ${
                          message.sender === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div className={`p-2 rounded-full ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Bot className="h-3 w-3" />
                          )}
                        </div>
                        <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tell me about your travel plans..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trip Details */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trip Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Trip name"
                      value={tripDetails.name}
                      onChange={(e) => setTripDetails(prev => ({...prev, name: e.target.value}))}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="date"
                        value={tripDetails.startDate}
                        onChange={(e) => setTripDetails(prev => ({...prev, startDate: e.target.value}))}
                      />
                      <Input
                        type="date"
                        value={tripDetails.endDate}
                        onChange={(e) => setTripDetails(prev => ({...prev, endDate: e.target.value}))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Select value={tripDetails.travelers.toString()} onValueChange={(value) => setTripDetails(prev => ({...prev, travelers: parseInt(value)}))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Traveler</SelectItem>
                          <SelectItem value="2">2 Travelers</SelectItem>
                          <SelectItem value="3">3 Travelers</SelectItem>
                          <SelectItem value="4">4+ Travelers</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Budget"
                        value={tripDetails.budget}
                        onChange={(e) => setTripDetails(prev => ({...prev, budget: e.target.value}))}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Destination */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Destination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-16 h-16 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${tripIdea.image})` }}
                      />
                      <div>
                        <h4 className="font-semibold">{tripIdea.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {tripIdea.location}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {tripIdea.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={handleCreateNewTrip}
                  disabled={!tripDetails.name}
                  className="w-full bg-gradient-to-r from-orange-500 to-blue-500"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Trip
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
