
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DollarSign, Plus, Users, Receipt, PieChart, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock budget data
const mockBudgetData = {
  totalBudget: 3500,
  totalSpent: 1200,
  categories: [
    { name: 'Accommodation', budgeted: 1200, spent: 800, color: 'bg-blue-500' },
    { name: 'Food & Dining', budgeted: 800, spent: 300, color: 'bg-green-500' },
    { name: 'Transportation', budgeted: 600, spent: 100, color: 'bg-yellow-500' },
    { name: 'Activities', budgeted: 500, spent: 0, color: 'bg-purple-500' },
    { name: 'Shopping', budgeted: 400, spent: 0, color: 'bg-pink-500' }
  ],
  expenses: [
    { id: 1, date: '2024-06-15', description: 'Hotel Shibuya', amount: 800, category: 'Accommodation', paidBy: 'John Doe', splitWith: ['Jane Doe'] },
    { id: 2, date: '2024-06-16', description: 'Dinner at Sukiyabashi Jiro', amount: 200, category: 'Food & Dining', paidBy: 'Jane Doe', splitWith: ['John Doe'] },
    { id: 3, date: '2024-06-16', description: 'Train tickets', amount: 100, category: 'Transportation', paidBy: 'John Doe', splitWith: ['Jane Doe'] },
    { id: 4, date: '2024-06-16', description: 'Coffee & breakfast', amount: 100, category: 'Food & Dining', paidBy: 'Jane Doe', splitWith: [] }
  ],
  travelers: [
    { id: 1, name: 'John Doe', avatar: '', totalPaid: 900, owes: 0 },
    { id: 2, name: 'Jane Doe', avatar: '', totalPaid: 300, owes: 300 }
  ]
};

const BudgetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const remainingBudget = mockBudgetData.totalBudget - mockBudgetData.totalSpent;
  const spentPercentage = (mockBudgetData.totalSpent / mockBudgetData.totalBudget) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Budget Tracker</h1>
          <p className="text-muted-foreground">Manage expenses and split costs</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockBudgetData.totalBudget}</div>
            <p className="text-xs text-muted-foreground">For the entire trip</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockBudgetData.totalSpent}</div>
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
              ${(remainingBudget / 6).toFixed(0)} per day remaining
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="split">Split Bills</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBudgetData.categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category.name}</span>
                      <span>${category.spent} / ${category.budgeted}</span>
                    </div>
                    <Progress 
                      value={(category.spent / category.budgeted) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockBudgetData.expenses.slice(0, 5).map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-xs text-muted-foreground">{expense.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${expense.amount}</p>
                      <p className="text-xs text-muted-foreground">{expense.category}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockBudgetData.expenses.map((expense) => (
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

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBudgetData.categories.map((category) => (
              <Card key={category.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category.name}
                    <Badge variant="outline">
                      ${category.spent} / ${category.budgeted}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={(category.spent / category.budgeted) * 100} 
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    ${category.budgeted - category.spent} remaining
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="split" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Expense Splitting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBudgetData.travelers.map((traveler) => (
                  <div key={traveler.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={traveler.avatar} />
                        <AvatarFallback>{traveler.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{traveler.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Paid: ${traveler.totalPaid}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {traveler.owes > 0 ? (
                        <Badge variant="destructive">Owes ${traveler.owes}</Badge>
                      ) : (
                        <Badge variant="default">Settled</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetPage;
