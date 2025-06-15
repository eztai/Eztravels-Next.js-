
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Sparkles, Mic, TrendingUp, MapPin } from 'lucide-react';
import { PersistentAIAssistant } from '@/components/PersistentAIAssistant';
import { ExploreSection } from '@/components/ExploreSection';
import { TravelAtAGlance } from '@/components/TravelAtAGlance';

const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // Trigger AI assistant when user starts typing
    if (value.trim() && !isAIAssistantOpen) {
      setIsAIAssistantOpen(true);
    }
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isAIAssistantOpen ? 'lg:mr-80' : ''}`}>
        <div className="min-h-screen">
          {/* Hero Section - AI-First Search */}
          <div className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 px-6 py-12 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Your AI Travel Co-Pilot
                  </h1>
                  <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Tell me where you want to go, what you want to do, or how you want to feel. 
                    I'll create the perfect trip for you.
                  </p>
                </div>

                {/* Primary AI Search Interface */}
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="relative">
                    <div className="relative">
                      <Sparkles className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-primary" />
                      <Input
                        placeholder="Ask me anything: 'Plan a romantic weekend in Tuscany' or 'Split expenses for Tokyo trip'"
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="pl-16 pr-24 py-8 text-lg lg:text-xl rounded-3xl border-2 border-primary/20 focus:border-primary transition-colors shadow-xl bg-white/80 backdrop-blur-sm"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-12 w-12 rounded-full hover:bg-primary/10"
                        >
                          <Mic className="h-5 w-5" />
                        </Button>
                        <Button
                          onClick={handleSearch}
                          className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                        >
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Suggested Prompts */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {suggestedPrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-sm bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-300"
                        onClick={() => {
                          setSearchInput(prompt);
                          setIsAIAssistantOpen(true);
                        }}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>

                  {/* Trending Ideas */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {trendingIdeas.map((idea, index) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm hover:bg-white group">
                        <CardContent className="p-0 text-center space-y-3">
                          <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{idea.icon}</div>
                          <div>
                            <p className="font-semibold text-sm lg:text-base">{idea.title}</p>
                            <p className="text-xs lg:text-sm text-muted-foreground">{idea.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Feeling Adventurous Button */}
                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                      onClick={() => setIsAIAssistantOpen(true)}
                    >
                      <Sparkles className="h-5 w-5 mr-3" />
                      Feeling Adventurous? Surprise Me!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 h-12">
                <TabsTrigger value="overview" className="flex items-center gap-2 text-sm lg:text-base">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="explore" className="flex items-center gap-2 text-sm lg:text-base">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Explore</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <TravelAtAGlance />
              </TabsContent>

              <TabsContent value="explore" className="mt-8">
                <ExploreSection />
              </TabsContent>
            </Tabs>
          </div>
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
