* In order to configure many to many relationship between 2 entities, we must first create a new joint entity:
``` c#
// Domain/ActivityAttendee.cs
namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public bool IsHost { get; set; }
    }
}
```

* Then, we need to add ICollection of the entity for each entity that we want to have many to many with:
``` c#
// Domain/Activity.cs
namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public ICollection<ActivityAttendee> Attendees { get; set; }
    }
}
```

``` c#
// Domain/AppUser.cs
using Microsoft.AspNetCore.Identity;
namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<ActivityAttendee> Activities { get; set; }
    }
}
```

* Finally, we will have to manually configure our Persistence layer by overriding the `OnModelCreating` function:
``` c#
// Persistence/DataContext.cs
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
    {
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            builder.Entity<ActivityAttendee>().HasOne(u => u.AppUser).WithMany(a => a.Activities).HasForeignKey(aa => aa.AppUserId);
            builder.Entity<ActivityAttendee>().HasOne(u => u.Activity).WithMany(a => a.Attendees).HasForeignKey(aa => aa.ActivityId);
        }
    }
}
```


#dotnet #identity #ef #manytomany 