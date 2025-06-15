
import { budgetCategories } from '../metadata/budgetCategories';

export interface BudgetCategoryData {
  categoryId: string;
  spent: number;
  budget: number;
}

export const mockBudgetData: BudgetCategoryData[] = [
  { categoryId: 'accommodation', spent: 650, budget: 800 },
  { categoryId: 'transportation', spent: 420, budget: 500 },
  { categoryId: 'food', spent: 320, budget: 450 },
  { categoryId: 'activities', spent: 175, budget: 300 },
  { categoryId: 'shopping', spent: 60, budget: 200 },
  { categoryId: 'miscellaneous', spent: 0, budget: 250 }
];

export const mockRecentExpenses = [
  {
    id: 1,
    name: 'Beachfront Resort',
    date: 'May 10, 2025',
    amount: 120.00,
    categoryId: 'accommodation'
  },
  {
    id: 2,
    name: 'Airport Taxi',
    date: 'May 10, 2025',
    amount: 45.00,
    categoryId: 'transportation'
  },
  {
    id: 3,
    name: 'Seafood Dinner',
    date: 'May 10, 2025',
    amount: 78.50,
    categoryId: 'food'
  }
];
