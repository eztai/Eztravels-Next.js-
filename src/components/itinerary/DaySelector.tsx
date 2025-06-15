
import React from 'react';
import { Button } from '@/components/ui/button';

interface DaySelectorProps {
  days: Array<{ day: number; date: string }>;
  selectedDays: number[];
  onToggleDay: (day: number) => void;
  onSelectAllDays: () => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  selectedDays,
  onToggleDay,
  onSelectAllDays
}) => {
  return (
    <div className="flex items-center gap-2 pb-4">
      <span className="text-sm font-medium">View Days:</span>
      {days.map((day) => (
        <Button
          key={day.day}
          variant={selectedDays.includes(day.day) ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleDay(day.day)}
          className="h-8"
        >
          Day {day.day}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSelectAllDays}
        className="text-muted-foreground"
      >
        All Days
      </Button>
    </div>
  );
};
