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
	public DbSet<PetSittingListings> PetSittingListings { get; set; }

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
		modelBuilder.Entity<User>()
		   .OwnsOne(u => u.HomeAddress, a =>
		   {
			   a.Property(h => h.StreetName).HasMaxLength(200).HasColumnName("StreetName");
			   a.Property(h => h.BuildingNumber).HasMaxLength(50).HasColumnName("BuildingNumber");
			   a.Property(h => h.ApartmentNumber).HasMaxLength(50).HasColumnName("ApartmentNumber");
			   a.Property(h => h.City).HasMaxLength(100).HasColumnName("City");
			   a.Property(h => h.Latitude).HasColumnName("Latitude");
			   a.Property(h => h.Longitude).HasColumnName("Longitude");
		   });
		modelBuilder
			.Entity<PetSittingListings>()
			.Property(u => u.Status)
			.HasConversion(new EnumToStringConverter<RequestStatus>());
		modelBuilder.Entity<PetSittingListingPet>()
	   .HasKey(pslp => new { pslp.PetSittingListingId, pslp.PetId });

		modelBuilder.Entity<PetSittingListingPet>()
			.HasOne(pslp => pslp.PetSittingListings)
			.WithMany(psl => psl.ListingPets)
			.HasForeignKey(pslp => pslp.PetSittingListingId);

		modelBuilder.Entity<PetSittingListingPet>()
			.HasOne(pslp => pslp.Pet)
			.WithMany(p => p.ListingPets)
			.HasForeignKey(pslp => pslp.PetId);

		// Configure the one-to-many relationship for RequestingUser
		modelBuilder.Entity<PetSittingListings>()
			.HasOne(psl => psl.RequestingUser)
			.WithMany(u => u.RequestingListings)
			.HasForeignKey(psl => psl.RequestingUserId)
			.OnDelete(DeleteBehavior.Restrict);

		// Configure the one-to-many relationship for PetSitter
		modelBuilder.Entity<PetSittingListings>()
			.HasOne(psl => psl.PetSitter)
			.WithMany(u => u.SitterListings)
			.HasForeignKey(psl => psl.PetSitterId)
			.OnDelete(DeleteBehavior.Restrict);
		base.OnModelCreating(modelBuilder);
	}
}
