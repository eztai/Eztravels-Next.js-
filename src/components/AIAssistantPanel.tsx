
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Clock, MapPin, AlertTriangle, Lightbulb, Plus, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Suggestion {
  id: string;
  type: 'recommendation' | 'warning' | 'gap' | 'weather';
  title: string;
  description: string;
  actionLabel?: string;
  time?: string;
  location?: string;
}

export const AIAssistantPanel: React.FC = () => {
  const [suggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'gap',
      title: 'Free Evening on Day 2',
      description: 'You have a 3-hour gap after Tokyo Skytree. Would you like to visit a local night market?',
      actionLabel: 'Add Night Market',
      time: '6:00 PM - 9:00 PM'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Travel Time Conflict',
      description: 'Only 30 minutes between Senso-ji Temple and lunch in Asakusa. Consider extending temple visit.',
      actionLabel: 'Adjust Timing'
    },
    {
      id: '3',
      type: 'weather',
      title: 'Rain Expected',
      description: 'Heavy rain forecasted at 4PM on Day 2. Consider moving Tokyo Skytree to morning.',
      actionLabel: 'Reschedule'
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Cultural Experience',
      description: 'Based on your temple visits, you might enjoy a traditional tea ceremony nearby.',
      actionLabel: 'Learn More',
      location: 'Asakusa District'
    }
  ]);

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4 text-blue-500" />;
      case 'gap': return <Clock className="h-4 w-4 text-green-500" />;
      case 'weather': return <span className="text-sm">⛅</span>;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-amber-200 bg-amber-50';
      case 'recommendation': return 'border-blue-200 bg-blue-50';
      case 'gap': return 'border-green-200 bg-green-50';
      case 'weather': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <Card className="h-fit sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mb-4">
            <TabsTrigger value="suggestions" className="text-xs">Suggestions</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="space-y-3 px-4 pb-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-3 rounded-lg border ${getSuggestionColor(suggestion.type)}`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {getSuggestionIcon(suggestion.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {suggestion.description}
                    </p>
                    {(suggestion.time || suggestion.location) && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        {suggestion.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {suggestion.time}
                          </span>
                        )}
                        {suggestion.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {suggestion.location}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {suggestion.actionLabel && (
                  <div className="flex gap-1">
                    <Button size="sm" className="h-7 text-xs flex-1">
                      {suggestion.actionLabel}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4 px-4 pb-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <h4 className="font-medium text-sm mb-1">Trip Pace</h4>
                <p className="text-xs text-muted-foreground">
                  Your itinerary has a moderate pace with good balance between activities and rest.
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <h4 className="font-medium text-sm mb-1">Budget Tracking</h4>
                <p className="text-xs text-muted-foreground">
                  You're 23% under budget so far. Consider adding a special dining experience.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="font-medium text-sm mb-1">Group Coordination</h4>
                <p className="text-xs text-muted-foreground">
                  2 activities need confirmation from group members.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
