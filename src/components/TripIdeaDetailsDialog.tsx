
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, DollarSign, Users, Calendar, Plus } from 'lucide-react';
import { TripIdea } from '@/utils/mockData';

interface TripIdeaDetailsDialogProps {
  tripIdea: TripIdea | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToTrip: (tripIdea: TripIdea) => void;
}

export const TripIdeaDetailsDialog: React.FC<TripIdeaDetailsDialogProps> = ({
  tripIdea,
  open,
  onOpenChange,
  onAddToTrip
}) => {
  if (!tripIdea) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {tripIdea.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Hero Image */}
          <div 
            className="h-64 bg-cover bg-center rounded-lg relative"
            style={{ backgroundImage: `url(${tripIdea.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-sm shadow-md">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {tripIdea.rating}
            </div>
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="font-bold text-xl">{tripIdea.title}</h3>
              <p className="text-sm opacity-90 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {tripIdea.location}
              </p>
            </div>
          </div>

          {/* Trip Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">{tripIdea.duration}</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <DollarSign className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">{tripIdea.budget}</div>
              <div className="text-xs text-muted-foreground">Budget</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">1-4</div>
              <div className="text-xs text-muted-foreground">Travelers</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Star className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">{tripIdea.rating}/5</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2">About This Trip</h4>
            <p className="text-muted-foreground">{tripIdea.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-semibold mb-2">What to Expect</h4>
            <div className="flex flex-wrap gap-2">
              {tripIdea.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-orange-50 text-orange-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-semibold mb-2">Trip Highlights</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Carefully curated itinerary with local experiences</li>
              <li>• Flexible scheduling to match your preferences</li>
              <li>• Budget-friendly options with premium upgrades available</li>
              <li>• 24/7 travel support and local recommendations</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={() => onAddToTrip(tripIdea)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 hover:shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Trip
            </Button>
            <Button variant="outline" className="border-orange-200 hover:bg-orange-50">
              <Calendar className="h-4 w-4 mr-2" />
              Plan Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
