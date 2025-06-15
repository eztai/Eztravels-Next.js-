
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, MapPin, Edit, MoreVertical, Users, MessageCircle, Camera, Navigation, CheckCircle, Thermometer, Rain } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Activity {
  id: number;
  time: string;
  title: string;
  location: string;
  duration: string;
  status: string;
  type: string;
}

interface DraggableActivityItemProps {
  activity: Activity;
  isLast: boolean;
  getTypeIcon: (type: string) => string;
  getStatusColor: (status: string) => string;
  editMode: boolean;
}

export const DraggableActivityItem: React.FC<DraggableActivityItemProps> = ({
  activity,
  isLast,
  getTypeIcon,
  getStatusColor,
  editMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [attendees] = useState(['Alice', 'Bob', 'Charlie']);
  const [notes] = useState([
    { id: 1, author: 'You', text: 'Bring passport for temple entry', time: '2h ago' },
    { id: 2, author: 'Alice', text: 'Should we book tickets in advance?', time: '1h ago' }
  ]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getActivityTags = (type: string) => {
    const tags: Record<string, string[]> = {
      'sightseeing': ['Cultural', 'Photo-worthy'],
      'dining': ['Food', 'Local'],
      'transport': ['Travel'],
      'accommodation': ['Lodging']
    };
    return tags[type] || [];
  };

  // Mock weather data per activity
  const getWeatherForActivity = (activityId: number) => {
    const weatherData = [
      { temp: 72, condition: 'sunny', rain: 0 },
      { temp: 68, condition: 'cloudy', rain: 20 },
      { temp: 75, condition: 'partly-cloudy', rain: 0 },
      { temp: 65, condition: 'rainy', rain: 80 },
    ];
    return weatherData[activityId % weatherData.length];
  };

  const weather = getWeatherForActivity(activity.id);

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`relative ${isDragging ? 'z-50' : ''}`}
    >
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-5 top-16 w-0.5 h-8 bg-border" />
      )}
      
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div 
          className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
            activity.status === 'current' ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-card hover:bg-muted/30'
          } ${isDragging ? 'shadow-xl scale-105' : ''} ${editMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
          {...(editMode ? { ...attributes, ...listeners } : {})}
        >
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg relative ${
              activity.status === 'completed' ? 'bg-green-100 border-2 border-green-200' :
              activity.status === 'current' ? 'bg-blue-100 border-2 border-blue-200' : 'bg-gray-100 border-2 border-gray-200'
            }`}>
              {activity.status === 'completed' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <span>{getTypeIcon(activity.type)}</span>
              )}
              {activity.status === 'current' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CollapsibleTrigger asChild>
                  <button className="text-left w-full">
                    <h3 className="font-semibold hover:text-primary transition-colors">
                      {activity.title}
                    </h3>
                  </button>
                </CollapsibleTrigger>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </span>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MapPin className="h-3 w-3" />
                    {activity.location}
                  </button>
                  <span>Duration: {activity.duration}</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {getActivityTags(activity.type).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs py-0 px-2">
                      {tag}
                    </Badge>
                  ))}
                  
                  {/* Weather indicator */}
                  <div className="flex items-center gap-1 text-xs bg-blue-50 border border-blue-200 rounded px-2 py-1">
                    <Thermometer className="h-3 w-3" />
                    {weather.temp}°F
                    {weather.rain > 0 && (
                      <>
                        <Rain className="h-3 w-3 ml-1 text-blue-600" />
                        {weather.rain}%
                      </>
                    )}
                  </div>
                  
                  <div className="flex -space-x-1">
                    {attendees.slice(0, 3).map((name, index) => (
                      <Avatar key={index} className="w-5 h-5 border border-background">
                        <AvatarFallback className="text-xs">
                          {name[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {attendees.length > 3 && (
                      <div className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center text-xs">
                        +{attendees.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(activity.status) + ' text-xs'}>
                  {activity.status}
                </Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Navigation className="h-3 w-3" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Activity
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="h-4 w-4 mr-2" />
                      Manage Attendees
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Camera className="h-4 w-4 mr-2" />
                      Add Photos
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <CollapsibleContent className="space-y-4 mt-4 ml-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Map Preview */}
            <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
              <div className="text-center text-sm text-muted-foreground">
                <MapPin className="h-6 w-6 mx-auto mb-1" />
                Interactive Map Preview
              </div>
            </div>

            {/* Weather & Travel Details */}
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium">Weather Forecast</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Thermometer className="h-3 w-3" />
                  {weather.temp}°F - {weather.condition}
                  {weather.rain > 0 && (
                    <>
                      <Rain className="h-3 w-3 ml-2" />
                      {weather.rain}% chance of rain
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium">Travel Method</p>
                <p className="text-xs text-muted-foreground">🚇 By train - 20 mins from previous location</p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm font-medium">Reminder</p>
                <p className="text-xs text-muted-foreground">📱 Book tickets online to skip the line</p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {notes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Group Comments ({notes.length})
              </h4>
              {notes.map((note) => (
                <div key={note.id} className="p-2 bg-muted rounded text-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-xs">{note.author}</span>
                    <span className="text-xs text-muted-foreground">{note.time}</span>
                  </div>
                  <p className="text-xs mt-1">{note.text}</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                Add Comment
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
