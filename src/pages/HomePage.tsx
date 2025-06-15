
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Sparkles, Mic, Calendar, TrendingUp, MapPin, Users } from 'lucide-react';
import { PersistentAIAssistant } from '@/components/PersistentAIAssistant';
import { ExploreSection } from '@/components/ExploreSection';
import { TravelAtAGlance } from '@/components/TravelAtAGlance';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const suggestedPrompts = [
    "Plan a 5-day Europe trip under $1500",
    "What can I do in Tokyo on Day 2?",
    "Split my last dinner bill with friends",
    "Find flights to Paris for next month"
  ];

  const trendingIdeas = [
    { title: "Cherry Blossom Season", icon: "🌸", description: "Japan in Spring" },
    { title: "Summer Beach Escapes", icon: "🏖️", description: "Mediterranean coast" },
    { title: "Mountain Adventures", icon: "🏔️", description: "Alpine hiking trails" },
    { title: "Cultural Cities", icon: "🏛️", description: "Art & history tours" }
  ];

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    // This would integrate with the AI assistant
    console.log('Searching:', searchInput);
    setSearchInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isAIAssistantOpen ? 'mr-80' : ''}`}>
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
          {/* Hero Section - AI-First Search */}
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your AI Travel Co-Pilot
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tell me where you want to go, what you want to do, or how you want to feel. 
                I'll create the perfect trip for you.
              </p>
            </div>

            {/* Primary AI Search Interface */}
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="relative">
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary" />
                  <Input
                    placeholder="Ask me anything: 'Plan a romantic weekend in Tuscany' or 'Split expenses for Tokyo trip'"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-14 pr-20 py-6 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary transition-colors shadow-lg"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-full"
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={handleSearch}
                      className="h-10 w-10 rounded-full"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Suggested Prompts */}
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-sm"
                    onClick={() => setSearchInput(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>

              {/* Trending Ideas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {trendingIdeas.map((idea, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-0 text-center space-y-2">
                      <div className="text-2xl">{idea.icon}</div>
                      <div>
                        <p className="font-medium text-sm">{idea.title}</p>
                        <p className="text-xs text-muted-foreground">{idea.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Feeling Adventurous Button */}
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Feeling Adventurous? Surprise Me!
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="explore" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Explore
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Community
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <TravelAtAGlance />
            </TabsContent>

            <TabsContent value="explore" className="mt-6">
              <ExploreSection />
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Travel Calendar</h2>
                  <p className="text-muted-foreground">View all your trips and important dates</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="p-6">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Upcoming Events</h3>
                      <div className="space-y-3">
                        {[
                          { date: "Mar 15", event: "Tokyo trip starts", type: "trip" },
                          { date: "Mar 18", event: "Flight to Osaka", type: "flight" },
                          { date: "Apr 10", event: "Paris trip starts", type: "trip" }
                        ].map((item, index) => (
                          <div key={index} className="flex gap-3 p-2 rounded-lg bg-muted/50">
                            <div className="text-xs font-medium text-primary">{item.date}</div>
                            <div className="text-sm">{item.event}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Travel Community</h2>
                <p className="text-muted-foreground">Connect with fellow travelers and share experiences</p>
                <div className="text-4xl">🚧</div>
                <p className="text-muted-foreground">Coming soon - share trips, get recommendations, and connect with travelers</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Persistent AI Assistant */}
      <PersistentAIAssistant 
        isOpen={isAIAssistantOpen} 
        onToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)} 
      />
    </div>
  );
};

export default HomePage;
