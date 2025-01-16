using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using DataAccess.Types;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class PetSittingListingRepository : IPetSittingListingRepository
{
	private readonly FurFriendzContext _context;

	public PetSittingListingRepository(FurFriendzContext context)
	{
		_context = context;
	}

	public async Task<PetSittingListings?> GetByIdAsync(int id)
	{
		return await _context.PetSittingListings
			.Include(l => l.RequestingUser)
			.Include(l => l.ListingPets)
			.FirstOrDefaultAsync(l => l.Id == id);
	}

	public async Task<List<PetSittingListings>> GetAllAsync()
	{
		return await _context.PetSittingListings
			.Include(l => l.RequestingUser)
			.Include(l => l.ListingPets)
			.Include(l => l.Service)
			.ToListAsync();
	}

	public async Task<int> CreateAsync(PetSittingListings listing)
	{
		_context.Attach(listing.RequestingUser);
		var existingService = _context.ChangeTracker.Entries<PetSitterServices>()
	.FirstOrDefault(e => e.Entity.Id == listing.Service.Id)?.Entity;

		if (existingService == null)
		{
			_context.Attach(listing.Service);
		}
		else
		{
			listing.Service = existingService; // Use the already tracked instance
		}
		var newPetList = new List<Pet>();
		foreach (var pet in listing.ListingPets){
			var existingPet = _context.ChangeTracker.Entries<Pet>().FirstOrDefault(e => e.Entity.Id == pet.Id)?.Entity;

			if (existingPet == null)
			{
				_context.Attach(pet);
				newPetList.Add(pet);
			}
			else
			{
				newPetList.Add(existingPet); // Use the already tracked instance
			}
		}
		listing.ListingPets = newPetList;
		await _context.Set<PetSittingListings>().AddAsync(listing);
		await _context.SaveChangesAsync();
		return listing.Id ?? 0; // Assuming Id is the primary key and auto-generated
	}

	public async Task DeleteAsync(int id)
	{
		var listing = await _context.PetSittingListings.FindAsync(id);
		if (listing != null)
		{
			_context.PetSittingListings.Remove(listing);
			await _context.SaveChangesAsync();
		}
	}

	public async Task UpdateStatusAsync(int id, RequestStatus newStatus)
	{
		var listing = await _context.PetSittingListings.FindAsync(id);
		if (listing != null)
		{
			listing.Status = newStatus;
			await _context.SaveChangesAsync();
		}
	}
}