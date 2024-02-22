
* Add AuthorizationFilter to Startup class to authenticate all routes:
``` c#
// Program.cs
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
```

* Mark the AccountController `AllowAnonymous` to prevent authentication:
``` c#
// API/Controllers/AccountController.cs
namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserManager<AppUser> userManager, TokenService tokenService) : ControllerBase
```
## References

#dotnet #identity #ef #jwt #security #authentication

