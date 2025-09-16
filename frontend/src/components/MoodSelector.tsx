import React, { useState } from "react";
import { MoodOption, MOOD_OPTIONS } from "../types";

interface MoodSelectorProps {
  onMoodSelect: (mood: MoodOption, energyLevel: number, notes: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      onMoodSelect(selectedMood, energyLevel, notes);
    }
  };

  return (
    <div className="mood-selector">
      <h2>How are you feeling today? 🌟</h2>

      <form onSubmit={handleSubmit}>
        <div className="mood-grid">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood.value}
              type="button"
              className={`mood-option ${
                selectedMood?.value === mood.value ? "selected" : ""
              }`}
              onClick={() => setSelectedMood(mood)}
            >
              <span className="emoji">{mood.emoji}</span>
              <span className="name">{mood.name}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="mood-details">
            <div className="energy-level">
              <label htmlFor="energy">Energy Level (1-5):</label>
              <input
                type="range"
                id="energy"
                min="1"
                max="5"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
              />
              <span className="energy-value">{energyLevel}</span>
            </div>

            <div className="notes">
              <label htmlFor="notes">Notes (optional):</label>
              <textarea
                id="notes"
                placeholder="Any additional thoughts about how you're feeling..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
            <button type="submit" className="submit-btn">
              Set My Mood 📝
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MoodSelector;
