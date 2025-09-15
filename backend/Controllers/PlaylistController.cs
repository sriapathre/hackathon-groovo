using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlaylistController : ControllerBase
{
    private readonly Dictionary<string, List<PlaylistRecommendation>> _moodPlaylists;

    public PlaylistController()
    {
        // Initialize mood-based playlist recommendations
        _moodPlaylists = new Dictionary<string, List<PlaylistRecommendation>>
        {
            ["happy"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation 
                { 
                    Name = "Feel Good Hits",
                    Description = "Uplifting songs to keep your good mood going",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DX0XUsuxWHRQd",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6",
                    Genres = new List<string> { "pop", "dance", "funk" }
                },
                new PlaylistRecommendation
                {
                    Name = "Happy Pop",
                    Description = "Cheerful pop songs to brighten your day",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DX0UrRvztWcAU",
                    ImageUrl = "https://i.scdn.co/image/ab67706f000000032a038d3bf875d23e4279c313",
                    Genres = new List<string> { "pop", "upbeat" }
                }
            },
            ["sad"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Melancholy Blues",
                    Description = "Gentle songs for when you need to feel understood",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DX3YSRoSdA634",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000003f54ca5c3c9db96c6917b7a53",
                    Genres = new List<string> { "blues", "indie", "folk" }
                },
                new PlaylistRecommendation
                {
                    Name = "Rainy Day",
                    Description = "Contemplative music for introspective moments",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DWVrtsSlLKzro",
                    ImageUrl = "https://i.scdn.co/image/ab67706f0000000392e3ef855b8a6c4c1a8e9aef",
                    Genres = new List<string> { "acoustic", "indie" }
                }
            },
            ["energetic"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "High Energy Workout",
                    Description = "Pump up songs to match your energy",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DX76Wlfdnj7AP",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000003e4eadd417a05b2546d866934",
                    Genres = new List<string> { "electronic", "hip-hop", "rock" }
                },
                new PlaylistRecommendation
                {
                    Name = "Power Hour",
                    Description = "High-octane tracks for maximum energy",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DX32NsLKyzScr",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000003c8b444df094279e70d0ed856",
                    Genres = new List<string> { "rock", "metal", "electronic" }
                }
            },
            ["calm"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Peaceful Piano",
                    Description = "Relaxing piano music for tranquil moments",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DX4sWSpwq3LiO",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6",
                    Genres = new List<string> { "classical", "piano", "ambient" }
                },
                new PlaylistRecommendation
                {
                    Name = "Chill Vibes",
                    Description = "Laid-back tunes for relaxation",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DX0SM0LYsmbMT",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000003a4bbe4e7d1528d37e065c1e0",
                    Genres = new List<string> { "chill", "lo-fi", "jazz" }
                }
            },
            ["anxious"] = new List<PlaylistRecommendation>
            {
                new PlaylistRecommendation
                {
                    Name = "Calming Sounds",
                    Description = "Soothing music to ease anxiety",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DWXe9gFZP0gtP",
                    ImageUrl = "https://i.scdn.co/image/ab67706f000000037c4a044f38e7a08346dd4c05",
                    Genres = new List<string> { "ambient", "meditation", "nature" }
                },
                new PlaylistRecommendation
                {
                    Name = "Breathe Easy",
                    Description = "Gentle rhythms to help you relax",
                    SpotifyUri = "spotify:playlist:37i9dQZF1DWZqd5JICZI0u",
                    ImageUrl = "https://i.scdn.co/image/ab67706f00000003f7b1b1b2d1f4b3f8b2d1f4b3",
                    Genres = new List<string> { "ambient", "soft rock" }
                }
            }
        };
    }

    [HttpGet("{moodName}")]
    public ActionResult<IEnumerable<PlaylistRecommendation>> GetPlaylistsByMood(string moodName)
    {
        var normalizedMood = moodName.ToLowerInvariant();
        
        if (_moodPlaylists.ContainsKey(normalizedMood))
        {
            return Ok(_moodPlaylists[normalizedMood]);
        }

        // Default to calm playlists if mood not found
        return Ok(_moodPlaylists["calm"]);
    }

    [HttpGet("moods")]
    public ActionResult<IEnumerable<string>> GetAvailableMoods()
    {
        return Ok(_moodPlaylists.Keys);
    }
}