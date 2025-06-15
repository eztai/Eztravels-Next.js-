
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, List } from 'lucide-react';

interface TripViewControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  filterBy: string;
  onFilterChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  showControls?: boolean;
}

export const TripViewControls: React.FC<TripViewControlsProps> = ({
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  viewMode,
  onViewModeChange,
  showControls = true
}) => {
  if (!showControls) return null;

  return (
    <div className="flex gap-2">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Sort by Date</SelectItem>
          <SelectItem value="name">Sort by Name</SelectItem>
          <SelectItem value="budget">Sort by Budget</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterBy} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Trips</SelectItem>
          <SelectItem value="solo">Solo Travel</SelectItem>
          <SelectItem value="group">Group Travel</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex border rounded-md">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
          className="rounded-r-none"
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('list')}
          className="rounded-l-none"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
