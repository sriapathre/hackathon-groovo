export interface MoodEntry {
  id: number;
  emoji: string;
  moodName: string;
  createdAt: string;
  notes?: string;
  energyLevel: number;
}

export interface PlaylistRecommendation {
  name: string;
  description: string;
  spotifyUri: string;
  imageUrl: string;
  genres: string[];
}

export interface MoodOption {
  emoji: string;
  name: string;
  value: string;
}