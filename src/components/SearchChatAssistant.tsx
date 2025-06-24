'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface SearchChatAssistantProps {
  onContextChange: (context: string) => void;
}

const SearchChatAssistant: React.FC<SearchChatAssistantProps> = ({ onContextChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI travel assistant. Ask me about destinations, trip ideas, or tell me what kind of adventure you're looking for. I'll show you personalized recommendations below!",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update context for filtering results
    onContextChange(inputMessage);
    
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Great! I've updated the recommendations below based on your interest in "${inputMessage}". Check out the personalized trip ideas I found for you!`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickSearch = (query: string) => {
    setInputMessage(query);
    onContextChange(query);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-orange-500" />
          AI Travel Search
        </h2>
        <p className="text-muted-foreground">
          Tell me what you're looking for and I'll find the perfect trip ideas for you
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me about beach destinations, mountain adventures, cultural cities, or anything travel-related..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Search Suggestions */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {['Beach destinations for July', 'Mountain hiking trips', 'Cultural city breaks', 'Adventure sports'].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => handleQuickSearch(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      {messages.length > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {messages.slice(1).map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchChatAssistant;
