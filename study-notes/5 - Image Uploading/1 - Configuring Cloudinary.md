* First, we need to add [CloudinaryDotNet](https://www.nuget.org/packages/CloudinaryDotNet)to our infrastructure project.
* Then, we need to strictly type our Cloudinary configuration object and set it via our Startup class.
``` json
// API/appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Cloudinary": {
    "CloudName": "kirirom-institute-of-technology",
    "ApiKey": "421927217448483",
    "ApiSecret": "EFx28Sh9XblXBmjU2Xdp3PWJP6g"
  }
}
```

``` c#
// Infrastructure/Photos/CloudinarySettings.cs
namespace Infrastructure.Photos
{
    public class CloudinarySettings
    {
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
    }
}
```

``` c#
// API/Extensions/ApplicationServiceExtensions.cs
services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
return services;
```

#dotnet #API #cloudinary #blob #image-upload

