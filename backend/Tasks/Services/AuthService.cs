using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Tasks.Contracts;
using Tasks.DTO;
using Tasks.Models;

namespace Tasks.Services
{
    public class AuthService : IAuthService
    {
        private readonly SigningCredentials credentials;
        private readonly JwtSettings jwtSettings;

        public AuthService(IOptions<JwtSettings> jwt)
        {
            jwtSettings = jwt.Value;
            credentials = new(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Value.Key)), SecurityAlgorithms.HmacSha256);
        }

        public string GetToken(User user)
        {
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.ID.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email.ToString()),
                new Claim("role", user.Role),
            };

            var jwtToken = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                expires: DateTime.Now.AddMinutes(jwtSettings.Expires),
                signingCredentials: credentials,
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

    }
}
