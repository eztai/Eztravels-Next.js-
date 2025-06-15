import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Plus, Edit, Navigation, Calendar, Map, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockItinerary, trips } from '@/utils/mockData';
import { DraggableActivityItem } from '@/components/DraggableActivityItem';
import { SmartAddActivityDialog } from '@/components/SmartAddActivityDialog';
import { MapViewComponent } from '@/components/MapViewComponent';
import { TripSelector } from '@/components/TripSelector';
import { PageLayout } from '@/components/PageLayout';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

const ItineraryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tripId = searchParams.get('tripId');
  const [selectedTripId, setSelectedTripId] = useState(tripId || 'all');
  const [activeTab, setActiveTab] = useState('timeline');
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

  const handleTripChange = (newTripId: string) => {
    setSelectedTripId(newTripId);
    if (newTripId !== 'all') {
      setSearchParams({ tripId: newTripId });
    } else {
      setSearchParams({});
    }
    // In a real app, you would fetch the itinerary data for the selected trip
    console.log('Loading itinerary for trip:', newTripId);
  };

  // Create aggregated data for all trips view
  const getAllTripsData = () => {
    const allActivities = mockItinerary.days.flatMap(day => 
      day.activities.map(activity => ({
        ...activity,
        tripTitle: mockItinerary.tripTitle,
        dayNumber: day.day,
        date: day.date
      }))
    );

    // Group activities by date for better organization
    const groupedByDate = allActivities.reduce((acc, activity) => {
      const key = activity.date;
      if (!acc[key]) {
        acc[key] = {
          day: activity.dayNumber,
          date: activity.date,
          activities: []
        };
      }
      acc[key].activities.push(activity);
      return acc;
    }, {} as Record<string, any>);

    return {
      tripTitle: 'All Trips Overview',
      currentDay: 1,
      totalDays: Object.keys(groupedByDate).length,
      days: Object.values(groupedByDate)
    };
  };

  const currentItineraryData = selectedTripId === 'all' ? getAllTripsData() : itineraryData;

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

  const filteredDays = currentItineraryData.days.filter(day => 
    selectedDays.length === 0 || selectedDays.includes(day.day)
  );

  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        {/* Sticky Navigation Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              {/* Trip Selector */}
              <TripSelector
                selectedTripId={selectedTripId}
                onTripChange={handleTripChange}
                placeholder="Select a trip to view itinerary"
                showAllTripsOption={true}
              />
              
              {selectedTripId !== 'all' && (
                <div className="h-12 w-1 bg-primary rounded-full relative">
                  <div 
                    className="absolute w-3 h-3 bg-primary rounded-full -left-1 transition-all duration-500"
                    style={{ 
                      top: `${(itineraryData.currentDay / itineraryData.totalDays) * 100}%`,
                      transform: 'translateY(-50%)'
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={editMode ? "default" : "outline"} 
                size="sm"
                onClick={() => setEditMode(!editMode)}
                disabled={selectedTripId === 'all'}
              >
                <Edit className="h-4 w-4 mr-1" />
                {editMode ? 'Done' : 'Edit'}
              </Button>
              <Button variant="outline" size="sm" disabled={selectedTripId === 'all'}>
                <Navigation className="h-4 w-4 mr-1" />
                Navigate
              </Button>
              <Button size="sm" onClick={() => setShowAddDialog(true)} disabled={selectedTripId === 'all'}>
                <Plus className="h-4 w-4 mr-1" />
                Add Activity
              </Button>
            </div>
          </div>

          {/* Trip Info & Day Selector */}
          <div className="pb-2">
            <h1 className="text-3xl font-bold">{currentItineraryData.tripTitle}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              {selectedTripId === 'all' ? (
                <>
                  <span>{trips.length} trips • {currentItineraryData.days.length} days total</span>
                  <Badge variant="outline" className="bg-blue-50">
                    <Users className="h-3 w-3 mr-1" />
                    All travelers
                  </Badge>
                </>
              ) : (
                <>
                  <span>Day {currentItineraryData.currentDay} of {currentItineraryData.totalDays}</span>
                  <Badge variant="outline" className="bg-blue-50">
                    <Users className="h-3 w-3 mr-1" />
                    3 travelers
                  </Badge>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 pb-4">
            <span className="text-sm font-medium">View Days:</span>
            {currentItineraryData.days.map((day) => (
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
              onClick={() => setSelectedDays(currentItineraryData.days.map(d => d.day))}
              className="text-muted-foreground"
            >
              All Days
            </Button>
          </div>
        </div>

        {/* Main Content */}
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
              <Card key={`${day.day}-${day.date}`} className={`${day.day === currentItineraryData.currentDay && selectedTripId !== 'all' ? 'ring-2 ring-primary shadow-lg' : ''} relative overflow-hidden`}>
                {day.day === currentItineraryData.currentDay && selectedTripId !== 'all' && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span>Day {day.day} - {day.date}</span>
                      {day.day === currentItineraryData.currentDay && selectedTripId !== 'all' && (
                        <Badge variant="default" className="animate-pulse">Today</Badge>
                      )}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {day.activities.length} activities
                      </div>
                      {editMode && selectedTripId !== 'all' && (
                        <Badge variant="outline" className="text-xs bg-blue-50">
                          Drag to reorder
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedTripId !== 'all' && (
                        <Button variant="ghost" size="sm">
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTripId === 'all' ? (
                    // For all trips view, don't use drag and drop
                    day.activities.map((activity, index) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card relative">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                            {getTypeIcon(activity.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{activity.title}</h4>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{activity.time}</span>
                                <MapPin className="h-3 w-3 ml-2" />
                                <span>{activity.location}</span>
                                {selectedTripId === 'all' && activity.tripTitle && (
                                  <>
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      {activity.tripTitle}
                                    </Badge>
                                  </>
                                )}
                              </div>
                              {activity.description && (
                                <p className="text-sm text-muted-foreground mt-2">{activity.description}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(activity.status)}>
                                {activity.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // For specific trip view, use drag and drop
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
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <MapViewComponent activities={currentItineraryData.days.flatMap(day => day.activities)} />
          </TabsContent>
        </Tabs>

        {/* Smart Add Activity Dialog */}
        <SmartAddActivityDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
        />
      </div>
    </PageLayout>
  );
};

export default ItineraryPage;
