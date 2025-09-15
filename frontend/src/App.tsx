import React, { useState, useEffect } from "react";
import "./App.css";
import MoodSelector from "./components/MoodSelector";
import PlaylistDisplay from "./components/PlaylistDisplay";
import MoodHistory from "./components/MoodHistory";
import { MoodEntry, MoodOption, PlaylistRecommendation } from "./types";
import { moodService, playlistService } from "./services/api";
import MoodFinder from "./components/MoodFinder";

function App() {
  const [currentMood, setCurrentMood] = useState<string>("");
  const [playlists, setPlaylists] = useState<PlaylistRecommendation[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [todaysMood, setTodaysMood] = useState<MoodEntry | null>(null);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<"mood" | "history" | "picture">(
    "mood"
  );

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([loadMoodHistory(), loadTodaysMood()]);
    };
    loadInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMoodHistory = async () => {
    try {
      setLoadingHistory(true);
      const entries = await moodService.getMoodEntries();
      setMoodHistory(entries);
    } catch (error) {
      console.error("Failed to load mood history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadTodaysMood = async () => {
    try {
      const todayMood = await moodService.getTodaysMood();
      setTodaysMood(todayMood);
      if (todayMood) {
        setCurrentMood(todayMood.moodName);
        loadPlaylistsForMood(todayMood.moodName);
      }
    } catch (error) {
      console.error("Failed to load today's mood:", error);
    }
  };

  const loadPlaylistsForMood = async (moodName: string) => {
    try {
      setLoadingPlaylists(true);
      const recommendedPlaylists = await playlistService.getPlaylistsByMood(
        moodName
      );
      setPlaylists(recommendedPlaylists);
    } catch (error) {
      console.error("Failed to load playlists:", error);
    } finally {
      setLoadingPlaylists(false);
    }
  };

  const handleMoodSelect = async (
    mood: MoodOption,
    energyLevel: number,
    notes: string
  ) => {
    try {
      const newMoodEntry = {
        emoji: mood.emoji,
        moodName: mood.name,
        energyLevel,
        notes: notes || undefined,
      };
      await moodService.createMoodEntry(newMoodEntry);

      setCurrentMood(mood.name);
      loadPlaylistsForMood(mood.value);
      loadMoodHistory();
      loadTodaysMood();
    } catch (error) {
      console.error("Failed to save mood:", error);
      alert("Failed to save your mood. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img
            src="/header.png"
            alt="Groovo Logo"
            style={{
              height: "2em",
              verticalAlign: "middle",
              marginRight: "0.5em",
            }}
          />
          Your Mood Music Companion
        </h1>
        <p>
          Track your daily mood and discover playlists that match your vibe!
        </p>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "picture" ? "active" : ""}`}
          onClick={() => setActiveTab("picture")}
        >
          Picture 📷
        </button>
        <button
          className={`tab-button ${activeTab === "mood" ? "active" : ""}`}
          onClick={() => setActiveTab("mood")}
        >
          Today's Mood 🎯
        </button>
        <button
          className={`tab-button ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Mood History 📈
        </button>
      </nav>

      <main className="App-main">
        {activeTab === "mood" && (
          <>
            {todaysMood ? (
              <div className="today-mood-logged">
                <h2>
                  Today's Mood: {todaysMood.emoji} {todaysMood.moodName}
                </h2>
                <p>Energy Level: {todaysMood.energyLevel}/5</p>
                {todaysMood.notes && (
                  <p>
                    <em>"{todaysMood.notes}"</em>
                  </p>
                )}
                <button
                  className="update-mood-btn"
                  onClick={() => setTodaysMood(null)}
                >
                  Update Today's Mood
                </button>
              </div>
            ) : (
              <MoodSelector onMoodSelect={handleMoodSelect} />
            )}

            {currentMood && (
              <PlaylistDisplay
                playlists={playlists}
                mood={currentMood}
                loading={loadingPlaylists}
              />
            )}
          </>
        )}
        {activeTab === "picture" && <MoodFinder />}

        {activeTab === "history" && (
          <MoodHistory entries={moodHistory} loading={loadingHistory} />
        )}
      </main>
    </div>
  );
}

export default App;
