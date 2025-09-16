// Maps face-api.js expressions to app moods
export function mapExpressionToMood(expression: string): string {
  switch (expression) {
    case "happy":
      return "happy";
    case "sad":
      return "sad";
    case "angry":
      return "frustrated";
    case "surprised":
      return "energetic";
    case "neutral":
      return "calm";
    case "fearful":
      return "anxious";
    case "disgusted":
      return "tired";
    default:
      return "calm"; // fallback
  }
}
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
export const MOOD_OPTIONS: MoodOption[] = [
  { emoji: "😊", name: "Happy", value: "happy" },
  { emoji: "😢", name: "Sad", value: "sad" },
  { emoji: "⚡", name: "Energetic", value: "energetic" },
  { emoji: "😌", name: "Calm", value: "calm" },
  { emoji: "😰", name: "Anxious", value: "anxious" },
  { emoji: "😴", name: "Tired", value: "tired" },
  { emoji: "😤", name: "Frustrated", value: "frustrated" },
  { emoji: "💝", name: "Loved", value: "loved" },
];
export const getMoodOptionByName = (name: string): MoodOption | null => {
  const found = MOOD_OPTIONS.find(
    (mood) => mood.name.toLowerCase() === name.toLowerCase()
  );
  return found ?? null;
};
