
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Sparkles, Star } from 'lucide-react';
import { allTripIdeas, type TripIdea } from '@/utils/mockData';
import { tripCategories } from '@/utils/metadata';

interface ExploreSectionProps {
  chatContext?: string;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({ chatContext = '' }) => {
  // Filter trip ideas based on chat context
  const getFilteredTripIdeas = () => {
    if (!chatContext) return allTripIdeas;

    const context = chatContext.toLowerCase();
    let filtered = allTripIdeas;

    // Filter by category keywords
    if (context.includes('beach') || context.includes('ocean') || context.includes('coast')) {
      filtered = filtered.filter(trip => trip.category === 'beach');
    } else if (context.includes('mountain') || context.includes('hiking') || context.includes('alpine')) {
      filtered = filtered.filter(trip => trip.category === 'mountain');
    } else if (context.includes('culture') || context.includes('city') || context.includes('art')) {
      filtered = filtered.filter(trip => trip.category === 'cultural');
    }

    // Filter by season/month
    if (context.includes('july') || context.includes('summer')) {
      filtered = filtered.filter(trip => 
        trip.tags.some(tag => tag.toLowerCase().includes('july')) ||
        trip.category === 'beach'
      );
    }

    // Mark as assistant recommended if filtered
    if (chatContext && filtered.length < allTripIdeas.length) {
      filtered = filtered.map(trip => ({ ...trip, aiGenerated: true }));
    }

    return filtered.length > 0 ? filtered : allTripIdeas.slice(0, 4);
  };

  const tripIdeas = getFilteredTripIdeas();
  const isFiltered = chatContext && tripIdeas.length < allTripIdeas.length;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
          {isFiltered ? 'Recommended For You' : 'Discover Your Next Adventure'}
        </h2>
        <p className="text-muted-foreground">
          {isFiltered 
            ? 'Based on our conversation, here are perfect matches for your trip'
            : 'AI-curated trips based on trending destinations and preferences'
          }
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-4 justify-center flex-wrap">
        {tripCategories.map((category) => (
          <Button 
            key={category.id} 
            variant="outline" 
            className="rounded-full hover:bg-gradient-to-r hover:from-orange-100 hover:to-blue-100 border-orange-200 transition-all duration-300"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Trip Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tripIdeas.map((trip) => (
          <Card key={trip.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border border-orange-100 hover:border-orange-200">
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${trip.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {trip.aiGenerated && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-blue-500 text-white shadow-lg">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {isFiltered ? 'Assistant Recommended' : 'AI Pick'}
                  </Badge>
                )}
              </div>
              
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-sm shadow-md">
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
                <div className="flex items-center gap-1 font-medium text-orange-600">
                  <DollarSign className="h-3 w-3" />
                  {trip.budget}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {trip.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-orange-50 text-orange-700">
                    {tag}
                  </Badge>
                ))}
                {trip.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs border-orange-200">
                    +{trip.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 hover:shadow-lg">
                  Add to Trip
                </Button>
                <Button size="sm" variant="outline" className="border-orange-200 hover:bg-orange-50">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {!isFiltered && (
        <div className="text-center pt-6">
          <Button size="lg" variant="outline" className="bg-gradient-to-r from-orange-50 to-blue-50 border-orange-200 hover:shadow-lg">
            <Sparkles className="h-4 w-4 mr-2" />
            Show More Adventures
          </Button>
        </div>
      )}
    </div>
  );
};
