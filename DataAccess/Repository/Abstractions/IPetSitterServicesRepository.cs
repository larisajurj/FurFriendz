using DataAccess.Entities;

namespace DataAccess.Repository.Abstractions;

public interface IPetSitterServicesRepository
{
	Task<PetSitterServices> GetByIdAsync(int id);
	Task AddAsync(PetSitterServices petSitterService);
	Task UpdateAsync(PetSitterServices petSitterService);
	Task DeleteAsync(int id);
	Task<IEnumerable<PetSitterServices>> GetByUserIdAsync(Guid userId);
}
