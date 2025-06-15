
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Clock, MapPin, Lightbulb, AlertTriangle, Plus } from 'lucide-react';

interface SmartAddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Suggestion {
  id: string;
  title: string;
  location: string;
  type: string;
  duration: string;
  description: string;
  timeSlot?: string;
  conflictWarning?: string;
}

export const SmartAddActivityDialog: React.FC<SmartAddActivityDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('2');
  const [selectedTime, setSelectedTime] = useState('');
  const [suggestions] = useState<Suggestion[]>([
    {
      id: '1',
      title: 'Meiji Shrine',
      location: 'Shibuya',
      type: 'sightseeing',
      duration: '2 hours',
      description: 'Beautiful Shinto shrine surrounded by forest',
      timeSlot: '10:00 AM - 12:00 PM'
    },
    {
      id: '2',
      title: 'Shibuya Sky Observation Deck',
      location: 'Shibuya',
      type: 'sightseeing',
      duration: '1.5 hours',
      description: 'Panoramic views of Tokyo skyline',
      timeSlot: '6:00 PM - 7:30 PM'
    },
    {
      id: '3',
      title: 'Robot Restaurant',
      location: 'Shinjuku',
      type: 'dining',
      duration: '2 hours',
      description: 'Unique entertainment dining experience',
      timeSlot: '8:00 PM - 10:00 PM',
      conflictWarning: 'Late dinner - check group preferences'
    }
  ]);

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    suggestion.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sightseeing': return '📸';
      case 'dining': return '🍽️';
      case 'transport': return '🚗';
      case 'accommodation': return '🏨';
      default: return '📍';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Activity
          </DialogTitle>
          <DialogDescription>
            Search for activities or choose from AI recommendations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search Activities</Label>
              <Input
                id="search"
                placeholder="Search temples, restaurants, attractions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="day">Add to Day</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Day 1 - June 15</SelectItem>
                  <SelectItem value="2">Day 2 - June 16</SelectItem>
                  <SelectItem value="3">Day 3 - June 17</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time Conflict Detection */}
          {selectedTime && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">Time Conflict Detected</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                This overlaps with "Tokyo Skytree" (3:00 PM - 6:00 PM). Consider adjusting the time.
              </p>
            </div>
          )}

          {/* AI Suggestions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-blue-500" />
              <span className="font-medium">AI Recommendations</span>
              <Badge variant="secondary" className="text-xs">
                Based on your interests
              </Badge>
            </div>
            
            <div className="grid gap-3">
              {filteredSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{getTypeIcon(suggestion.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-medium">{suggestion.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {suggestion.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {suggestion.duration}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {suggestion.description}
                          </p>
                          {suggestion.timeSlot && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Suggested: {suggestion.timeSlot}
                            </Badge>
                          )}
                          {suggestion.conflictWarning && (
                            <div className="flex items-center gap-1 mt-2">
                              <AlertTriangle className="h-3 w-3 text-amber-500" />
                              <span className="text-xs text-amber-600">
                                {suggestion.conflictWarning}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button size="sm">Add</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Manual Entry */}
          <div className="border-t pt-6">
            <h3 className="font-medium mb-3">Create Custom Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Activity Title</Label>
                <Input id="title" placeholder="e.g., Visit local market" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Tsukiji Market" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="1.5hour">1.5 hours</SelectItem>
                    <SelectItem value="2hour">2 hours</SelectItem>
                    <SelectItem value="3hour">3 hours</SelectItem>
                    <SelectItem value="halfday">Half day</SelectItem>
                    <SelectItem value="fullday">Full day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1">Create Activity</Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
