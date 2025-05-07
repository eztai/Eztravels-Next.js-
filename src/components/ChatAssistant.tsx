
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Mic, Bot } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your JourneyBuddy assistant. How can I help with your trip planning today?",
    isUser: false,
    timestamp: new Date()
  }
];

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        "I can help you find activities in Bali. Would you like to explore beaches, cultural sites, or adventure activities?",
        "Based on your budget, I recommend taking public transportation in Tokyo. It's efficient and much more affordable than taxis.",
        "The best time to visit Paris is during spring or fall when there are fewer tourists and the weather is pleasant.",
        "I've found a few highly-rated restaurants near your hotel. Would you like me to show you options with vegetarian dishes?",
        "You might want to pack light clothing for Bali, but also bring a light jacket for evenings and air-conditioned places."
      ];
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        content: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div id="assistant" className="py-8">
      <h2 className="text-2xl font-bold mb-6">Travel Assistant</h2>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            JourneyBuddy Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] overflow-y-auto space-y-4 mb-4 p-1">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 mt-1">
                    {message.isUser ? (
                      <>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-accent text-white">AI</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div 
                    className={`p-3 rounded-lg ${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-accent text-white">AI</AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-muted flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full gap-2">
            <Button variant="outline" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Ask something about your trip..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatAssistant;
