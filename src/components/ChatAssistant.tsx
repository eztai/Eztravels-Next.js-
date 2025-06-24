'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI travel assistant. I can help you discover amazing destinations, plan your itinerary, and make travel recommendations. What kind of trip are you planning?",
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
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'd be happy to help you with that! Let me suggest some destinations based on your interests. You can also explore the destinations in the Explore section and I'll help you add them to your itinerary.",
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

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
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
            <Card className={`max-w-[80%] ${
              message.sender === 'user' ? 'bg-primary text-primary-foreground' : ''
            }`}>
              <CardContent className="p-3">
                <p className="text-sm">{message.text}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me about destinations, planning tips, or anything travel-related..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
