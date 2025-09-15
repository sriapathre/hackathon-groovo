import axios from 'axios';
import { MoodEntry, PlaylistRecommendation } from '../types';

const API_BASE_URL = 'https://localhost:7078/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const moodService = {
  getMoodEntries: (): Promise<MoodEntry[]> =>
    api.get<MoodEntry[]>('/mood').then(response => response.data),

  createMoodEntry: (moodEntry: Omit<MoodEntry, 'id' | 'createdAt'>): Promise<MoodEntry> =>
    api.post<MoodEntry>('/mood', moodEntry).then(response => response.data),

  getTodaysMood: (): Promise<MoodEntry | null> =>
    api.get<MoodEntry | null>('/mood/today').then(response => response.data),
};

export const playlistService = {
  getPlaylistsByMood: (moodName: string): Promise<PlaylistRecommendation[]> =>
    api.get<PlaylistRecommendation[]>(`/playlist/${moodName}`).then(response => response.data),

  getAvailableMoods: (): Promise<string[]> =>
    api.get<string[]>('/playlist/moods').then(response => response.data),
};