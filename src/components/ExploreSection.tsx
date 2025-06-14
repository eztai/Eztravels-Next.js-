
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Plus, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    country: "Greece",
    rating: 4.8,
    image: "https://source.unsplash.com/400x300/?santorini",
    tags: ["Beach", "Romantic", "Views", "Restaurant"],
    description: "Stunning sunsets and white-washed buildings",
    price: "$200-400/night"
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    country: "Japan",
    rating: 4.9,
    image: "https://source.unsplash.com/400x300/?kyoto",
    tags: ["Culture", "Temple", "Traditional", "Restaurant"],
    description: "Ancient temples and beautiful gardens",
    price: "$100-250/night"
  },
  {
    id: 3,
    name: "Banff National Park",
    country: "Canada",
    rating: 4.7,
    image: "https://source.unsplash.com/400x300/?banff",
    tags: ["Nature", "Adventure", "Hiking", "Hotel"],
    description: "Breathtaking mountain landscapes",
    price: "$150-300/night"
  },
  {
    id: 4,
    name: "Marrakech, Morocco",
    country: "Morocco",
    rating: 4.6,
    image: "https://source.unsplash.com/400x300/?marrakech",
    tags: ["Culture", "Market", "Adventure", "Restaurant"],
    description: "Vibrant souks and stunning architecture",
    price: "$80-200/night"
  },
  {
    id: 5,
    name: "Reykjavik, Iceland",
    country: "Iceland",
    rating: 4.8,
    image: "https://source.unsplash.com/400x300/?reykjavik",
    tags: ["Nature", "Adventure", "Northern Lights", "Hotel"],
    description: "Gateway to natural wonders",
    price: "$200-500/night"
  },
  {
    id: 6,
    name: "Bali, Indonesia",
    country: "Indonesia",
    rating: 4.7,
    image: "https://source.unsplash.com/400x300/?bali",
    tags: ["Beach", "Spa", "Culture", "Children"],
    description: "Tropical paradise with rich culture",
    price: "$50-200/night"
  }
];

const quickFilters = [
  { label: "Restaurants", tag: "Restaurant", icon: "🍽️" },
  { label: "Hotels", tag: "Hotel", icon: "🏨" },
  { label: "Children", tag: "Children", icon: "👨‍👩‍👧‍👦" },
  { label: "Adventure", tag: "Adventure", icon: "🏔️" },
  { label: "Beach", tag: "Beach", icon: "🏖️" },
  { label: "Culture", tag: "Culture", icon: "🏛️" },
];

interface ExploreSectionProps {
  onAddToTrip: (destination: any, tripType: 'current' | 'future') => void;
}

const ExploreSection: React.FC<ExploreSectionProps> = ({ onAddToTrip }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !selectedFilter || dest.tags.includes(selectedFilter);
    const matchesLocation = !locationFilter || dest.country === locationFilter;
    
    return matchesSearch && matchesFilter && matchesLocation;
  });

  const countries = [...new Set(destinations.map(d => d.country))];

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations, activities, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              <SelectItem value="nearby">Near Me</SelectItem>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedFilter === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('')}
            className="h-8"
          >
            <Filter className="h-3 w-3 mr-1" />
            All
          </Button>
          {quickFilters.map(filter => (
            <Button
              key={filter.tag}
              variant={selectedFilter === filter.tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter.tag)}
              className="h-8"
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDestinations.map(destination => (
          <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {destination.rating}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{destination.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {destination.country}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{destination.description}</p>
              <p className="text-sm font-medium text-primary">{destination.price}</p>
              
              <div className="flex flex-wrap gap-1">
                {destination.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {destination.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{destination.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onAddToTrip(destination, 'current')}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Current Trip
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onAddToTrip(destination, 'future')}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Future Trip
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
