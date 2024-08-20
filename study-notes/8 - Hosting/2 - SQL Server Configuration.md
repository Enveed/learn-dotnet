``` yml
services:
  sql:
    image: mcr.microsoft.com/azure-sql-edge
    environment:
      ACCEPT_EULA: "1"
      MSSQL_SA_PASSWORD: "Password@1"
    ports:
      - "1433:1433"
```

* Add SQL Server to Persistence layer: 
``` c#
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.8" />
```

* Connection String:
``` json
  "DefaultConnection": "Server=localhost,1433;Database=Reactivities;User Id=SA;Password=Password@1;TrustServerCertificate=True"
```

* Modify DB Context connection:
``` c#
// API/Extensions/ApplicationServiceExtensions.cs
services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));

            });
```



#sql-server #hosting #docker