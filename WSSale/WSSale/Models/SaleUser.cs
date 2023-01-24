using System;
using System.Collections.Generic;

namespace WSSale.Models
{
    public partial class SaleUser
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string PasswordUser { get; set; } = null!;
        public string NameUser { get; set; } = null!;
    }
}
