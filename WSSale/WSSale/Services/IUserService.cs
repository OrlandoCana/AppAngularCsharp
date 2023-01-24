using WSSale.Models.Response;
using WSSale.Models.ViewModels;

namespace WSSale.Services
{
    public interface IUserService
    {
        UserResponse Auth(AuthModel model); 
    }
}
