using DataAccess.Entities;
using DataAccess.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataAccess;

public class FurFriendzContext : DbContext
{
	public DbSet<User> Users { get; set; }
	public DbSet<Pet> Pets { get; set; }
	public DbSet<Image> Images { get; set; }
	public DbSet<Breed> Breeds { get; set; }
	public DbSet<PetTag> PetTags { get; set; }
	public DbSet<PetSitterTags> PetSitterTags { get; set; }


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
		modelBuilder
			.Entity<PetTag>()
			.Property(u => u.Tag)
			.HasConversion(new EnumToStringConverter<TagName>());
		modelBuilder
			.Entity<PetSitterTags>()
			.Property(u => u.Tag)
			.HasConversion(new EnumToStringConverter<TagName>());
		modelBuilder
			.Entity<Pet>()
			.Property(u => u.Specie)
			.HasConversion(new EnumToStringConverter<AnimalSpecie>());
		modelBuilder
			.Entity<Breed>()
			.Property(u => u.Specie)
			.HasConversion(new EnumToStringConverter<AnimalSpecie>());

		base.OnModelCreating(modelBuilder);
	}
}
