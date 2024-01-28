* Scoped lifetime is ideal for stateful services or resources that need to be shared within a specific context, such as a web request or a unit of work.

``` c#
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    context.Database.Migrate();
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}
```

## References

#dotnet #scoped 