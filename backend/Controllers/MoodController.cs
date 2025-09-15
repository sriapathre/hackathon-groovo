using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoodController : ControllerBase
{
    private readonly MoodContext _context;

    public MoodController(MoodContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MoodEntry>>> GetMoodEntries()
    {
        return await _context.MoodEntries
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MoodEntry>> GetMoodEntry(int id)
    {
        var moodEntry = await _context.MoodEntries.FindAsync(id);

        if (moodEntry == null)
        {
            return NotFound();
        }

        return moodEntry;
    }

    [HttpPost]
    public async Task<ActionResult<MoodEntry>> CreateMoodEntry(MoodEntry moodEntry)
    {
        _context.MoodEntries.Add(moodEntry);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMoodEntry), new { id = moodEntry.Id }, moodEntry);
    }

    [HttpGet("today")]
    public async Task<ActionResult<MoodEntry?>> GetTodaysMood()
    {
        var today = DateTime.UtcNow.Date;
        var moodEntry = await _context.MoodEntries
            .Where(m => m.CreatedAt.Date == today)
            .OrderByDescending(m => m.CreatedAt)
            .FirstOrDefaultAsync();

        return moodEntry;
    }
}