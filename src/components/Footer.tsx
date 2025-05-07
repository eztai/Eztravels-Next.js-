
import React from 'react';
import { Compass, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                JourneyBuddy
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your personal travel assistant. Plan smarter, travel better.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Trip Planning</a></li>
              <li><a href="#" className="hover:text-primary">Budget Tracker</a></li>
              <li><a href="#" className="hover:text-primary">AI Assistant</a></li>
              <li><a href="#" className="hover:text-primary">Itinerary Builder</a></li>
              <li><a href="#" className="hover:text-primary">Calendar Sync</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Travel Guides</a></li>
              <li><a href="#" className="hover:text-primary">Destination Tips</a></li>
              <li><a href="#" className="hover:text-primary">Packing Lists</a></li>
              <li><a href="#" className="hover:text-primary">Travel Insurance</a></li>
              <li><a href="#" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-muted-foreground/10 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JourneyBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
