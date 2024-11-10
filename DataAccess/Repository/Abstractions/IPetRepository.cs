using DataAccess.Entities;

namespace DataAccess.Repository.Abstractions;

public interface IPetRepository
{
	Task<IEnumerable<Pet>> GetAllAsync();
	Task<Pet?> FindByIdAsync(int id);
	Task<Pet> PostAsync(Pet entity);
	Task<Pet> UpdateAsync(Pet entity);
	Task DeleteAsync(int id);
}
