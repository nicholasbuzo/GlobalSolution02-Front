export type DisasterEvent = {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  coordinates: [number, number];
}; 