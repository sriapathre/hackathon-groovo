using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using backend;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlaylistController : ControllerBase
{

    [HttpGet("{moodName}")]
    public ActionResult<IEnumerable<PlaylistRecommendation>> GetPlaylistsByMood(string moodName)
    {
        var normalizedMood = moodName.ToLowerInvariant();
        
        if (Constants.MoodPlaylist.ContainsKey(normalizedMood))
        {
            return Ok(Constants.MoodPlaylist[normalizedMood]);
        }

        // Default to calm playlists if mood not found
        return Ok(Constants.MoodPlaylist["calm"]);
    }

    [HttpGet("moods")]
    public ActionResult<IEnumerable<string>> GetAvailableMoods()
    {
        return Ok(Constants.MoodPlaylist.Keys);
    }
}