using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tasks.Contracts;

namespace Tasks.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService user)
        {
            _userService = user;
        }

        [HttpGet(Name = "Users")]
        public async Task<IActionResult> List()
        {
            var users = await _userService.Listing();
            return Ok(users);
        }

    }
}
