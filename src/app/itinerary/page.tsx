'use client'

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Map } from 'lucide-react';
import { mockItinerary, trips } from '@/utils/mockData';
import { SmartAddActivityDialog } from '@/components/SmartAddActivityDialog';
import { MapViewComponent } from '@/components/MapViewComponent';
import { PageLayout } from '@/components/PageLayout';
import { ItineraryHeader } from '@/components/itinerary/ItineraryHeader';
import { DaySelector } from '@/components/itinerary/DaySelector';
import { TripCalendarEvents } from '@/components/TripCalendarEvents';

export default function ItineraryPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams?.get('tripId');
  const [selectedTripId, setSelectedTripId] = useState(tripId || 'all');
  const [activeTab, setActiveTab] = useState('timeline');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([mockItinerary.currentDay]);
  const [editMode, setEditMode] = useState(false);
  const [itineraryData, setItineraryData] = useState(mockItinerary);

  const handleTripChange = (newTripId: string) => {
    setSelectedTripId(newTripId);
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

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    );
  };

  const filteredDays = currentItineraryData.days.filter(day => 
    selectedDays.length === 0 || selectedDays.includes(day.day)
  );

  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <ItineraryHeader
          selectedTripId={selectedTripId}
          onTripChange={handleTripChange}
          editMode={editMode}
          onEditModeChange={setEditMode}
          onAddActivity={() => setShowAddDialog(true)}
          tripTitle={currentItineraryData.tripTitle}
          currentDay={currentItineraryData.currentDay}
          totalDays={currentItineraryData.totalDays}
          isAllTrips={selectedTripId === 'all'}
        />

        <DaySelector
          days={currentItineraryData.days}
          selectedDays={selectedDays}
          onToggleDay={toggleDay}
          onSelectAllDays={() => setSelectedDays(currentItineraryData.days.map(d => d.day))}
        />

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
            <TripCalendarEvents
              selectedDate={new Date()}
              trips={[]}
              onViewItinerary={() => {}}
              onViewBudget={() => {}}
            />
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <MapViewComponent activities={currentItineraryData.days.flatMap(day => day.activities)} />
          </TabsContent>
        </Tabs>

        <SmartAddActivityDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
        />
      </div>
    </PageLayout>
  );
} 