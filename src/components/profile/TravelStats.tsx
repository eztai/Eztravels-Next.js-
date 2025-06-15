
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TravelStatsProps {
  stats: {
    totalTrips: number;
    totalSpent: number;
    upcomingTrips: number;
  };
}

export const TravelStats: React.FC<TravelStatsProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Stats</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{stats.totalTrips}</div>
          <div className="text-sm text-muted-foreground">Total Trips</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">${stats.totalSpent.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{stats.upcomingTrips}</div>
          <div className="text-sm text-muted-foreground">Upcoming Trips</div>
        </div>
      </CardContent>
    </Card>
  );
};
