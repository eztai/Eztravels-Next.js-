
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, X, Send, Mic, Sparkles, Clock, DollarSign, MapPin } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'activity' | 'budget' | 'reminder';
  tripId?: string;
}

interface PersistentAIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const PersistentAIAssistant: React.FC<PersistentAIAssistantProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI travel assistant. I can help you plan trips, manage budgets, split expenses, and suggest activities. What would you like to do today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestions: Suggestion[] = [
    {
      id: '1',
      title: 'Free afternoon on Day 3',
      description: 'Want activity suggestions for your Tokyo trip?',
      type: 'activity',
      tripId: '1'
    },
    {
      id: '2',
      title: 'Split dinner bill',
      description: 'Split the $89 dinner with Sarah and Mike?',
      type: 'budget',
      tripId: '1'
    },
    {
      id: '3',
      title: 'Trip starts soon',
      description: 'Your Paris trip starts in 3 days - ready?',
      type: 'reminder',
      tripId: '2'
    }
  ];

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
        text: "I'd be happy to help you with that! Let me analyze your request and provide some personalized suggestions.",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'activity': return MapPin;
      case 'budget': return DollarSign;
      case 'reminder': return Clock;
      default: return Bot;
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-secondary"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 shrink-0 border-l bg-background/95 backdrop-blur">
      <Card className="h-full rounded-none border-0 shadow-none">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 flex flex-col h-full">
          {/* Smart Suggestions */}
          <div className="p-4 border-b">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Smart Suggestions
            </h4>
            <div className="space-y-2">
              {suggestions.map((suggestion) => {
                const Icon = getIcon(suggestion.type);
                return (
                  <Card key={suggestion.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-2">
                      <Icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{suggestion.title}</p>
                        <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.sender === 'user' ? 'U' : <Bot className="h-4 w-4" />}
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
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Ask me anything about your travels..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-10"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
