namespace Backend.Models;

public class PlaylistRecommendation
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SpotifyUri { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> Genres { get; set; } = new();
}