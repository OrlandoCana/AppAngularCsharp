using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSSale.Models.Response;
using WSSale.Models.ViewModels;
using WSSale.Services;

namespace WSSale.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Auth([FromBody] AuthModel model)
        {
            Response response = new Response();
            var userResponse = _userService.Auth(model);
            if (userResponse == null)
            {
                response.Message = "wrong Username or Password";
                return BadRequest(response);
            }
            response.Success = 1;
            response.Data = userResponse;
            return Ok(response);
        }
    }
}
