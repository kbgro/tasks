using Microsoft.AspNetCore.Mvc;
using Tasks.Contracts;
using Tasks.DTO;

namespace Tasks.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(ILogger<AuthController> logger, IAuthService auth, IUserService user)
        {
            _logger = logger;
            _authService = auth;
            _userService = user;
        }

        [HttpPost(nameof(Register), Name = "Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest register)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var user = await _userService.GetUser(register.Email);
            if (user != null)
            {
                return BadRequest(new Dictionary<string, object>()
                {
                    { "message", "Email already in user." }
                });
            }

            user = await _userService.AddUser(register);

            return Ok(new Dictionary<string, object>() { { "message", "Registration successful!" } });
        }

        [HttpPost(nameof(Login), Name = "Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest login)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var user = await _userService.GetUser(login.Email);
            if (user == null || !_userService.VerifyUserPassword(user, login.Password))
            {
                return BadRequest(new Dictionary<string, object>()
                {
                    { "message", "Invalid username or password" }
                });
            }

            return Ok(new Dictionary<string, object>()
            {
                { "message", "success" },
                { "access_token", _authService.GetToken(user) }
            });
        }
    }
}
