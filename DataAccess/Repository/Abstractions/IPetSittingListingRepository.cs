using DataAccess.Entities;
using DataAccess.Types;

namespace DataAccess.Repository.Abstractions;

public interface IPetSittingListingRepository
{
	Task<PetSittingListings?> GetByIdAsync(int id);
	Task<List<PetSittingListings>> GetAllAsync();
	Task CreateAsync(PetSittingListings listing);
	Task DeleteAsync(int id);
	Task UpdateStatusAsync(int id, RequestStatus newStatus);
}
