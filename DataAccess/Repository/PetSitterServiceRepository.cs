using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class PetSitterServicesRepository : IPetSitterServicesRepository
{
	private readonly FurFriendzContext _context;

	public PetSitterServicesRepository(FurFriendzContext context)
	{
		_context = context;
	}

	public async Task<PetSitterServices> GetByIdAsync(int id)
	{
		return await _context.PetSitterServices
							 .Include(p => p.User)
							 .AsNoTracking()
							 .FirstOrDefaultAsync(p => p.Id == id);
	}

	public async Task AddAsync(PetSitterServices petSitterService)
	{
		_context.PetSitterServices.Add(petSitterService);
		await _context.SaveChangesAsync();
	}

	public async Task UpdateAsync(PetSitterServices petSitterService)
	{
		_context.PetSitterServices.Update(petSitterService);
		await _context.SaveChangesAsync();
	}

	public async Task DeleteAsync(int id)
	{
		var entity = await GetByIdAsync(id);
		if (entity != null)
		{
			_context.PetSitterServices.Remove(entity);
			await _context.SaveChangesAsync();
		}
	}

	public async Task<IEnumerable<PetSitterServices>> GetByUserIdAsync(Guid userId)
	{
		return await _context.PetSitterServices
							 .Where(p => p.UserId == userId)
							 .Include(p => p.User)
							 .ToListAsync();
	}
}
