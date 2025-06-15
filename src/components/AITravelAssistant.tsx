
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, X, ChevronDown, ChevronUp, Clock, DollarSign, MapPin, Users, Plane } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Suggestion {
  id: string;
  type: 'budget' | 'activity' | 'flight' | 'traveler' | 'reminder';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  tripId?: string;
}

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Tokyo trip starts in 2 days',
    description: 'Your Tokyo Adventure begins soon! Consider finalizing your budget and checking your itinerary.',
    action: 'Review Trip',
    priority: 'high',
    tripId: '1'
  },
  {
    id: '2',
    type: 'activity',
    title: 'Missing activities for Day 4',
    description: 'Your Tokyo trip has no activities planned for Day 4. Want help adding some?',
    action: 'Add Activities',
    priority: 'medium',
    tripId: '1'
  },
  {
    id: '3',
    type: 'flight',
    title: 'Flights found for your dates',
    description: 'Found flights matching your Paris trip dates from SFO → CDG starting at $450.',
    action: 'View Flights',
    priority: 'medium',
    tripId: '2'
  },
  {
    id: '4',
    type: 'traveler',
    title: '2 unconfirmed travelers',
    description: 'Sarah and Mike haven\'t confirmed their participation in your Iceland trip.',
    action: 'Send Reminders',
    priority: 'low',
    tripId: '3'
  }
];

interface AITravelAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AITravelAssistant: React.FC<AITravelAssistantProps> = ({ isOpen, onToggle }) => {
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'budget': return DollarSign;
      case 'activity': return MapPin;
      case 'flight': return Plane;
      case 'traveler': return Users;
      case 'reminder': return Clock;
      default: return Bot;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 shrink-0">
      <Card className="sticky top-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">AI Travel Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground mb-4">
            Smart suggestions for your upcoming trips
          </div>
          
          {mockSuggestions.map((suggestion) => {
            const Icon = getIcon(suggestion.type);
            const isExpanded = expandedSuggestion === suggestion.id;
            
            return (
              <Collapsible key={suggestion.id}>
                <Card className="border-l-4 border-l-primary/20 hover:shadow-md transition-shadow">
                  <CollapsibleTrigger asChild>
                    <div className="p-3 cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1">
                          <Icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{suggestion.title}</span>
                              <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                                {suggestion.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {suggestion.description}
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-3 pb-3 pt-0">
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          {suggestion.action}
                        </Button>
                        <Button size="sm" variant="outline">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
          
          <div className="pt-3 border-t">
            <Button variant="outline" className="w-full" size="sm">
              <Bot className="h-4 w-4 mr-2" />
              Ask AI Assistant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
