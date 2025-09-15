import React from 'react';
import { MoodEntry } from '../types';

interface MoodHistoryProps {
  entries: MoodEntry[];
  loading: boolean;
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ entries, loading }) => {
  if (loading) {
    return <div className="mood-history loading">Loading mood history...</div>;
  }

  if (entries.length === 0) {
    return (
      <div className="mood-history">
        <h3>Your Mood Journey 📊</h3>
        <p>No mood entries yet. Start logging your daily moods!</p>
      </div>
    );
  }

  return (
    <div className="mood-history">
      <h3>Your Mood Journey 📊</h3>
      <div className="entries">
        {entries.slice(0, 7).map((entry) => (
          <div key={entry.id} className="mood-entry">
            <div className="entry-header">
              <span className="emoji">{entry.emoji}</span>
              <span className="mood-name">{entry.moodName}</span>
              <span className="date">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="entry-details">
              <div className="energy-level">
                Energy: {entry.energyLevel}/5
                <div className="energy-bar">
                  <div 
                    className="energy-fill"
                    style={{ width: `${(entry.energyLevel / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              {entry.notes && (
                <div className="notes">
                  <em>"{entry.notes}"</em>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodHistory;