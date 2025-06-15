
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, PieChart, TrendingUp, ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { budgetCategories } from '@/utils/metadata';
import { mockBudgetData, mockRecentExpenses } from '@/utils/mockData';

const BudgetTracker: React.FC = () => {
  // Combine metadata with mock data
  const categories = mockBudgetData.map(budgetItem => {
    const categoryMeta = budgetCategories.find(cat => cat.id === budgetItem.categoryId);
    return {
      ...budgetItem,
      name: categoryMeta?.name || 'Unknown',
      color: categoryMeta?.color || 'bg-gray-500'
    };
  });

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const percentSpent = Math.round((totalSpent / totalBudget) * 100);
  
  return (
    <div id="budget" className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Budget Planner</h2>
        <Button className="gap-1">
          <Plus className="h-4 w-4" /> Add Expense
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <CardDescription>Bali Trip</CardDescription>
            </div>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget}</div>
            <p className="text-xs text-muted-foreground">for 7 days</p>
            <Progress
              value={percentSpent}
              className="h-2 mt-3"
            />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Used: {percentSpent}%</span>
              <span>Remaining: {100 - percentSpent}%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <CardDescription>Current spending</CardDescription>
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-4 w-4 text-rose-500" />
              <span className="text-xs text-rose-500">+$120 from yesterday</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <CardDescription>Available budget</CardDescription>
            </div>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget - totalSpent}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-4 w-4 text-emerald-500" />
              <span className="text-xs text-emerald-500">$145 daily average left</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories">
          <div className="space-y-6">
            {categories.map(category => (
              <div key={category.categoryId} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <div className="text-sm text-muted-foreground">
                      ${category.spent} of ${category.budget}
                    </div>
                  </div>
                  <span className={
                    category.spent / category.budget > 0.9 ? 'text-rose-500' :
                    category.spent / category.budget > 0.7 ? 'text-amber-500' :
                    'text-emerald-500'
                  }>
                    {Math.round((category.spent / category.budget) * 100)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`h-full ${category.color}`} 
                    style={{ width: `${(category.spent / category.budget) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="expenses">
          <div className="space-y-4">
            {mockRecentExpenses.map(expense => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{expense.name}</p>
                  <p className="text-sm text-muted-foreground">{expense.date}</p>
                </div>
                <span className="font-medium">${expense.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium mb-2">Reports are being generated</h3>
            <p className="text-sm text-muted-foreground">Check back after adding more expenses</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetTracker;
