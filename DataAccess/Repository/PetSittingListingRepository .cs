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
			.Include(l => l.PetSitter)
			.Include(l => l.ListingPets)
		.ThenInclude(lp => lp.Pet)
			.FirstOrDefaultAsync(l => l.Id == id);
	}

	public async Task<List<PetSittingListings>> GetAllAsync()
	{
		return await _context.PetSittingListings
			.Include(l => l.RequestingUser)
			.Include(l => l.PetSitter)
		.Include(l => l.ListingPets)
				.ThenInclude(lp => lp.Pet)
			.ToListAsync();
	}

	public async Task CreateAsync(PetSittingListings listing)
	{
		_context.PetSittingListings.Add(listing);
		await _context.SaveChangesAsync();
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