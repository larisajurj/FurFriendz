using DataAccess.Entities;
using Service.Models;

namespace Service.Services.Abstractions;

public interface IPetSittingServiceManager
{
	Task<PetSitterServices> GetServiceByIdAsync(int id);
	Task AddServiceAsync(CreateServiceDTO service);
	Task UpdateServiceAsync(PetSitterServices service);
	Task DeleteServiceAsync(int id);
	Task<IEnumerable<PetSitterServices>> GetServicesByUserIdAsync(Guid userId);
}
