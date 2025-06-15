
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Sparkles, Mic, TrendingUp, MapPin, Bot, Edit, Save, Trash2, Plus } from 'lucide-react';
import { PersistentAIAssistant } from '@/components/PersistentAIAssistant';
import { ExploreSection } from '@/components/ExploreSection';
import { TravelAtAGlance } from '@/components/TravelAtAGlance';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface TripItem {
  id: string;
  type: 'destination' | 'hotel' | 'activity' | 'flight';
  title: string;
  description: string;
  cost?: number;
  day?: number;
  category?: string;
}

const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [tripItems, setTripItems] = useState<TripItem[]>([]);
  const [chatContext, setChatContext] = useState<string>('');

  const suggestedPrompts = [
    "Plan a 5-day Europe trip under $1500",
    "Beach vacation in July for couples",
    "Weekend getaway to mountains",
    "Cultural city break in Asia"
  ];

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: searchInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsChatActive(true);
    setChatContext(searchInput.toLowerCase());
    setSearchInput('');

    // Simulate AI response with trip building
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Perfect! I'm starting to build your trip. Based on your request, I'm adding some initial suggestions to your trip draft. Let me know if you'd like to modify anything!",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);

      // Add sample trip items based on context
      if (searchInput.toLowerCase().includes('beach')) {
        setTripItems([
          {
            id: '1',
            type: 'destination',
            title: 'Santorini, Greece',
            description: 'Beautiful island with stunning sunsets',
            cost: 1200,
            day: 1
          },
          {
            id: '2',
            type: 'hotel',
            title: 'Oceanview Resort',
            description: 'Luxury beachfront accommodation',
            cost: 300,
            day: 1
          }
        ]);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const addTripItem = (item: TripItem) => {
    setTripItems(prev => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const removeTripItem = (id: string) => {
    setTripItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalCost = () => {
    return tripItems.reduce((total, item) => total + (item.cost || 0), 0);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'destination': return MapPin;
      case 'hotel': return '🏨';
      case 'activity': return '🎯';
      case 'flight': return '✈️';
      default: return Plus;
    }
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-orange-50 via-white to-blue-50 relative">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${tripItems.length > 0 ? 'mr-96' : 'mr-0'}`}>
        <div className="min-h-screen">
          {/* Enhanced Header with Chat Bar */}
          <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-orange-200/50 shadow-sm">
            <div className="max-w-4xl mx-auto px-6 py-6">
              <div className="space-y-4">
                {/* Main Search/Chat Input */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-blue-500 rounded-3xl blur-sm opacity-20"></div>
                  <div className="relative bg-white rounded-3xl border-2 border-transparent shadow-xl">
                    <div className="flex items-center p-2">
                      <div className="flex items-center flex-1 px-4">
                        <Sparkles className="h-6 w-6 text-orange-500 mr-3" />
                        <Input
                          placeholder="Tell me about your dream trip... 'Beach vacation in July' or 'Weekend in Paris'"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="border-0 text-lg bg-transparent focus:ring-0 focus:ring-offset-0 placeholder:text-gray-400"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-12 w-12 rounded-full hover:bg-orange-100"
                        >
                          <Mic className="h-5 w-5 text-orange-600" />
                        </Button>
                        <Button
                          onClick={handleSearch}
                          className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 hover:shadow-lg transition-all duration-300"
                        >
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suggested Prompts */}
                {!isChatActive && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestedPrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-sm bg-white/80 hover:bg-gradient-to-r hover:from-orange-100 hover:to-blue-100 border-orange-200 transition-all duration-300"
                        onClick={() => {
                          setSearchInput(prompt);
                          handleSearch();
                        }}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Messages - Inline */}
          {isChatActive && (
            <div className="max-w-4xl mx-auto px-6 py-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Avatar className="h-10 w-10 shadow-md">
                      <AvatarFallback className={
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                          : 'bg-gradient-to-r from-orange-400 to-pink-400 text-white'
                      }>
                        {message.sender === 'user' ? 'U' : <Bot className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-white border border-orange-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Tabs */}
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 h-12 bg-white/80 shadow-md">
                <TabsTrigger value="overview" className="flex items-center gap-2 text-sm lg:text-base rounded-lg">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="explore" className="flex items-center gap-2 text-sm lg:text-base rounded-lg">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Explore</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <TravelAtAGlance />
              </TabsContent>

              <TabsContent value="explore" className="mt-8">
                <ExploreSection chatContext={chatContext} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Fixed Trip Preview Panel */}
      {tripItems.length > 0 && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-orange-200 z-30">
          <div className="flex flex-col h-full">
            {/* Trip Header */}
            <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Your Trip Draft</h2>
                  <p className="text-sm text-white/80">Building in real-time</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-2xl font-bold">
                ${getTotalCost().toLocaleString()}
              </div>
            </div>

            {/* Trip Items */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {tripItems.map((item) => {
                  const Icon = getItemIcon(item.type);
                  return (
                    <Card key={item.id} className="p-4 hover:shadow-md transition-all duration-300 border border-orange-100">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-2xl">
                            {typeof Icon === 'string' ? Icon : <Icon className="h-5 w-5 text-orange-500" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                            {item.day && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                Day {item.day}
                              </Badge>
                            )}
                            {item.cost && (
                              <div className="text-sm font-semibold text-green-600 mt-1">
                                ${item.cost}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTripItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Trip Actions */}
            <div className="p-4 border-t border-orange-100 bg-gray-50">
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 hover:shadow-lg">
                  Save Trip
                </Button>
                <Button variant="outline" className="border-orange-200">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent AI Assistant */}
      <PersistentAIAssistant 
        isOpen={isAIAssistantOpen} 
        onToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)} 
      />
    </div>
  );
};

export default HomePage;
