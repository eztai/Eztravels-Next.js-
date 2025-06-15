
// Main exports for all mock data
export * from './trips';
export * from './destinations';
export * from './itinerary';
export * from './calendar';
export * from './locations';
export * from './tripIdeas';
export * from './budgetData';
export * from './homePageData';

// Re-export for backward compatibility
export { mockTrips, trips } from './trips';
export { destinations } from './destinations';
export { mockItinerary } from './itinerary';
export { calendarEvents } from './calendar';
export { savedLocations } from './locations';
export { allTripIdeas } from './tripIdeas';
export { mockBudgetData, mockRecentExpenses } from './budgetData';
export { mockUpcomingTrips, mockUserStats } from './homePageData';
