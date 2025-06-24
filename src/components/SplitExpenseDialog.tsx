'use client'

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SplitExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: any;
  tripParticipants: Array<{
    id: number;
    name: string;
    email: string;
  }>;
}

export const SplitExpenseDialog: React.FC<SplitExpenseDialogProps> = ({
  open,
  onOpenChange,
  expense,
  tripParticipants
}) => {
  const [splitMethod, setSplitMethod] = useState('equal');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});

  useEffect(() => {
    if (expense && open) {
      setSelectedFriends(expense.sharedWith || []);
      // Initialize custom amounts
      const amounts: Record<string, string> = {};
      expense.sharedWith?.forEach((friend: string) => {
        amounts[friend] = '';
      });
      setCustomAmounts(amounts);
    }
  }, [expense, open]);

  const handleFriendToggle = (friendName: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendName)
        ? prev.filter(name => name !== friendName)
        : [...prev, friendName]
    );
  };

  const handleCustomAmountChange = (friendName: string, amount: string) => {
    setCustomAmounts(prev => ({
      ...prev,
      [friendName]: amount
    }));
  };

  const calculateSplit = () => {
    if (!expense || selectedFriends.length === 0) return [];

    const totalAmount = expense.amount;
    const totalPeople = selectedFriends.length + 1; // +1 for the person who paid

    switch (splitMethod) {
      case 'equal':
        const equalAmount = totalAmount / totalPeople;
        return selectedFriends.map(friend => ({
          name: friend,
          amount: equalAmount.toFixed(2)
        }));
      case 'custom':
        return selectedFriends.map(friend => ({
          name: friend,
          amount: customAmounts[friend] || '0.00'
        }));
      default:
        return [];
    }
  };

  const splitPreview = calculateSplit();

  const handleSplit = () => {
    console.log('Splitting expense:', {
      expenseId: expense?.id,
      method: splitMethod,
      friends: selectedFriends,
      amounts: splitPreview
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Split Expense</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {expense && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">{expense.description}</p>
              <p className="text-sm text-muted-foreground">${expense.amount} • {expense.date}</p>
            </div>
          )}

          <div>
            <Label className="text-sm font-medium">Split with friends</Label>
            <div className="space-y-2 mt-2">
              {tripParticipants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`friend-${participant.id}`}
                    className="rounded"
                    checked={selectedFriends.includes(participant.name)}
                    onChange={() => handleFriendToggle(participant.name)}
                  />
                  <label htmlFor={`friend-${participant.id}`} className="flex items-center gap-2 flex-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{participant.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Split method</Label>
            <Select value={splitMethod} onValueChange={setSplitMethod}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equal">Split equally</SelectItem>
                <SelectItem value="custom">Custom amounts</SelectItem>
                <SelectItem value="percentage">By percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {splitMethod === 'custom' && selectedFriends.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Custom amounts</Label>
              {selectedFriends.map((friend) => (
                <div key={friend} className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {friend.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm flex-1">{friend}</span>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-20"
                    value={customAmounts[friend] || ''}
                    onChange={(e) => handleCustomAmountChange(friend, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {selectedFriends.length > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <Label className="text-sm font-medium text-blue-900">Split Preview</Label>
              <div className="space-y-1 mt-2">
                {splitPreview.map((split) => (
                  <div key={split.name} className="flex justify-between text-sm">
                    <span>{split.name}</span>
                    <span className="font-medium">${split.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSplit} 
              className="flex-1"
              disabled={selectedFriends.length === 0}
            >
              Split Expense
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
