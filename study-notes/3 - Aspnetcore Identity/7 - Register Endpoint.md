
* Check for unique email in the startup class with:

``` c#
// API/Extensions/IdentityServiceExtensions.cs
services.AddIdentityCore<AppUser>(opt =>
{
	opt.Password.RequireNonAlphanumeric = false;
	opt.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<DataContext>();
```

* Register the `Register` endpoint in the AccountController:
``` c#
// API/Controllers/AccountController.cs
[HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username is already taken");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
            }

            return BadRequest(result.Errors);
        }
```
## References

#dotnet #identity #ef #jwt #security #register

