using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class MoodEntry
{
    public int Id { get; set; }
    
    [Required]
    public string Emoji { get; set; } = string.Empty;
    
    [Required]
    public string MoodName { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public string? Notes { get; set; }
    
    public int EnergyLevel { get; set; } // 1-5 scale
}