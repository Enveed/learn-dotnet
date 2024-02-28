* We want to get user token and claim within the Application layer. However, we don't have access to it within the Application layer and we don't want to over-complicate our API controller.

* We can achieve it by creating another `Infrastructure` project:

``` bash
dotnet new classlib -n Infrastructure
dotnet sln add Infrastructurevsdc
dotnet add reference ../Application
cd ../API
dotnet add reference ../Infrastructure
cd ..
dotnet restore
```

* Then, we need to create an interface within the Application project:
``` c#
// Application/Interfaces/IUserAccessor.cs
namespace Application.Interfaces
{
    public interface IUserAccessor
    {
        string GetUsername();
    }
}
```

* In the infrastructure project, we can then implement the `IUserAccessor` interface:
``` c#
// Infrastructure/Security/UserAccessor.cs
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor(IHttpContextAccessor httpContextAccessor) : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        
        public string GetUsername()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
```

* Finally, we can add the function into our Startup class so that it can be injected within the Application project.
``` c#
// API/Extensions/ApplicationServiceExtensions.cs
using Infrastructure.Security;
using Application.Interfaces;

services.AddHttpContextAccessor();
services.AddScoped<IUserAccessor, UserAccessor>();
```


#dotnet #identity #ef #manytomany #infrastructure #httpcontext

