
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: any;
  tripParticipants: Array<{
    id: number;
    name: string;
    email: string;
  }>;
}

export const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({
  open,
  onOpenChange,
  expense,
  tripParticipants
}) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    paidBy: 'You',
    date: new Date().toISOString().split('T')[0],
    currency: 'USD',
    notes: '',
    isShared: false,
    sharedWith: [] as string[]
  });

  useEffect(() => {
    if (expense && open) {
      setFormData({
        description: expense.description || '',
        amount: expense.amount?.toString() || '',
        category: expense.category || '',
        paidBy: expense.paidBy || 'You',
        date: expense.date || new Date().toISOString().split('T')[0],
        currency: expense.currency || 'USD',
        notes: expense.notes || '',
        isShared: expense.isShared || false,
        sharedWith: expense.sharedWith || []
      });
    } else if (open) {
      // Reset form for new expense
      setFormData({
        description: '',
        amount: '',
        category: '',
        paidBy: 'You',
        date: new Date().toISOString().split('T')[0],
        currency: 'USD',
        notes: '',
        isShared: false,
        sharedWith: []
      });
    }
  }, [expense, open]);

  const categories = [
    'Lodging',
    'Food & Dining',
    'Transportation',
    'Activities',
    'Shopping',
    'Other'
  ];

  const handleSave = () => {
    console.log('Saving expense:', formData);
    onOpenChange(false);
  };

  const handleSharedWithToggle = (participantName: string) => {
    setFormData(prev => ({
      ...prev,
      sharedWith: prev.sharedWith.includes(participantName)
        ? prev.sharedWith.filter(name => name !== participantName)
        : [...prev.sharedWith, participantName]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="What did you spend on?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paidBy">Paid by</Label>
              <Select value={formData.paidBy} onValueChange={(value) => setFormData(prev => ({ ...prev, paidBy: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="You">You</SelectItem>
                  {tripParticipants.map(participant => (
                    <SelectItem key={participant.id} value={participant.name}>
                      {participant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional details..."
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="split-toggle">Split with friends</Label>
              <Switch
                id="split-toggle"
                checked={formData.isShared}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isShared: checked }))}
              />
            </div>

            {formData.isShared && (
              <div className="space-y-2 p-3 bg-muted rounded-lg">
                <Label className="text-sm font-medium">Select friends to split with:</Label>
                <div className="space-y-2">
                  {tripParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`friend-${participant.id}`}
                        className="rounded"
                        checked={formData.sharedWith.includes(participant.name)}
                        onChange={() => handleSharedWithToggle(participant.name)}
                      />
                      <label htmlFor={`friend-${participant.id}`} className="flex items-center gap-2 flex-1 cursor-pointer">
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
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {expense ? 'Update' : 'Add'} Expense
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
