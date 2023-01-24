using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WSSale.Models;
using WSSale.Models.common;
using WSSale.Models.Response;
using WSSale.Models.ViewModels;
using WSSale.Tools;

namespace WSSale.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }
        public UserResponse Auth(AuthModel model)
        {
            UserResponse userResponse = new UserResponse();
            using (var db = new DBSALEREALContext())
            {
                string spassword = Encrypt.GetSHA256(model.Password);
                var user = db.SaleUsers.Where(d => d.Email == model.Email && 
                d.PasswordUser == spassword).FirstOrDefault();

                if (user == null) { return null; }
                userResponse.Email = user.Email;
                userResponse.Token = GetToken(user);
            }
            return userResponse;
        }

        private string GetToken(SaleUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDecriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email)
                    }),
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDecriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
