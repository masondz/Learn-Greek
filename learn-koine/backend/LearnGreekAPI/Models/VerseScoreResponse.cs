namespace LearnGreekAPI.Models;

public class VerseScoreResponse
{
    public Guid Id { get; set; }
    public string VerseReference { get; set; } = string.Empty;
    public int Score { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
