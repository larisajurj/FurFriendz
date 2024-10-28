using DataAccess.Entities;
using DataAccess.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataAccess;

public class FurFriendzContext : DbContext
{
	public DbSet<User> Users { get; set; }
	public DbSet<Pet> Pets { get; set; }


	public FurFriendzContext(DbContextOptions<FurFriendzContext> options)
		: base(options)
	{

	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder
			.Entity<User>()
			.Property(u => u.Role)
			.HasConversion(new EnumToStringConverter<UserRole>());
		modelBuilder
			.Entity<Pet>()
			.Property(u => u.Gender)
			.HasConversion(new EnumToStringConverter<Gender>());
	}
}
