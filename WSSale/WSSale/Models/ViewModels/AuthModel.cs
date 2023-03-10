using System.ComponentModel.DataAnnotations;

namespace WSSale.Models.ViewModels
{
    public class AuthModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
