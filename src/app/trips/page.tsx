'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { mockTrips, type EnhancedTrip } from '@/utils/mockData';
import { PageLayout } from '@/components/PageLayout';
import { PageHeader } from '@/components/PageHeader';
import { TripViewControls } from '@/components/TripViewControls';
import { SavedLocationsView } from '@/components/SavedLocationsView';
import { CalendarView } from '@/components/CalendarView';
import { TripsTabContent } from '@/components/trips/TripsTabContent';

// Enhanced mock data with progress indicators - updated to 2025 dates
const enhancedTrips = {
  current: [
    {
      ...mockTrips.current[0],
      startDate: "2025-06-15",
      endDate: "2025-06-22",
      travelers: [
        { id: '1', name: 'John Doe', confirmed: true },
        { id: '2', name: 'Jane Smith', confirmed: true }
      ],
      progress: {
        budget: { used: 1200, total: 3500 },
        activities: { planned: 6, total: 7 },
        confirmations: { flights: true, accommodation: true }
      },
      nextActivity: 'Visit Senso-ji Temple at 9:00 AM',
      pinned: true
    } as EnhancedTrip
  ],
  upcoming: [
    {
      ...mockTrips.upcoming[0],
      startDate: "2025-08-10",
      endDate: "2025-08-20",
      travelers: [
        { id: '1', name: 'John Doe', confirmed: true },
        { id: '2', name: 'Sarah Wilson', confirmed: false },
        { id: '3', name: 'Mike Johnson', confirmed: true }
      ],
      progress: {
        budget: { used: 0, total: 4000 },
        activities: { planned: 3, total: 10 },
        confirmations: { flights: false, accommodation: false }
      },
      pinned: false
    } as EnhancedTrip,
    {
      ...mockTrips.upcoming[1],
      startDate: "2025-09-05",
      endDate: "2025-09-12",
      travelers: [
        { id: '1', name: 'John Doe', confirmed: true },
        { id: '2', name: 'Alex Brown', confirmed: false }
      ],
      progress: {
        budget: { used: 0, total: 2800 },
        activities: { planned: 8, total: 8 },
        confirmations: { flights: true, accommodation: false }
      },
      pinned: false
    } as EnhancedTrip
  ],
  past: [
    {
      ...mockTrips.past[0],
      startDate: "2025-03-01",
      endDate: "2025-03-10",
      travelers: [
        { id: '1', name: 'John Doe', confirmed: true },
        { id: '2', name: 'Jane Smith', confirmed: true }
      ],
      progress: {
        budget: { used: 1850, total: 2000 },
        activities: { planned: 9, total: 9 },
        confirmations: { flights: true, accommodation: true }
      },
      pinned: false
    } as EnhancedTrip
  ]
};

export default function MyTripsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('current');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [pinnedTrips, setPinnedTrips] = useState<number[]>([1]);

  const handleViewItinerary = (tripId: number) => {
    router.push(`/itinerary?tripId=${tripId}`);
  };

  const handleViewBudget = (tripId: number) => {
    router.push(`/budget?tripId=${tripId}`);
  };

  const handleEditTrip = (tripId: number) => {
    router.push(`/trips/edit/${tripId}`);
  };

  const togglePin = (tripId: number) => {
    setPinnedTrips(prev => 
      prev.includes(tripId) 
        ? prev.filter(id => id !== tripId)
        : [...prev, tripId]
    );
  };

  // Get all trips for calendar view
  const allTrips = [...enhancedTrips.current, ...enhancedTrips.upcoming, ...enhancedTrips.past];

  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <PageHeader 
          title="My Trips" 
          description="Manage your travel adventures with smart insights"
        >
          <Button className="gap-2" onClick={() => router.push('/trips/new')}>
            <Plus className="h-4 w-4" />
            New Trip
          </Button>
        </PageHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TripViewControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              filterBy={filterBy}
              onFilterChange={setFilterBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              showControls={activeTab !== 'calendar' && activeTab !== 'saved'}
            />
          </div>

          <TabsContent value="current" className="space-y-4">
            <TripsTabContent
              trips={enhancedTrips.current}
              pinnedTrips={pinnedTrips}
              viewMode={viewMode}
              onViewItinerary={handleViewItinerary}
              onViewBudget={handleViewBudget}
              onEditTrip={handleEditTrip}
              onTogglePin={togglePin}
              emptyTitle="No current trips"
              emptyDescription="Start planning your next adventure"
            />
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <TripsTabContent
              trips={enhancedTrips.upcoming}
              pinnedTrips={pinnedTrips}
              viewMode={viewMode}
              onViewItinerary={handleViewItinerary}
              onViewBudget={handleViewBudget}
              onEditTrip={handleEditTrip}
              onTogglePin={togglePin}
              emptyTitle="No upcoming trips"
              emptyDescription="Plan your next getaway"
            />
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <TripsTabContent
              trips={enhancedTrips.past}
              pinnedTrips={pinnedTrips}
              viewMode={viewMode}
              onViewItinerary={handleViewItinerary}
              onViewBudget={handleViewBudget}
              onEditTrip={handleEditTrip}
              onTogglePin={togglePin}
              emptyTitle="No past trips"
              emptyDescription="Your travel history will appear here"
            />
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <SavedLocationsView />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <CalendarView
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              trips={allTrips}
              onViewItinerary={handleViewItinerary}
              onViewBudget={handleViewBudget}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
} 