using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class MoodContext : DbContext
{
    public MoodContext(DbContextOptions<MoodContext> options) : base(options)
    {
    }

    public DbSet<MoodEntry> MoodEntries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<MoodEntry>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Emoji).IsRequired();
            entity.Property(e => e.MoodName).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();
        });
    }
}