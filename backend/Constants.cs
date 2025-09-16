using Backend.Models;

namespace backend
{
    public static class Constants
    {
        public static readonly Dictionary<string, List<PlaylistRecommendation>> MoodPlaylist = new Dictionary<string, List<PlaylistRecommendation>>
        {
            ["happy"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Feel Good Hits",
                    Description = "Uplifting songs to keep your good mood going",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000002317e94d08ce919adc04217a8",
                    Genres = new List<string> { "pop", "dance", "funk" }
                },
                new PlaylistRecommendation
                {
                    Name = "Happy Pop",
                    Description = "Cheerful pop songs to brighten your day",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX0UrRvztWcAU",
                    ImageUrl = "https://i.scdn.co/image/ab67706f000000026b30471dcc036d254dcc8041",
                    Genres = new List<string> { "pop", "upbeat" }
                }
            },
            ["sad"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Melancholy Blues",
                    Description = "Gentle songs for when you need to feel understood",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000002be87292277fdf3b8669fecb7",
                    Genres = new List<string> { "blues", "indie", "folk" }
                },
                 new PlaylistRecommendation
                {
                    Name = "Mood Booster",
                    Description = "Get happy with today's dose of feel-good songs!",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
                    ImageUrl = "https://i.scdn.co/image/ab67706f000000028191cc41d8585df6170b3e5e",
                    Genres = new List<string> { "pop", "upbeat" }
                }
            },
            ["energetic"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "High Energy Workout",
                    Description = "Pump up songs to match your energy",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000002f367481f06b565250cc7b139",
                    Genres = new List<string> { "electronic", "hip-hop", "rock" }
                },
                new PlaylistRecommendation
                {
                    Name = "Power Hour",
                    Description = "High-octane tracks for maximum energy",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX32NsLKyzScr",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000002ecbc3f66c5912d783dee45b7",
                    Genres = new List<string> { "rock", "metal", "electronic" }
                }
            },
            ["calm"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Peaceful Piano",
                    Description = "Relaxing piano music for tranquil moments",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
                    ImageUrl = "https://i.scdn.co/image/ab67706f0000000283da657fca565320e9311863",
                    Genres = new List<string> { "classical", "piano", "ambient" }
                },
                new PlaylistRecommendation
                {
                    Name = "Chill Vibes",
                    Description = "Laid-back tunes for relaxation",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000002b1275110babf9cdaaea44cef",
                    Genres = new List<string> { "chill", "lo-fi", "jazz" }
                }
            },
            ["anxious"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Calming Sounds",
                    Description = "Soothing music to ease anxiety",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP",
                    ImageUrl = "https://i.scdn.co/image/ab67706f000000025db1394baf8862336f19ac83",
                    Genres = new List<string> { "ambient", "meditation", "nature" }
                },
                new PlaylistRecommendation
                {
                    Name = "Breathe Easy",
                    Description = "Gentle rhythms to help you relax",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u",
                    ImageUrl = "https://i.scdn.co/image/ab67706f0000000208dc478ff3e930553f46b9eb",
                    Genres = new List<string> { "ambient", "soft rock" }
                }
            },
            ["loved"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Romantic Evening",
                    Description = "Songs to set the mood for a romantic night",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000002794e94c9a696c85a6f53d9bf",
                    Genres = new List<string> { "pop", "R&B", "jazz" }
                },
                new PlaylistRecommendation
                {
                    Name = "Love Songs",
                    Description = "Timeless love songs to express your feelings",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY",
                    ImageUrl = "https://i.scdn.co/image/ab67706f0000000219ab577207bd9e19375deb6b",
                    Genres = new List<string> { "classic rock", "pop", "soul" }
                }
            },
            ["tired"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Soft Rock Classics",
                    Description = "Mellow rock tunes to help you unwind",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX1tyCD9QhIWF",
                    ImageUrl = "https://i.scdn.co/image/ab67706f0000000282c6fab8f031d857ccf212a2",
                    Genres = new List<string> { "soft rock", "acoustic", "folk" }
                },
                new PlaylistRecommendation
                {
                    Name = "Acoustic Chill",
                    Description = "Relaxing acoustic tracks for winding down",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX2MyUCsl25eb",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000002b0dc1e9a518d5fae0a7ff4b0",
                    Genres = new List<string> { "acoustic", "indie", "folk" }
                }
            },
            ["frustrated"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Rock Anthems",
                    Description = "Powerful rock songs to channel your frustration",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DXcF6B6QPhFDv",
                    ImageUrl = "https://i.scdn.co/image/ab67706f0000000213257666d1646617a8abd54d",
                    Genres = new List<string> { "rock", "alternative", "punk" }
                },
                new PlaylistRecommendation
                {
                    Name = "Hip-Hop Hits",
                    Description = "Energetic hip-hop tracks to boost your mood",
                    SpotifyUri = "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000002317e94d08ce919adc04217a8",
                    Genres = new List<string> { "hip-hop", "rap", "R&B" }
                }
            }
        };

    }
}
