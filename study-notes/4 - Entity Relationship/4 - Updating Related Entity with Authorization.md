* The goal here is to create an endpoint such that the attendees may update their attendance and the host may not update their attendance, however they can cancel that activity.

* In order to do that, first we need to create an `IsCancelled` field to both the Activity and ActivityDto. Then, we can run a migration script for Entity Framework to migrate the new field onto the database.

``` c#
// Domain/Activity.cs
namespace Domain
{
    public class Activity
    {
        public bool IsCancelled { get; set; }
    }
}
```

``` c#
// Application/Activities/ActivityDto.cs
using Application.Profiles;
namespace Application.Activities
{
    public class ActivityDto
    {
        public bool IsCancelled { get; set; }
    }
}
```

``` bash
dotnet ef migrations add AddCancelProperty -p Persistence -s API
```

* Finally, we can create the command handler for such functionality and an endpoint for routing to that handler:
``` c#
// Application/Activities/UpdateAttendance.cs
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler(DataContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;
            private readonly IUserAccessor _userAccessor = userAccessor;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;
                
                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                if (attendance != null && hostUsername != user.UserName)
                    activity.Attendees.Remove(attendance);

                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };
                    activity.Attendees.Add(attendance);
                }
                
                var result = await _context.SaveChangesAsync() > 0;
                
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}
```

``` c#
// API/Controllers/ActivitiesController.cs
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController() : BaseApiController
{
    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(Guid id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
    }
}
```

#dotnet #identity #ef #manytomany #infrastructure 

