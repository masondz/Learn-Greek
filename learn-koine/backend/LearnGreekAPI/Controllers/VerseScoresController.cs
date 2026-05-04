using LearnGreekAPI.Models;
using LearnGreekAPI.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace LearnGreekAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VerseScoresController : ControllerBase
{
    private readonly AppDbContext _context;

    public VerseScoresController(AppDbContext context)
    {
        _context = context;
    }

    private Guid GetUserId()
    {
        // Try to get user ID from NameIdentifier claim (new tokens)
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        // If it's a Guid, use it
        if (!string.IsNullOrEmpty(userIdClaim) && Guid.TryParse(userIdClaim, out var userId))
        {
            return userId;
        }
        
        // Otherwise, it's an old token with username/email - look up user by username
        var username = User.FindFirst(ClaimTypes.Name)?.Value 
                      ?? User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        
        if (!string.IsNullOrEmpty(username))
        {
            var user = _context.Users.FirstOrDefault(u => u.Username.ToLower() == username.ToLower());
            if (user != null)
            {
                return user.Id;
            }
        }
        
        throw new UnauthorizedAccessException("Unable to identify user from token. Please log in again.");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<VerseScoreResponse>>> GetAllScores()
    {
        var userId = GetUserId();
        
        var scores = await _context.VerseScores
            .Where(vs => vs.UserId == userId)
            .Select(vs => new VerseScoreResponse
            {
                Id = vs.Id,
                VerseReference = vs.VerseReference,
                Score = vs.Score,
                CreatedAt = vs.CreatedAt,
                UpdatedAt = vs.UpdatedAt
            })
            .ToListAsync();

        return Ok(scores);
    }

    [HttpGet("{verseReference}")]
    public async Task<ActionResult<VerseScoreResponse>> GetScore(string verseReference)
    {
        var userId = GetUserId();
        
        var verseScore = await _context.VerseScores
            .FirstOrDefaultAsync(vs => vs.UserId == userId && vs.VerseReference == verseReference);

        if (verseScore == null)
        {
            return NotFound(new { message = "Score not found for this verse" });
        }

        return Ok(new VerseScoreResponse
        {
            Id = verseScore.Id,
            VerseReference = verseScore.VerseReference,
            Score = verseScore.Score,
            CreatedAt = verseScore.CreatedAt,
            UpdatedAt = verseScore.UpdatedAt
        });
    }

    [HttpPost]
    public async Task<ActionResult<VerseScoreResponse>> CreateOrUpdateScore([FromBody] VerseScoreRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.VerseReference))
        {
            return BadRequest("Verse reference is required");
        }

        if (request.Score < 0)
        {
            return BadRequest("Score cannot be negative");
        }

        var userId = GetUserId();

        var existingScore = await _context.VerseScores
            .FirstOrDefaultAsync(vs => vs.UserId == userId && vs.VerseReference == request.VerseReference);

        if (existingScore != null)
        {
            if (request.Score > existingScore.Score)
            {
                existingScore.Score = request.Score;
                existingScore.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            return Ok(new VerseScoreResponse
            {
                Id = existingScore.Id,
                VerseReference = existingScore.VerseReference,
                Score = existingScore.Score,
                CreatedAt = existingScore.CreatedAt,
                UpdatedAt = existingScore.UpdatedAt
            });
        }

        var verseScore = new VerseScore
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            VerseReference = request.VerseReference,
            Score = request.Score,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.VerseScores.Add(verseScore);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetScore),
            new { verseReference = verseScore.VerseReference },
            new VerseScoreResponse
            {
                Id = verseScore.Id,
                VerseReference = verseScore.VerseReference,
                Score = verseScore.Score,
                CreatedAt = verseScore.CreatedAt,
                UpdatedAt = verseScore.UpdatedAt
            });
    }

    [HttpDelete("{verseReference}")]
    public async Task<ActionResult> DeleteScore(string verseReference)
    {
        var userId = GetUserId();
        
        var verseScore = await _context.VerseScores
            .FirstOrDefaultAsync(vs => vs.UserId == userId && vs.VerseReference == verseReference);

        if (verseScore == null)
        {
            return NotFound(new { message = "Score not found for this verse" });
        }

        _context.VerseScores.Remove(verseScore);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
