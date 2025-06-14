
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, Bot, User, MapPin, Star, Plus, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Destination {
  id: number;
  name: string;
  country: string;
  rating: number;
  image: string;
  tags: string[];
  description: string;
  price: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini, Greece",
    country: "Greece",
    rating: 4.8,
    image: "https://source.unsplash.com/400x300/?santorini",
    tags: ["Beach", "Romantic", "Views"],
    description: "Stunning sunsets and white-washed buildings",
    price: "$200-400/night"
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    country: "Japan",
    rating: 4.9,
    image: "https://source.unsplash.com/400x300/?kyoto",
    tags: ["Culture", "Temple", "Traditional"],
    description: "Ancient temples and beautiful gardens",
    price: "$100-250/night"
  },
  {
    id: 3,
    name: "Banff National Park",
    country: "Canada",
    rating: 4.7,
    image: "https://source.unsplash.com/400x300/?banff",
    tags: ["Nature", "Adventure", "Hiking"],
    description: "Breathtaking mountain landscapes",
    price: "$150-300/night"
  }
];

const TripCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm excited to help you plan your new trip! Tell me about your travel preferences - where would you like to go, what dates are you thinking, and what kind of experience are you looking for?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tripDetails, setTripDetails] = useState({
    name: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: ''
  });

  const filteredDestinations = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

    // Simulate AI response based on message content
    setTimeout(() => {
      let aiResponse = "That sounds great! ";
      
      if (inputMessage.toLowerCase().includes('beach') || inputMessage.toLowerCase().includes('sun')) {
        aiResponse += "I recommend checking out Santorini for beautiful beaches and sunsets. You can see it in the destinations below.";
      } else if (inputMessage.toLowerCase().includes('culture') || inputMessage.toLowerCase().includes('history')) {
        aiResponse += "Kyoto would be perfect for cultural experiences with its ancient temples and traditions.";
      } else if (inputMessage.toLowerCase().includes('nature') || inputMessage.toLowerCase().includes('hiking')) {
        aiResponse += "Banff National Park offers incredible natural beauty and hiking opportunities.";
      } else {
        aiResponse += "Let me suggest some destinations that might interest you. You can explore them below and add any that catch your eye to your trip!";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleAddDestination = (destination: Destination) => {
    if (!selectedDestinations.find(d => d.id === destination.id)) {
      setSelectedDestinations(prev => [...prev, destination]);
    }
  };

  const handleRemoveDestination = (id: number) => {
    setSelectedDestinations(prev => prev.filter(d => d.id !== id));
  };

  const handleSaveTrip = () => {
    // Here you would typically save to a backend
    console.log('Saving trip:', { tripDetails, selectedDestinations });
    navigate('/trips');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/trips')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Plan New Trip</h1>
          <p className="text-muted-foreground">Let AI help you create the perfect itinerary</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Chat Section */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Travel Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Tell me about your ideal trip..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trip Details & Destinations */}
        <div className="space-y-6">
          {/* Trip Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Trip name (e.g., Summer Europe Adventure)"
                value={tripDetails.name}
                onChange={(e) => setTripDetails(prev => ({...prev, name: e.target.value}))}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  placeholder="Start date"
                  value={tripDetails.startDate}
                  onChange={(e) => setTripDetails(prev => ({...prev, startDate: e.target.value}))}
                />
                <Input
                  type="date"
                  placeholder="End date"
                  value={tripDetails.endDate}
                  onChange={(e) => setTripDetails(prev => ({...prev, endDate: e.target.value}))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select value={tripDetails.travelers.toString()} onValueChange={(value) => setTripDetails(prev => ({...prev, travelers: parseInt(value)}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Traveler</SelectItem>
                    <SelectItem value="2">2 Travelers</SelectItem>
                    <SelectItem value="3">3 Travelers</SelectItem>
                    <SelectItem value="4">4+ Travelers</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Budget (optional)"
                  value={tripDetails.budget}
                  onChange={(e) => setTripDetails(prev => ({...prev, budget: e.target.value}))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Selected Destinations */}
          {selectedDestinations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Added Destinations ({selectedDestinations.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedDestinations.map(dest => (
                    <div key={dest.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{dest.name}</span>
                        <span className="text-sm text-muted-foreground">{dest.country}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDestination(dest.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Browse Destinations */}
          <Card>
            <CardHeader>
              <CardTitle>Explore Destinations</CardTitle>
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {filteredDestinations.map(destination => (
                  <div key={destination.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{destination.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {destination.country}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {destination.rating}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{destination.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {destination.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-primary">{destination.price}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddDestination(destination)}
                        disabled={selectedDestinations.some(d => d.id === destination.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {selectedDestinations.some(d => d.id === destination.id) ? 'Added' : 'Add'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Trip Button */}
          <Button 
            onClick={handleSaveTrip} 
            className="w-full"
            disabled={!tripDetails.name || selectedDestinations.length === 0}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Create Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripCreationPage;
