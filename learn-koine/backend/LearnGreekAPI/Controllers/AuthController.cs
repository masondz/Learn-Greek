using LearnGreekAPI.Models;
using LearnGreekAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace LearnGreekAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Username and password are required");
        }

        var existingUser = await _userService.GetUserByUsername(request.Username);
        if (existingUser != null)
        {
            return BadRequest("Username already exists");
        }

        var user = await _userService.CreateUser(request.Username, request.Password);
        var token = _userService.GenerateJwtToken(user);

        return Ok(new AuthResponse
        {
            Token = token,
            Username = user.Username
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Username and password are required");
        }

        var user = await _userService.GetUserByUsername(request.Username);
        if (user == null)
        {
            return Unauthorized("Invalid username or password");
        }

        var isValidPassword = await _userService.ValidatePassword(user, request.Password);
        if (!isValidPassword)
        {
            return Unauthorized("Invalid username or password");
        }

        var token = _userService.GenerateJwtToken(user);

        return Ok(new AuthResponse
        {
            Token = token,
            Username = user.Username
        });
    }
}
