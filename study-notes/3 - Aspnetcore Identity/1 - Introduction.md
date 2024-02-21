* [Aspnetcore Identity](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-8.0&tabs=visual-studio) - Is an API that supports user interface (UI) login functionality. It manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.

* Users can create an account with the login information stored in Identity or they can use an external login provider. Supported external login providers include [Facebook, Google, Microsoft Account, and Twitter](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/social/?view=aspnetcore-8.0).

* First, we need to add [Microsoft.AspNetCore.Identity.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.EntityFrameworkCore) to our Domain solution.

* Then, we need to create User Entity:
``` c#
// Domain/AppUser.cs

using Microsoft.AspNetCore.Identity;  

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
    }
}
```

* Next, we'll have to add the User Entity to the Persistence layer:
``` c#
// Persistent/DataContext.cs

using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
    {
        public DbSet<Activity> Activities { get; set; }
    }
}
```

* Then, we will have to run a migration script to add the User table to Database:
``` bash
dotnet ef migrations add IdentityAdded -p Persistence -s API
```

## References

#dotnet #identity 

