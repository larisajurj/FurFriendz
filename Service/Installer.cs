using Microsoft.Extensions.DependencyInjection;
using Service.Profiles;
using Service.Services;
using Service.Services.Abstractions;

namespace Service;

public static class Installer
{
	public static void AddAPIServices(this IServiceCollection services)
	{
		services.AddTransient<IUserService, UserService>();
		services.AddTransient<IPetService, PetService>();

		services.AddAutoMapper(typeof(UserProfile).Assembly);
		services.AddAutoMapper(typeof(PetProfile).Assembly);

	}
}