'use client'

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native-web';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useIsMobile } from '@/hooks/use-mobile';
import { calendarEvents } from '@/utils/mockData';

const Calendar: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const isMobile = useIsMobile();
  
  // Filter events for the selected date
  const selectedDateEvents = calendarEvents.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );

  // Get event dates for highlighting in calendar
  const eventDates = calendarEvents.map(event => event.date);
  
  // Function to get CSS class for event type
  const getEventClass = (type: string) => {
    switch(type) {
      case 'travel':
        return 'bg-primary text-primary-foreground';
      case 'accommodation':
        return 'bg-secondary text-secondary-foreground';
      case 'activity':
        return 'bg-accent text-accent-foreground';
      case 'food':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <View style={styles.container} id="calendar">
      <Text style={styles.heading}>Trip Calendar</Text>
      
      <View style={isMobile ? styles.gridMobile : styles.grid}>
        <Card className={isMobile ? "w-full" : "md:col-span-1"}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                eventDay: (day) => 
                  eventDates.some(eventDate => 
                    eventDate.toDateString() === day.toDateString()
                  )
              }}
              modifiersStyles={{
                eventDay: {
                  fontWeight: 'bold',
                  border: '2px solid var(--primary)',
                  color: 'var(--primary)'
                }
              }}
            />
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.travelDot]} />
                <Text style={styles.legendText}>Travel</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.accommodationDot]} />
                <Text style={styles.legendText}>Accommodation</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.activityDot]} />
                <Text style={styles.legendText}>Activity</Text>
              </View>
            </View>
          </CardContent>
        </Card>
        
        <Card className={isMobile ? "w-full mt-4" : "md:col-span-2"}>
          <CardHeader>
            <CardTitle className="text-lg">
              {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <ScrollView style={styles.eventsList}>
                {selectedDateEvents.map(event => (
                  <View 
                    key={event.id} 
                    style={styles.eventCard}
                    className={`p-3 rounded-lg ${getEventClass(event.type)} flex flex-col`}
                  >
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={styles.eventDetails}>
                      <View style={styles.eventDetail}>
                        <Clock style={styles.eventIcon} />
                        <Text style={styles.eventDetailText}>{event.time}</Text>
                      </View>
                      <View style={styles.eventDetail}>
                        <MapPin style={styles.eventIcon} />
                        <Text style={styles.eventDetailText}>{event.location}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.noEvents}>
                <Text style={styles.noEventsText}>No events scheduled for this day</Text>
              </View>
            )}
          </CardContent>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  legendContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  travelDot: {
    backgroundColor: 'var(--primary)',
  },
  accommodationDot: {
    backgroundColor: 'var(--secondary)',
  },
  activityDot: {
    backgroundColor: 'var(--accent)',
  },
  legendText: {
    fontSize: 14,
    color: 'var(--muted-foreground)',
  },
  eventsList: {
    gap: 16,
    maxHeight: 400,
  },
  eventCard: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  eventTitle: {
    fontWeight: '500',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventIcon: {
    width: 12,
    height: 12,
  },
  eventDetailText: {
    fontSize: 14,
  },
  noEvents: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  noEventsText: {
    color: 'var(--muted-foreground)',
  },
});

export default Calendar;
