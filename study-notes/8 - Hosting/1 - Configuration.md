* In order to enable Kestrel Web Server on our .NET API, we need to:
``` c#
// Program.cs
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapFallbackToController("Index", "Fallback");
```

``` c#
// API/Controllers/FallbackController.cs
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[AllowAnonymous]
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}
```

#hosting #kestrel #dotnet 