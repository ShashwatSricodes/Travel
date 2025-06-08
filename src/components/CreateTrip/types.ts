export interface Place {
  day: number;
  location: { lat: number; lng: number };
  name: string;
}

export interface Accommodation {
  id: string;
  name: string;
  startDay: number;
  endDay: number;
  link: string;
  images: string[];
}

export interface Activity {
  id: string;
  day: number;
  type: 'activity' | 'dining' | 'transportation';
  time: string;
  title: string;
  description: string;
  cost: number;
  link?: string;
  images: string[];
}

export interface SearchSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export interface TipWarning {
  id: string;
  category: 'customs' | 'scams' | 'language' | 'safety' | 'money' | 'general';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}