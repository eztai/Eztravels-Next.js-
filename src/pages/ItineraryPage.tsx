
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Plus, Edit, Navigation, Bot, Calendar, Map, ChevronDown, Filter, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockItinerary } from '@/utils/mockData';
import { AIAssistantPanel } from '@/components/AIAssistantPanel';
import { DraggableActivityItem } from '@/components/DraggableActivityItem';
import { SmartAddActivityDialog } from '@/components/SmartAddActivityDialog';
import { MapViewComponent } from '@/components/MapViewComponent';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

const ItineraryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get('tripId');
  const [activeTab, setActiveTab] = useState('timeline');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([mockItinerary.currentDay]);
  const [editMode, setEditMode] = useState(false);
  const [itineraryData, setItineraryData] = useState(mockItinerary);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transport': return '🚗';
      case 'accommodation': return '🏨';
      case 'dining': return '🍽️';
      case 'sightseeing': return '📸';
      default: return '📍';
    }
  };

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeActivityId = active.id;
      const overActivityId = over.id;

      setItineraryData(prev => {
        const newData = { ...prev };
        
        // Find which day contains the active activity
        const dayWithActiveActivity = newData.days.find(day => 
          day.activities.some(activity => activity.id === activeActivityId)
        );
        
        if (dayWithActiveActivity) {
          const oldIndex = dayWithActiveActivity.activities.findIndex(activity => activity.id === activeActivityId);
          const newIndex = dayWithActiveActivity.activities.findIndex(activity => activity.id === overActivityId);
          
          dayWithActiveActivity.activities = arrayMove(dayWithActiveActivity.activities, oldIndex, newIndex);
        }
        
        return newData;
      });
    }
  };

  const filteredDays = itineraryData.days.filter(day => 
    selectedDays.length === 0 || selectedDays.includes(day.day)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Sticky Navigation Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{itineraryData.tripTitle}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>Day {itineraryData.currentDay} of {itineraryData.totalDays}</span>
                {tripId && <span className="text-xs">Trip ID: {tripId}</span>}
                <Badge variant="outline" className="bg-blue-50">
                  <Users className="h-3 w-3 mr-1" />
                  3 travelers
                </Badge>
              </div>
            </div>
            <div className="h-12 w-1 bg-primary rounded-full relative">
              <div 
                className="absolute w-3 h-3 bg-primary rounded-full -left-1 transition-all duration-500"
                style={{ 
                  top: `${(itineraryData.currentDay / itineraryData.totalDays) * 100}%`,
                  transform: 'translateY(-50%)'
                }}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={editMode ? "default" : "outline"} 
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              <Edit className="h-4 w-4 mr-1" />
              {editMode ? 'Done' : 'Edit'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAIPanel(!showAIPanel)}
              className={showAIPanel ? 'bg-primary/10' : ''}
            >
              <Bot className="h-4 w-4 mr-1" />
              AI Assistant
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="h-4 w-4 mr-1" />
              Navigate
            </Button>
            <Button size="sm" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Activity
            </Button>
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-2 pb-4">
          <span className="text-sm font-medium">View Days:</span>
          {itineraryData.days.map((day) => (
            <Button
              key={day.day}
              variant={selectedDays.includes(day.day) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleDay(day.day)}
              className="h-8"
            >
              Day {day.day}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedDays(itineraryData.days.map(d => d.day))}
            className="text-muted-foreground"
          >
            All Days
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className={`transition-all duration-300 ${showAIPanel ? 'flex-1' : 'w-full'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Map View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-6 mt-6">
              {filteredDays.map((day) => (
                <Card key={day.day} className={`${day.day === itineraryData.currentDay ? 'ring-2 ring-primary shadow-lg' : ''} relative overflow-hidden`}>
                  {day.day === itineraryData.currentDay && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span>Day {day.day} - {day.date}</span>
                        {day.day === itineraryData.currentDay && (
                          <Badge variant="default" className="animate-pulse">Today</Badge>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {day.activities.length} activities
                        </div>
                        {editMode && (
                          <Badge variant="outline" className="text-xs bg-blue-50">
                            Drag to reorder
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext 
                        items={day.activities.map(a => a.id)} 
                        strategy={verticalListSortingStrategy}
                      >
                        {day.activities.map((activity, index) => (
                          <DraggableActivityItem
                            key={activity.id}
                            activity={activity}
                            isLast={index === day.activities.length - 1}
                            getTypeIcon={getTypeIcon}
                            getStatusColor={getStatusColor}
                            editMode={editMode}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <MapViewComponent activities={itineraryData.days.flatMap(day => day.activities)} />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant Panel */}
        {showAIPanel && (
          <div className="w-80 shrink-0">
            <AIAssistantPanel />
          </div>
        )}
      </div>

      {/* Smart Add Activity Dialog */}
      <SmartAddActivityDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default ItineraryPage;
