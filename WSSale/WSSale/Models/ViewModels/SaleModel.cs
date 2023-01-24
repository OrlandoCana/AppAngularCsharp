using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WSSale.Models.ViewModels
{
    public class SaleModel
    {
        [Required]
        [Range(1, Double.MaxValue, ErrorMessage = "IdClient error must be greater than 0.")]
        [ClientExists(ErrorMessage = "The client does not exist.")]
        public int IdClient { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Error must assign sales concepts.")]
        public List<SaleConceptModel> SaleConcepts { get; set; }

        public SaleModel()
        {
            SaleConcepts = new List<SaleConceptModel>();
        }
    }

    public class SaleConceptModel
    {
        public int Units { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Amount { get; set; }
        public int IdProduct { get; set; }

    }

    #region NewDataAnotations
    public class ClientExistsAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            int IdClient = (int)value;
            using (var db =  new DBSALEREALContext())
            {
                return db.Clients.Find(IdClient) != null;
            }
        }
    }
    #endregion
}
