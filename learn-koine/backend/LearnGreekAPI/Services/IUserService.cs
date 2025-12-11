using LearnGreekAPI.Models.Data;

namespace LearnGreekAPI.Services;

public interface IUserService
{
    Task<User?> GetUserByUsername(string username);
    Task<User> CreateUser(string username, string password);
    Task<bool> ValidatePassword(User user, string password);
    string GenerateJwtToken(User user);
}

//TODO Update using statements to LearnGreekAPI.Models.Data where User entity is used.
