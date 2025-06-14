
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, MapPin, Star, Plus, Search, Sparkles } from 'lucide-react';

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
  },
  {
    id: 4,
    name: "Marrakech, Morocco",
    country: "Morocco",
    rating: 4.6,
    image: "https://source.unsplash.com/400x300/?marrakech",
    tags: ["Culture", "Market", "Adventure"],
    description: "Vibrant souks and stunning architecture",
    price: "$80-200/night"
  }
];

const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [savedDestinations, setSavedDestinations] = useState<Destination[]>([]);

  const handleSearchSubmit = () => {
    if (!searchInput.trim()) return;

    // Switch to chat mode and start conversation
    setIsChatMode(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: searchInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([userMessage]);
    setSearchInput('');

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "Great! I'd love to help you plan that trip. ";
      
      if (searchInput.toLowerCase().includes('beach')) {
        aiResponse += "I see you're interested in beach destinations. Santorini has some of the most beautiful beaches and sunsets in the world. Would you like to know more about it or see other beach destinations?";
      } else if (searchInput.toLowerCase().includes('culture') || searchInput.toLowerCase().includes('history')) {
        aiResponse += "For cultural experiences, I highly recommend Kyoto with its ancient temples and traditional culture, or Marrakech for its vibrant markets and architecture.";
      } else if (searchInput.toLowerCase().includes('adventure') || searchInput.toLowerCase().includes('hiking')) {
        aiResponse += "Banff National Park offers incredible adventure opportunities with world-class hiking and breathtaking mountain scenery.";
      } else {
        aiResponse += "Based on what you're looking for, I can suggest some amazing destinations. Tell me more about your preferences - are you looking for relaxation, adventure, culture, or something else?";
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

  const handleSendMessage = () => {
    if (!searchInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: searchInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setSearchInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds wonderful! I can help you explore those options. Check out the destinations below that match your interests, and let me know if you'd like more specific recommendations!",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSaveDestination = (destination: Destination) => {
    if (!savedDestinations.find(d => d.id === destination.id)) {
      setSavedDestinations(prev => [...prev, destination]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isChatMode) {
        handleSendMessage();
      } else {
        handleSearchSubmit();
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell our AI assistant where you want to go and let us create your dream itinerary
          </p>
        </div>

        {/* AI-First Search Interface */}
        <div className="max-w-2xl mx-auto">
          {!isChatMode ? (
            <div className="relative">
              <div className="relative">
                <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <Input
                  placeholder="Plan with AI - Where would you like to go? (e.g., 'I want a romantic beach getaway in Europe')"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-12 py-6 text-lg rounded-xl border-2 border-primary/20 focus:border-primary transition-colors"
                />
                <Button
                  onClick={handleSearchSubmit}
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            // Chat Interface
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Travel Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
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
                    placeholder="Continue the conversation..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Destination Recommendations */}
      {(isChatMode || savedDestinations.length > 0) && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Recommended Destinations</h2>
            <p className="text-muted-foreground">Based on your preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map(destination => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-32 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${destination.image})` }}
                >
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {destination.rating}
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {destination.country}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{destination.description}</p>
                  <p className="text-sm font-medium text-primary">{destination.price}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {destination.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleSaveDestination(destination)}
                    disabled={savedDestinations.some(d => d.id === destination.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {savedDestinations.some(d => d.id === destination.id) ? 'Saved' : 'Save to Trip'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quick Action Cards */}
      {!isChatMode && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSearchInput("I want a romantic beach getaway")}>
            <div className="text-4xl mb-4">🏖️</div>
            <h3 className="text-lg font-semibold mb-2">Beach Getaway</h3>
            <p className="text-sm text-muted-foreground">Relax on pristine beaches and enjoy ocean views</p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSearchInput("I'm looking for cultural experiences and history")}>
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="text-lg font-semibold mb-2">Cultural Journey</h3>
            <p className="text-sm text-muted-foreground">Explore history, art, and local traditions</p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSearchInput("I want an adventure trip with hiking and nature")}>
            <div className="text-4xl mb-4">🏔️</div>
            <h3 className="text-lg font-semibold mb-2">Adventure Quest</h3>
            <p className="text-sm text-muted-foreground">Thrilling activities and natural wonders</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HomePage;
