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
	public DbSet<PetSitterTags> petSitterTags { get; set; }


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
			.Entity<Image>()
			.HasOne(i => i.User)
			.WithMany()
			.HasForeignKey(i => i.UserID)
			.IsRequired(false);
		modelBuilder
			.Entity<Image>()
			.HasOne(i => i.Pet)
			.WithMany()
			.HasForeignKey(i => i.PetID)
			.IsRequired(false);

		modelBuilder
			.Entity<Pet>()
			.HasOne<Breed>()
			.WithMany()
			.HasForeignKey(p => p.SpecieId)
			.OnDelete(DeleteBehavior.Restrict);

		modelBuilder
			.Entity<Pet>()
			.HasMany(p => p.Images)
			.WithOne(i => i.Pet)
			.HasForeignKey(i => i.PetID)
			.OnDelete(DeleteBehavior.Cascade);

		base.OnModelCreating(modelBuilder);
	}
}
