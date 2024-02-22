* First, install [Microsoft.AspNetCore.Authentication.JwtBearer](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.JwtBearer)package into our API project.

* Add our JWT key into appsettings:
``` json
//appsettings.Development.json
{
  "TokenKey": "+L*S3kXbsvTj=W8%3r4Y+zXfBbL^vB#_Q%*Qfh=p6-9+ZC#MT7gJ7-F=9&q!?#k@"
}
```

* Change TokenService to use JWT key from appsettings:
``` c#
// API/Services/TokenService.cs
public class TokenService(IConfiguration config)
    {
        private readonly IConfiguration _config = config;
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.UserName),
                new(ClaimTypes.NameIdentifier, user.Id),
                new(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
```

* Then, inject authentication service into Startup class:

``` c#
// API/Extensions/IdentityServiceExtensions.cs
using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
            }).AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddScoped<TokenService>();
            return services;
        }
    }
}
```

* After that, we can let the application use the authentication:
``` c#

// API/Program.cs
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
```

* For controller endpoints that we want to use Authentication, we can:
``` c#
// API/Controllers/ActivitiesController.cs
    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }
```
## References

#dotnet #identity #ef #jwt #security #authentication

