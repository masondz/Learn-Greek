using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using LearnGreekAPI.Models.Data;
using Microsoft.IdentityModel.Tokens;

namespace LearnGreekAPI.Services;

public class UserService : IUserService
{
    private readonly List<User> _users = new();
    private readonly IConfiguration _configuration;
    private int _nextId = 1;

    public UserService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public Task<User?> GetUserByUsername(string username)
    {
        var user = _users.FirstOrDefault(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(user);
    }

    public Task<User> CreateUser(string username, string password)
    {
        var user = new User
        {
            Id = _nextId++,
            Username = username,
            PasswordHash = HashPassword(password),
            CreatedAt = DateTime.UtcNow
        };
        _users.Add(user);
        return Task.FromResult(user);
    }

    public Task<bool> ValidatePassword(User user, string password)
    {
        var hashedPassword = HashPassword(password);
        return Task.FromResult(user.PasswordHash == hashedPassword);
    }

    public string GenerateJwtToken(User user)
    {
        var jwtKey = _configuration["Jwt:Key"] ?? "YourSuperSecretKeyThatShouldBeAtLeast32CharactersLong!";
        var jwtIssuer = _configuration["Jwt:Issuer"] ?? "LearnGreekAPI";
        var jwtAudience = _configuration["Jwt:Audience"] ?? "LearnGreekApp";

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
}
