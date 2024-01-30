* Adding CORS Policy to API:

``` c#
// Program.cs

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});

app.UseCors("CorsPolicy");
```


## References

#dotnet #cors