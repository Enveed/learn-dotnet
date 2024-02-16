* We will be using **Middleware** in order to deal with Exception Handling.

* **Middleware** is software that's assembled into an app pipeline to handle requests and responses. Each component:
	- Chooses whether to pass the request to the next component in the pipeline.
	- Can perform work before and after the next component in the pipeline.

* Exception-handling delegates should be called early in the pipeline, so they can catch exceptions that occur in later stages of the pipeline.

![[Middleware-1.png]]

* First, create exception response object:

``` c#
// API/Middleware/ExceptionMiddleware.cs

namespace Application.Core
{
    public class AppException(int statusCode, string message, string details = null)
    {
        public int StatusCode { get; set; } = statusCode;
        public string Message { get; set; } = message;
        public string Details { get; set; } = details;
    }
}
```

* Then, create the Middleware class so that it can be used in Program.cs:

``` c#
// Application/Core/AppException.cs

using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware

{
    public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<ExceptionMiddleware> _logger = logger;
        private readonly IHostEnvironment _env = env;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
  
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
```

* Finally, we can import the Middleware into Program.cs
``` c#
// Application/Core/AppException.cs

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
```
## References

#dotnet #exception-handling #intermediate  #middleware

