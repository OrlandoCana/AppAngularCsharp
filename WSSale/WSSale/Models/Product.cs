using System;
using System.Collections.Generic;

namespace WSSale.Models
{
    public partial class Product
    {
        public Product()
        {
            SaleConcepts = new HashSet<SaleConcept>();
        }

        public int Id { get; set; }
        public string ProductName { get; set; } = null!;
        public decimal UnitPrice { get; set; }
        public decimal Cost { get; set; }

        public virtual ICollection<SaleConcept> SaleConcepts { get; set; }
    }
}
