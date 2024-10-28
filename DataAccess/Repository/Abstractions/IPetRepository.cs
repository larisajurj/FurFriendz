using DataAccess.Entities;

namespace DataAccess.Repository.Abstractions;

public interface IPetRepository
{
	Task<IEnumerable<Pet>> GetAllAsync();
	Task<Pet?> FindByIdAsync(int id);
	Task<Pet> PostAsync(User entity);
	Task<Pet> UpdateAsync(User entity);
	Task DeleteAsync(int id);
}
