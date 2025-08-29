using Microsoft.AspNetCore.Mvc;

namespace Tasks.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet(Name = "Users")]
        public async Task<IActionResult> List()
        {
            return Ok();
        }

    }
}
