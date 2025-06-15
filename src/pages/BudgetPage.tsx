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
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const BudgetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedTripId, setSelectedTripId] = useState<number | 'all'>(1);
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  // Get the selected trip data or aggregate data
  const selectedTrip = selectedTripId === 'all' ? null : trips.find(trip => trip.id === selectedTripId) || trips[0];
  
  // Calculate aggregated data for "All Trips" - fix the budget property issue
  const aggregatedData = {
    totalTrips: trips.length,
    totalBudget: trips.reduce((sum, trip) => sum + 4500, 0), // Using default budget since trips don't have budget property
    totalParticipants: trips.reduce((sum, trip) => sum + trip.participants, 0),
    destinations: [...new Set(trips.map(trip => trip.destination))].join(', ')
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
      {/* Trip Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Select Trip</label>
            <Select value={selectedTripId.toString()} onValueChange={(value) => setSelectedTripId(value === 'all' ? 'all' : parseInt(value))}>
              <SelectTrigger className="w-[280px] mt-1">
                <SelectValue placeholder="Choose a trip" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium">All Trips</div>
                      <div className="text-xs text-muted-foreground">{aggregatedData.totalTrips} trips total</div>
                    </div>
                  </div>
                </SelectItem>
                {trips.map((trip) => (
                  <SelectItem key={trip.id} value={trip.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium">{trip.title}</div>
                        <div className="text-xs text-muted-foreground">{trip.destination}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setAddExpenseDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Trip Header - Sticky Overview */}
      <div className="sticky top-0 z-10 bg-background border rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            {selectedTripId === 'all' ? (
              <>
                <h1 className="text-2xl font-bold">All Trips Budget</h1>
                <div className="flex items-center gap-4 text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{aggregatedData.destinations}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{aggregatedData.totalTrips} trips</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">{selectedTrip?.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedTrip?.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedTrip?.startDate} - {selectedTrip?.endDate}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-lg font-semibold">${currentBudget}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className="text-lg font-semibold text-red-600">${totalSpent}</p>
            </div>
            <div className="w-24">
              <Progress value={spentPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{spentPercentage.toFixed(0)}% used</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Trip Summary</TabsTrigger>
          <TabsTrigger value="split">Split w/ Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Recent Expenses - Top Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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

          {/* Visual Summaries - Below Recent Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{category.name}</span>
                        <span>${category.spent} / ${category.budgeted}</span>
                      </div>
                      <Progress 
                        value={(category.spent / category.budgeted) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{((category.spent / category.budgeted) * 100).toFixed(0)}% used</span>
                        <span>${category.budgeted - category.spent} left</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Spending Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Spending Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <RechartsPieChart data={pieChartData} cx="50%" cy="50%" outerRadius={80}>
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieChartData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span>{entry.name}: ${entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expense Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="split" className="space-y-6">
          {/* Add Friends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Trip Members
                </span>
                <Button size="sm" className="gap-1">
                  <UserPlus className="h-4 w-4" />
                  Add Friend
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentTrip.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">Paid: ${participant.totalPaid}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {participant.balance > 0 ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Owed ${Math.abs(participant.balance)}
                        </Badge>
                      ) : participant.balance < 0 ? (
                        <Badge variant="destructive">
                          Owes ${Math.abs(participant.balance)}
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Settled
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Smart Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>Smart Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">John paid $1200 for hotel</p>
                    <p className="text-sm text-blue-700">Split with 2 others?</p>
                  </div>
                  <Button size="sm" variant="outline">Split</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div>
                    <p className="font-medium text-amber-900">John has paid 60% more than others</p>
                    <p className="text-sm text-amber-700">Suggest evening out expenses?</p>
                  </div>
                  <Button size="sm" variant="outline">Even Out</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expense Breakdown Table */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onSplit={() => handleSplitExpense(expense)}
                    onEdit={() => handleEditExpense(expense)}
                    onDelete={() => handleDeleteExpense(expense.id)}
                    showSharedWith={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settle Up */}
          <Card>
            <CardHeader>
              <CardTitle>Settle Up</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Mike Johnson owes John Doe</p>
                    <p className="text-sm text-muted-foreground">$200 for shared expenses</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Venmo</Button>
                    <Button size="sm" variant="outline">PayPal</Button>
                    <Button size="sm">Mark Settled</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Expense Dialog */}
      <AddExpenseDialog 
        open={addExpenseDialogOpen} 
        onOpenChange={setAddExpenseDialogOpen}
        expense={selectedExpense}
        tripParticipants={currentTrip.participants}
      />

      {/* Split Expense Dialog */}
      <SplitExpenseDialog
        open={splitDialogOpen}
        onOpenChange={setSplitDialogOpen}
        expense={selectedExpense}
        tripParticipants={currentTrip.participants}
      />
    </div>
  );
};

export default BudgetPage;
