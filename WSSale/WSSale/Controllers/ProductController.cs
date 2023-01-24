using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WSSale.Models.Response;
using WSSale.Models.ViewModels;
using WSSale.Models;

namespace WSSale.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            Response oResponse = new Response();
            try
            {
                using (DBSALEREALContext db = new DBSALEREALContext())
                {
                    var products = db.Products.OrderByDescending(d => d.Id).ToList();
                    oResponse.Success = 1;
                    oResponse.Data = products;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }
            return Ok(oResponse);
        }

        [HttpPost]
        public IActionResult Add(ProductModel oProduct)
        {
            Response oResponse = new Response();
            try
            {
                using (DBSALEREALContext db = new DBSALEREALContext())
                {
                    Product newProduct = new Product();
                    newProduct.ProductName = oProduct.ProductName;
                    newProduct.UnitPrice = decimal.Parse(oProduct.UnitPrice.ToString());
                    newProduct.Cost = decimal.Parse(oProduct.Cost.ToString());
                    db.Products.Add(newProduct);
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
        public IActionResult Edit(ProductModel oProduct)
        {
            Response oResponse = new Response();
            try
            {
                using (DBSALEREALContext db = new DBSALEREALContext())
                {
                    Product editproduct = db.Products.Find(oProduct.Id);
                    editproduct.ProductName = oProduct.ProductName;
                    editproduct.UnitPrice = decimal.Parse(oProduct.UnitPrice.ToString());
                    editproduct.Cost = decimal.Parse(oProduct.Cost.ToString());
                    db.Entry(editproduct).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
                    Product oProduct = db.Products.Find(id);
                    db.Remove(oProduct);
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
