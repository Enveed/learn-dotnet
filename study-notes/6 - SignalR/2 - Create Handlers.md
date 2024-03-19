* Comment Posting handler: 

``` c#
// Application/Comments/Create.cs
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }
  
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }
  
        public class Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;
            private readonly IUserAccessor _userAccessor = userAccessor;

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);
  
                if (activity == null) return null;

                var user = await _context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };
                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}
```

* List handler: 
``` c#
// Application/Comments/List.cs
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<List<CommentDto>>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;
            
            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _context.Comments
                    .Where(x => x.Activity.Id == request.ActivityId)
                    .OrderBy(x => x.CreatedAt)
                    .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<CommentDto>>.Success(comments);
            }
        }
    }
}
```


#dotnet #signalr #cascading #cqrs #clean-architecture 