using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSSale.Models;
using WSSale.Models.Response;
using WSSale.Models.ViewModels;
using WSSale.Services;

namespace WSSale.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SaleController : ControllerBase
    {
        private ISaleService _sale;

        public SaleController(ISaleService sale)
        {
            _sale = sale;
        }

        [HttpPost]
        public IActionResult Add(SaleModel model)
        {
            Response response = new Response();
            try
            {
                _sale.Add(model);
                response.Success = 1;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return Ok(response);
        }
    }
}
