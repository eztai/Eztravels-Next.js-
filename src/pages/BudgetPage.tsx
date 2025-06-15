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
  ChevronDown
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
import { trips } from '@/utils/mockData';

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
    currency: 'USD'
  },
  { 
    id: 2, 
    description: 'Sushi Dinner', 
    amount: 180, 
    category: 'Food & Dining', 
    paidBy: 'Jane Smith', 
    sharedWith: ['John Doe', 'Mike Johnson'], 
    date: '2024-06-16',
    currency: 'USD'
  },
  { 
    id: 3, 
    description: 'Train Tickets', 
    amount: 120, 
    category: 'Transportation', 
    paidBy: 'Mike Johnson', 
    sharedWith: ['John Doe', 'Jane Smith'], 
    date: '2024-06-16',
    currency: 'USD'
  },
  { 
    id: 4, 
    description: 'Tokyo Tower Tickets', 
    amount: 90, 
    category: 'Activities', 
    paidBy: 'John Doe', 
    sharedWith: ['Jane Smith'], 
    date: '2024-06-17',
    currency: 'USD'
  }
];

const spendingTimeline = [
  { date: '06/15', amount: 1200 },
  { date: '06/16', amount: 300 },
  { date: '06/17', amount: 90 },
  { date: '06/18', amount: 0 },
  { date: '06/19', amount: 0 },
  { date: '06/20', amount: 0 },
  { date: '06/21', amount: 0 },
  { date: '06/22', amount: 0 }
];

const BudgetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedTripId, setSelectedTripId] = useState<number>(1);

  // Get the selected trip data
  const selectedTrip = trips.find(trip => trip.id === selectedTripId) || trips[0];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = currentTrip.totalBudget - totalSpent;
  const spentPercentage = (totalSpent / currentTrip.totalBudget) * 100;

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

  return (
    <div className="p-6 space-y-6">
      {/* Trip Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Select Trip</label>
            <Select value={selectedTripId.toString()} onValueChange={(value) => setSelectedTripId(parseInt(value))}>
              <SelectTrigger className="w-[280px] mt-1">
                <SelectValue placeholder="Choose a trip" />
              </SelectTrigger>
              <SelectContent>
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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Trip Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{selectedTrip.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{selectedTrip.destination}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{selectedTrip.startDate} - {selectedTrip.endDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{selectedTrip.participants} people</span>
            </div>
            <Badge variant={
              selectedTrip.status === 'upcoming' ? 'default' : 
              selectedTrip.status === 'planned' ? 'outline' : 'secondary'
            }>
              {selectedTrip.status === 'upcoming' ? 'Upcoming' : 
               selectedTrip.status === 'planned' ? 'Planned' : 'Draft'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentTrip.totalBudget}</div>
            <p className="text-xs text-muted-foreground">8-day trip budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent}</div>
            <Progress value={spentPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {spentPercentage.toFixed(1)}% of budget used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${remainingBudget}</div>
            <p className="text-xs text-muted-foreground">
              ${(remainingBudget / 5).toFixed(0)} per day remaining
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Trip Summary</TabsTrigger>
          <TabsTrigger value="split">Split w/ Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
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

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenses.slice(0, 5).map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-full">
                        <Receipt className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {expense.date} • Paid by {expense.paidBy}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${expense.amount}</p>
                      <Badge variant="outline">{expense.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Paid by</TableHead>
                    <TableHead>Shared with</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>{expense.paidBy}</TableCell>
                      <TableCell>
                        <div className="flex -space-x-1">
                          {expense.sharedWith.slice(0, 2).map((person, index) => (
                            <Avatar key={index} className="w-6 h-6 border-2 border-background">
                              <AvatarFallback className="text-xs">
                                {person.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {expense.sharedWith.length > 2 && (
                            <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                              +{expense.sharedWith.length - 2}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>${expense.amount}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <Send className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
    </div>
  );
};

export default BudgetPage;
