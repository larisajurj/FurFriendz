﻿using DataAccess.Entities;
using DataAccess.Repository;
using DataAccess.Repository.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess;

public static class Installer
{
	public static void AddFurFriendzDb(this IServiceCollection services, string sqlConnectionString)
	{
		services.AddDbContext<FurFriendzContext>(
			options =>
				options.UseSqlServer(sqlConnectionString), ServiceLifetime.Transient);
		services.AddTransient<IUserRepository, UserRepository>();
		services.AddTransient<IPetRepository, PetRepository>();
		services.AddTransient<IBreedRepository, BreedRepository>();
		services.AddScoped<IPetSittingListingRepository, PetSittingListingRepository>();
		services.AddScoped<IPetSitterServicesRepository, PetSitterServicesRepository>();

	}
}
