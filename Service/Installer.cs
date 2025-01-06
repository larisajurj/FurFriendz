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
		services.AddTransient<IBreedService, BreedService>();
		services.AddTransient<IPetSittingService, PetSittingService>();
		services.AddTransient<IPetSittingServiceManager, PetSitterServiceManager>();


		services.AddAutoMapper(typeof(UserProfile).Assembly);
		services.AddAutoMapper(typeof(PetProfile).Assembly);
		services.AddAutoMapper(typeof(AddressProfile).Assembly);
		services.AddAutoMapper(typeof(PetSittingListingProfile).Assembly);
	}
}