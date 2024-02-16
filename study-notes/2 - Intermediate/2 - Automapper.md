* [AutoMapper](https://www.nuget.org/packages/AutoMapper.Extensions.Microsoft.DependencyInjection/) is a simple little library built to solve a deceptively complex problem - getting rid of code that mapped one object to another.

* Creating AutoMapper utility:
``` c#
// Application/Core/MappingProfiles.cs

using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}
```

* Adding AutoMapper so that it can be injected:
``` c#
// Program.cs
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
```

* Using AutoMapper in a PUT request:
``` c#
// Application/Activities/Edit.cs

using AutoMapper;
using Domain;
using MediatR;
using Persistence;
  
namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();
            }
        }
    }
}
```

## References

#dotnet #automapper #intermediate 

