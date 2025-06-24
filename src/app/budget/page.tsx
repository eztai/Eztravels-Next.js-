'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DollarSign, 
  Plus, 
  Users, 
  Receipt, 
  PieChart, 
  TrendingUp, 
  Calendar,
  MapPin,
  UserPlus,
  Send,
  Download,
  CheckCircle,
  ChevronDown,
  Share2,
  Clock,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Pie } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { trips } from '@/utils/mockData';
import { ExpenseItem } from '@/components/ExpenseItem';
import { AddExpenseDialog } from '@/components/AddExpenseDialog';
import { SplitExpenseDialog } from '@/components/SplitExpenseDialog';
import { TripSelector } from '@/components/TripSelector';

// Mock data for the current trip
const currentTrip = {
  id: 1,
  name: "Tokyo Adventure",
  destination: "Tokyo, Japan",
  startDate: "2024-06-15",
  endDate: "2024-06-22",
  totalBudget: 4500,
  currency: "USD",
  participants: [
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '', totalPaid: 1200, balance: -300 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '', totalPaid: 800, balance: 100 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: '', totalPaid: 600, balance: 200 }
  ]
};

const categories = [
  { name: 'Lodging', budgeted: 1800, spent: 1200, color: '#3b82f6' },
  { name: 'Food & Dining', budgeted: 1000, spent: 650, color: '#10b981' },
  { name: 'Transportation', budgeted: 800, spent: 400, color: '#f59e0b' },
  { name: 'Activities', budgeted: 600, spent: 250, color: '#8b5cf6' },
  { name: 'Shopping', budgeted: 300, spent: 100, color: '#ef4444' }
];

const expenses = [
  { 
    id: 1, 
    description: 'Hotel Shibuya', 
    amount: 1200, 
    category: 'Lodging', 
    paidBy: 'John Doe', 
    sharedWith: ['Jane Smith', 'Mike Johnson'], 
    date: '2024-06-15',
    currency: 'USD',
    isShared: true
  },
  { 
    id: 2, 
    description: 'Sushi Dinner', 
    amount: 180, 
    category: 'Food & Dining', 
    paidBy: 'Jane Smith', 
    sharedWith: ['John Doe', 'Mike Johnson'], 
    date: '2024-06-16',
    currency: 'USD',
    isShared: true
  },
  { 
    id: 3, 
    description: 'Train Tickets', 
    amount: 120, 
    category: 'Transportation', 
    paidBy: 'Mike Johnson', 
    sharedWith: ['John Doe', 'Jane Smith'], 
    date: '2024-06-16',
    currency: 'USD',
    isShared: true
  },
  { 
    id: 4, 
    description: 'Tokyo Tower Tickets', 
    amount: 90, 
    category: 'Activities', 
    paidBy: 'John Doe', 
    sharedWith: ['Jane Smith'], 
    date: '2024-06-17',
    currency: 'USD',
    isShared: true
  },
  { 
    id: 5, 
    description: 'Personal Souvenir', 
    amount: 45, 
    category: 'Shopping', 
    paidBy: 'You', 
    sharedWith: [], 
    date: '2024-06-17',
    currency: 'USD',
    isShared: false
  }
];

const spendingTimeline = [
  { date: '06/15', amount: 1200 },
  { date: '06/16', amount: 300 },
  { date: '06/17', amount: 135 },
  { date: '06/18', amount: 0 },
  { date: '06/19', amount: 0 },
  { date: '06/20', amount: 0 },
  { date: '06/21', amount: 0 },
  { date: '06/22', amount: 0 }
];

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedTripId, setSelectedTripId] = useState<string>('1');
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  // Get the selected trip data or aggregate data
  const selectedTrip = selectedTripId === 'all' ? null : trips.find(trip => trip.id.toString() === selectedTripId) || trips[0];
  
  // Calculate aggregated data for "All Trips" - fix the budget property issue
  const aggregatedData = {
    totalTrips: trips.length,
    totalBudget: trips.reduce((sum, trip) => sum + 4500, 0), // Using default budget since trips don't have budget property
    totalParticipants: trips.reduce((sum, trip) => sum + trip.participants, 0),
    destinations: Array.from(new Set(trips.map(trip => trip.destination))).join(', ')
  };

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const currentBudget = selectedTripId === 'all' ? aggregatedData.totalBudget : currentTrip.totalBudget;
  const remainingBudget = currentBudget - totalSpent;
  const spentPercentage = (totalSpent / currentBudget) * 100;

  const pieChartData = categories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color
  }));

  const chartConfig = {
    lodging: { label: "Lodging", color: "#3b82f6" },
    food: { label: "Food & Dining", color: "#10b981" },
    transport: { label: "Transportation", color: "#f59e0b" },
    activities: { label: "Activities", color: "#8b5cf6" },
    shopping: { label: "Shopping", color: "#ef4444" }
  };

  const handleSplitExpense = (expense: any) => {
    setSelectedExpense(expense);
    setSplitDialogOpen(true);
  };

  const handleEditExpense = (expense: any) => {
    setSelectedExpense(expense);
    setAddExpenseDialogOpen(true);
  };

  const handleDeleteExpense = (expenseId: number) => {
    console.log('Deleting expense:', expenseId);
    // Handle delete logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budget Tracker</h1>
          <p className="text-muted-foreground">Manage expenses and split costs with your travel companions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setAddExpenseDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Trip Selector */}
      <TripSelector
        selectedTripId={selectedTripId}
        onTripChange={setSelectedTripId}
      />

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">${currentBudget.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
              </div>
              <Receipt className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <p className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-destructive' : 'text-green-600'}`}>
                  ${remainingBudget.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Spent</p>
                <p className="text-2xl font-bold">{spentPercentage.toFixed(1)}%</p>
              </div>
              <PieChart className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={spentPercentage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="splits">Splits</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spending by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span>${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(category.spent / category.budgeted) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Spending Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onSplit={() => handleSplitExpense(expense)}
                    onEdit={() => handleEditExpense(expense)}
                    onDelete={() => handleDeleteExpense(expense.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="splits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Split Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentTrip.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">{participant.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${participant.totalPaid.toLocaleString()}</p>
                      <p className={`text-sm ${participant.balance < 0 ? 'text-destructive' : 'text-green-600'}`}>
                        {participant.balance < 0 ? 'Owes' : 'Owed'} ${Math.abs(participant.balance).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spending Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddExpenseDialog
        open={addExpenseDialogOpen}
        onOpenChange={setAddExpenseDialogOpen}
        expense={selectedExpense}
        tripParticipants={currentTrip.participants}
      />

      <SplitExpenseDialog
        open={splitDialogOpen}
        onOpenChange={setSplitDialogOpen}
        expense={selectedExpense}
        tripParticipants={currentTrip.participants}
      />
    </div>
  );
} 