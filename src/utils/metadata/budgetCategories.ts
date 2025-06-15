
export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const budgetCategories: BudgetCategory[] = [
  {
    id: 'accommodation',
    name: 'Accommodation',
    icon: 'Home',
    color: 'bg-primary',
    description: 'Hotels, hostels, and lodging'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: 'Plane',
    color: 'bg-secondary',
    description: 'Flights, trains, and local transport'
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    icon: 'UtensilsCrossed',
    color: 'bg-accent',
    description: 'Meals, snacks, and beverages'
  },
  {
    id: 'activities',
    name: 'Activities',
    icon: 'Activity',
    color: 'bg-green-500',
    description: 'Tours, attractions, and experiences'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'ShoppingBag',
    color: 'bg-amber-500',
    description: 'Souvenirs and personal purchases'
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    icon: 'MoreHorizontal',
    color: 'bg-rose-500',
    description: 'Other expenses'
  }
];
