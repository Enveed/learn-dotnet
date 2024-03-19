``` c#
public class Handler(DataContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;
            private readonly IUserAccessor _userAccessor = userAccessor;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var profile = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (profile == null) return null;
  
                profile.DisplayName = request.DisplayName ?? profile.DisplayName;
                profile.Bio = request.Bio ?? profile.Bio;

                _context.Entry(profile).State = EntityState.Modified;

                var success = await _context.SaveChangesAsync() > 0;
                
                if (!success) return Result<Unit>.Failure("Failed to update user profile");
                return Result<Unit>.Success(Unit.Value);
            }
        }
```


#dotnet #identity #ef #auth #custom

