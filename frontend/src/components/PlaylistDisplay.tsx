import React from "react";
import { PlaylistRecommendation } from "../types";

interface PlaylistDisplayProps {
  playlists: PlaylistRecommendation[];
  mood: string;
  loading: boolean;
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({
  playlists,
  mood,
  loading,
}) => {
  const openSpotify = (uri: string) => {
    window.open(uri, "_blank");
  };

  if (loading) {
    return (
      <div className="playlist-display">
        <h3>Finding perfect playlists for your {mood} mood... 🎵</h3>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="playlist-display">
        <h3>No playlists found for your mood</h3>
      </div>
    );
  }

  console.log(playlists);
  return (
    <div className="playlist-display">
      <h3>🎵 Playlists for your {mood} mood</h3>
      <div className="playlists-grid">
        {playlists.map((playlist, index) => (
          <div key={index} className="playlist-card">
            <img
              src={playlist.imageUrl}
              alt={playlist.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/200x200?text=🎵";
              }}
            />
            <div className="playlist-info">
              <h4>{playlist.name}</h4>
              <p>{playlist.description}</p>
              <div className="genres">
                {playlist.genres.map((genre, idx) => (
                  <span key={idx} className="genre-tag">
                    {genre}
                  </span>
                ))}
              </div>
              <button
                className="open-spotify-btn"
                onClick={() => openSpotify(playlist.spotifyUri)}
              >
                Open in Spotify 🎧
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDisplay;
