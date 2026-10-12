namespace LearnGreekAPI.Models;

public class VerseScoreRequest
{
    public string VerseReference { get; set; } = string.Empty;
    public int Score { get; set; }
}
