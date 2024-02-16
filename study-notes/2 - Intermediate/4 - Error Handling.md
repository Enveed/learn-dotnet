* First, create a Result class:
``` c#
// Application/Core/Result.cs

namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        
        public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };
        
        public static Result<T> Failure(string error) => new() { IsSuccess = false, Error = error };
    }
}
```

* Then, we can use the class in our command/query handler:
``` c#
// Application/Activities/Details.cs

using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }
  
        public class Handler(DataContext context) : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context = context;
            
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}
```

* To properly handle response status code and response body, we need to: 
``` c#
// API/Controllers/ActivitiesController.cs

using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
  
public class ActivitiesController() : BaseApiController
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }
}
```

* The **HandleResult** method is stored in **BaseApiController** so that it may be accessed by other endpoints:
``` c#
// API/Controllers/BaseApiController.cs

using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
  
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);
        if (result.IsSuccess && result.Value == null)
            return NotFound();
        return BadRequest(result.Error);
    }
}
```

## References

#dotnet #error-handling #intermediate #clean-architecture #cqrs

