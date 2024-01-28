* An entity is a class in an Entity Framework that maps the database tables.

* Entity Framework is a modern object-relation mapper (ORM) that lets you build a clean, portable, and high-level data access layer with .NET (C#) across a variety of databases, including SQL Database (on-premises and Azure), SQLite, MySQL, PostgreSQL, and Azure Cosmos DB.

* [dotnet ef](https://www.nuget.org/packages/dotnet-ef): is a CLI tools for working with entity framework. For example, they create [migrations](https://learn.microsoft.com/en-us/aspnet/core/data/ef-mvc/migrations), apply migrations, and generate code for a model based on an existing database.

* Example:
``` bash
dotnet ef migrations add InitialCreate -s API -p Persistence
```

* Adding DB Context:
``` c#
// Program.cs
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
```

## References

#dotnet #entity #ef
