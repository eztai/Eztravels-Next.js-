
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Receipt, 
  CheckCircle, 
  Share2, 
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExpenseItemProps {
  expense: {
    id: number;
    description: string;
    amount: number;
    category: string;
    paidBy: string;
    sharedWith: string[];
    date: string;
    currency: string;
    isShared: boolean;
  };
  onSplit: () => void;
  onEdit: () => void;
  onDelete: () => void;
  showSharedWith?: boolean;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onSplit,
  onEdit,
  onDelete,
  showSharedWith = false
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="p-2 bg-muted rounded-full">
          <Receipt className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">{expense.description}</p>
            {expense.isShared && (
              <Badge variant="outline" className="text-xs">
                Split with {expense.sharedWith.length}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{expense.date}</span>
            <span>•</span>
            <span>Paid by {expense.paidBy}</span>
            <span>•</span>
            <Badge variant="outline" className="text-xs">{expense.category}</Badge>
          </div>
          {showSharedWith && expense.sharedWith.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">Shared with:</span>
              <div className="flex -space-x-1">
                {expense.sharedWith.slice(0, 3).map((person, index) => (
                  <Avatar key={index} className="w-6 h-6 border-2 border-background">
                    <AvatarFallback className="text-xs">
                      {person.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {expense.sharedWith.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                    +{expense.sharedWith.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold">${expense.amount}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onSplit} className="gap-2">
              <Share2 className="h-4 w-4" />
              {expense.isShared ? 'Update Split' : 'Split w/ Friends'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onEdit} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="gap-2 text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
