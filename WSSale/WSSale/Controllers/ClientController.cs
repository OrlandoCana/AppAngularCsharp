using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSSale.Models;
using WSSale.Models.Response;
using WSSale.Models.ViewModels;

namespace WSSale.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClientController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            Response oResponse = new Response();
            try
            {
                using (DBSALEREALContext db = new DBSALEREALContext())
                {
                    var clients = db.Clients.OrderByDescending(d => d.Id).ToList();
                    oResponse.Success = 1;
                    oResponse.Data = clients;
                }
            }
            catch(Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }

        [HttpPost]
        public IActionResult Add(ClientModel oClient)
        {
            Response oResponse = new Response();
            try
            {
                using (DBSALEREALContext db = new DBSALEREALContext())
                {
                    Client newClient = new Client();
                    newClient.ClientName = oClient.ClientName;
                    db.Clients.Add(newClient);
                    db.SaveChanges();
                    oResponse.Success = 1;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }

        [HttpPut]
        public IActionResult Edit(ClientModel oClient)
        {
            Response oResponse = new Response();
            try
            {
                using (DBSALEREALContext db = new DBSALEREALContext())
                {
                    Client editClient = db.Clients.Find(oClient.Id);
                    editClient.ClientName = oClient.ClientName;
                    db.Entry(editClient).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                    oResponse.Success = 1;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Response oResponse = new Response();
            try
            {
                using (DBSALEREALContext db = new DBSALEREALContext())
                {
                    Client oClient = db.Clients.Find(id);
                    db.Remove(oClient);
                    db.SaveChanges();
                    oResponse.Success = 1;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }
    }
}
