using WSSale.Models.Response;
using WSSale.Models;
using WSSale.Models.ViewModels;

namespace WSSale.Services
{
    public class SaleService : ISaleService
    {
        public void Add(SaleModel model)
        {
            using (DBSALEREALContext db = new DBSALEREALContext())
            {
                
                using (var transaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var sale = new Sale();
                        sale.Total = model.SaleConcepts.Sum(concept => concept.Units * concept.UnitPrice);
                        sale.SaleDate = DateTime.Now;
                        sale.IdClient = model.IdClient;
                        db.Sales.Add(sale);
                        db.SaveChanges();

                        foreach (var modelConcept in model.SaleConcepts)
                        {
                            var concept = new Models.SaleConcept();
                            concept.Units = modelConcept.Units;
                            concept.IdProduct = modelConcept.IdProduct;
                            concept.UnitPrice = modelConcept.UnitPrice;
                            concept.Amount = modelConcept.Amount;
                            concept.IdSale = sale.Id;
                            db.SaleConcepts.Add(concept);
                            db.SaveChanges();
                        }
                        transaction.Commit();

                    }
                    catch
                    {
                        transaction.Rollback();
                        throw new Exception("An Error ocurred in the insertion.");
                    }
                }
            }
        }
    }
}
