* **_MediatR_** is a [NuGet package](https://www.nuget.org/packages/MediatR) for .NET applications that helps to implement the Mediator pattern and MediatR can be used as a useful tool to implement CQRS in a .NET application.

* MediatR pattern helps to reduce direct dependency between multiple objects and make them collaborative through MediatR.

![[Mediatr-1.png]]


* Creating MediatR Qurey and Query Handler:

``` c#
// Application/Activities/List.cs

using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
  
namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>
        {
        }
  
        public class Handler(DataContext context) : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context = context;
            
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}
```

* Linking MediatR to Controller:

``` c#

// API/Controllers/BaseApiController.cs
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator _mediator;
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
}

// API/Controllers/ActivitiesController.cs
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
  
public class ActivitiesController() : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new List.Query());
    }
  
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return Ok();
    }
}
```

* Adding MediatR as Service to Program.cs:

``` c#
// Program.cs

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
```

## References

#dotnet #mediatr #intermediate #clean-architecture #cqrs