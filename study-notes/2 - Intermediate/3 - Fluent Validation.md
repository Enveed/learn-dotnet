* [FluentValidation]([FluentValidation — FluentValidation documentation](https://docs.fluentvalidation.net/en/latest/)) is a .NET library for building strongly-typed validation rules. 

* There are 2 modes to using the validation in ASP.NET Core:
	* Manual Validation
	* Automatic Validation

* Install the package [FluentValidation.AspNetCore]([NuGet Gallery | FluentValidation.AspNetCore 11.3.0](https://www.nuget.org/packages/FluentValidation.AspNetCore/)) to Application Solution.

* Inject the FluentValidation services into Program.cs:
``` c#
// API/Extensions/ApplicationServiceExtensions.cs

services.AddFluentValidationAutoValidation();
services.AddValidatorsFromAssemblyContaining<Create>();

```

* Creating the validator:
``` c#
// Application/Activities/ActivityValidator.cs

using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
        }
    }
}
```

* Injecting the Validator in MediatR request handler:
``` c#
// Application/Activities/Create.cs

using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }
  
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler(DataContext context) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
```
## References

#dotnet #validation #intermediate #clean-architecture #cqrs

