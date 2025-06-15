
export interface TripStatus {
  id: string;
  name: string;
  color: string;
  badgeVariant: 'default' | 'secondary' | 'outline' | 'destructive';
}

export const tripStatuses: TripStatus[] = [
  {
    id: 'active',
    name: 'Active',
    color: 'text-green-600',
    badgeVariant: 'default'
  },
  {
    id: 'upcoming',
    name: 'Upcoming',
    color: 'text-blue-600',
    badgeVariant: 'default'
  },
  {
    id: 'planned',
    name: 'Planned',
    color: 'text-orange-600',
    badgeVariant: 'outline'
  },
  {
    id: 'draft',
    name: 'Draft',
    color: 'text-gray-600',
    badgeVariant: 'secondary'
  },
  {
    id: 'completed',
    name: 'Completed',
    color: 'text-purple-600',
    badgeVariant: 'secondary'
  }
];
