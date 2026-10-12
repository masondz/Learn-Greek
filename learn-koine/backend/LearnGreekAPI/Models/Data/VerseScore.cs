namespace LearnGreekAPI.Models.Data;

public class VerseScore
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string VerseReference { get; set; } = string.Empty;
    public int Score { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public User User { get; set; } = null!;
}
