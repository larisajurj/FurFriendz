using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class UserRepository : IUserRepository
{
	protected readonly FurFriendzContext _context;

	public UserRepository(FurFriendzContext context)
	{
		_context = context;
	}

	public virtual async Task<IEnumerable<User>> GetAllAsync()
	{
		try
		{
			return await _context.Set<User>().ToListAsync();
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when retrieving data from DB: {ex.Message}", ex);
		}
	}

	public virtual async Task<User?> FindByIdAsync(Guid id)
	{
		try
		{
			var res = await _context.Set<User>()
				.Include(u => u.RequestingListings)
				.ThenInclude(l => l.Service)
				.FirstOrDefaultAsync(u => u.Id == id);
			if (res != null)
				_context.Attach(res);
			return res;
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when retrieving entity by id {id}, {ex.Message}", ex);
		}
	}

	public virtual async Task<User?> FindByEmailAsync(string email)
	{
		try
		{
			return await _context.Set<User>().Where(u => u.Email == email).FirstOrDefaultAsync();
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when retrieving entity by email {email}, {ex.Message}", ex);
		}
	}

	public virtual async Task<User> PostAsync(User entity)
	{
		try
		{
			await _context.Set<User>().AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity;
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when adding data to DB: {ex.Message}", ex);
		}
	}

	public virtual async Task<User> UpdateAsync(User entity)
	{
		try
		{
			_context.Set<User>().Entry(entity).State = EntityState.Modified;
			await _context.SaveChangesAsync();
			return entity;
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when updating data from DB: {ex.Message}", ex);
		}
	}

	public virtual async Task DeleteAsync(Guid id)
	{
		try
		{
			var entity = await _context.Set<User>().FindAsync(id);
			if (entity == null)
			{
				return;
			}
			_context.Set<User>().Remove(entity);
			await _context.SaveChangesAsync();
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when deleting data from DB: {ex.Message}", ex);
		}
	}
}
