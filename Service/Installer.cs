using Microsoft.Extensions.DependencyInjection;
using Service.Services;

namespace Service;

public static class Installer
{
	public static void AddServices(this IServiceCollection services)
	{
		services.AddTransient<IUserSevice, UserService>();
		services.AddAutoMapper(typeof(UserProfile).Assembly);
	}
}