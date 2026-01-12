
export enum GameType {
  BGMI = 'BGMI',
  PUBG = 'PUBG'
}

export enum EventType {
  UPDATE = 'New Update',
  ROYAL_PASS = 'Royal Pass',
  SEASON = 'New Season',
  EVENT = 'Special Event'
}

export enum EventStatus {
  UPCOMING = 'Upcoming',
  LIVE = 'Live',
  ENDING_SOON = 'Ending Soon',
  COMPLETED = 'Completed'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface EsportsEvent {
  id: string;
  game: GameType;
  eventName: string;
  eventType: EventType;
  startDateTime: string; // ISO format
  version?: string;
  description?: string;
  prizePool?: string;
  highlights?: string[];
  imageUrl?: string;
  sources?: GroundingSource[];
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
