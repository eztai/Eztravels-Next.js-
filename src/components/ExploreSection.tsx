
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Sparkles, Star } from 'lucide-react';

interface TripIdea {
  id: number;
  title: string;
  location: string;
  duration: string;
  budget: string;
  image: string;
  rating: number;
  tags: string[];
  aiGenerated: boolean;
  description: string;
}

const tripIdeas: TripIdea[] = [
  {
    id: 1,
    title: "Cherry Blossom Adventure",
    location: "Tokyo, Japan",
    duration: "7 days",
    budget: "$2,500",
    image: "https://source.unsplash.com/400x300/?tokyo,cherry-blossom",
    rating: 4.9,
    tags: ["Culture", "Spring", "Photography"],
    aiGenerated: true,
    description: "Experience Japan's iconic cherry blossom season"
  },
  {
    id: 2,
    title: "Mediterranean Escape",
    location: "Santorini, Greece",
    duration: "5 days",
    budget: "$1,800",
    image: "https://source.unsplash.com/400x300/?santorini",
    rating: 4.8,
    tags: ["Beach", "Romantic", "Sunset"],
    aiGenerated: true,
    description: "Stunning sunsets and white-washed villages"
  },
  {
    id: 3,
    title: "Alpine Adventure",
    location: "Swiss Alps",
    duration: "6 days",
    budget: "$3,200",
    image: "https://source.unsplash.com/400x300/?swiss-alps",
    rating: 4.7,
    tags: ["Adventure", "Hiking", "Nature"],
    aiGenerated: false,
    description: "Breathtaking mountain landscapes and hiking"
  },
  {
    id: 4,
    title: "Cultural Immersion",
    location: "Marrakech, Morocco",
    duration: "4 days",
    budget: "$1,200",
    image: "https://source.unsplash.com/400x300/?marrakech",
    rating: 4.6,
    tags: ["Culture", "Markets", "Food"],
    aiGenerated: true,
    description: "Vibrant souks and stunning architecture"
  }
];

export const ExploreSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Discover Your Next Adventure</h2>
        <p className="text-muted-foreground">AI-curated trips based on trending destinations and your preferences</p>
      </div>

      {/* Categories */}
      <div className="flex gap-4 justify-center flex-wrap">
        {['Top AI Picks', 'Seasonal Escapes', 'Community Favorites', 'Budget Friendly'].map((category) => (
          <Button key={category} variant="outline" className="rounded-full">
            {category}
          </Button>
        ))}
      </div>

      {/* Trip Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tripIdeas.map((trip) => (
          <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${trip.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {trip.aiGenerated && (
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Pick
                  </Badge>
                )}
              </div>
              
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {trip.rating}
              </div>

              {/* Trip Info Overlay */}
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-bold text-lg">{trip.title}</h3>
                <p className="text-sm opacity-90 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {trip.location}
                </p>
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">{trip.description}</p>
              
              {/* Trip Details */}
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {trip.duration}
                </div>
                <div className="flex items-center gap-1 font-medium text-primary">
                  <DollarSign className="h-3 w-3" />
                  {trip.budget}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {trip.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {trip.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{trip.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  Start Planning
                </Button>
                <Button size="sm" variant="outline">
                  Customize
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feeling Adventurous */}
      <div className="text-center pt-6">
        <Button size="lg" variant="outline" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <Sparkles className="h-4 w-4 mr-2" />
          Feeling Adventurous? Surprise Me!
        </Button>
      </div>
    </div>
  );
};
