using LearnGreekAPI.Models;

namespace LearnGreekAPI.Services;

public interface IUserService
{
    Task<User?> GetUserByUsername(string username);
    Task<User> CreateUser(string username, string password);
    Task<bool> ValidatePassword(User user, string password);
    string GenerateJwtToken(User user);
}
