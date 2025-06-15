
export interface SavedLocation {
  id: number;
  name: string;
  category: string;
  savedDate: string;
}

export const savedLocations: SavedLocation[] = [
  { id: 1, name: "Santorini, Greece", category: "Beach", savedDate: "2024-05-01" },
  { id: 2, name: "Machu Picchu, Peru", category: "Adventure", savedDate: "2024-04-15" },
  { id: 3, name: "Swiss Alps", category: "Nature", savedDate: "2024-03-20" }
];
