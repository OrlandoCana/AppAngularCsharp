using System;
using System.Collections.Generic;

namespace WSSale.Models
{
    public partial class Sale
    {
        public Sale()
        {
            SaleConcepts = new HashSet<SaleConcept>();
        }

        public long Id { get; set; }
        public DateTime SaleDate { get; set; }
        public int IdClient { get; set; }
        public decimal Total { get; set; }

        public virtual Client IdClientNavigation { get; set; } = null!;
        public virtual ICollection<SaleConcept> SaleConcepts { get; set; }
    }
}
