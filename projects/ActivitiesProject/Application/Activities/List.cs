using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>>
        {

        }

        public class Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly IMapper _mapper = mapper;
            private readonly DataContext _context = context;
            private readonly IUserAccessor _userAccessor = userAccessor;

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .ToListAsync();

                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}