
import React, { useState } from 'react';
import { Menu, X, User, Calendar, PlusCircle, MessageSquare, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b md:bg-white/80">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            JourneyBuddy
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="#trips" className="text-sm font-medium hover:text-primary transition-colors">
            My Trips
          </a>
          <a href="#budget" className="text-sm font-medium hover:text-primary transition-colors">
            Budget
          </a>
          <a href="#calendar" className="text-sm font-medium hover:text-primary transition-colors">
            Calendar
          </a>
          <a href="#assistant" className="text-sm font-medium hover:text-primary transition-colors">
            Assistant
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            New Trip
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a href="#dashboard" className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors">
              <Compass className="h-5 w-5 text-primary" /> Dashboard
            </a>
            <a href="#trips" className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors">
              <PlusCircle className="h-5 w-5 text-primary" /> My Trips
            </a>
            <a href="#budget" className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors">
              <Calendar className="h-5 w-5 text-primary" /> Budget
            </a>
            <a href="#calendar" className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors">
              <Calendar className="h-5 w-5 text-primary" /> Calendar
            </a>
            <a href="#assistant" className="flex items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors">
              <MessageSquare className="h-5 w-5 text-primary" /> Assistant
            </a>
            <div className="flex items-center gap-2 pt-4 border-t">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
              </Avatar>
              <span className="font-medium">John Doe</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
