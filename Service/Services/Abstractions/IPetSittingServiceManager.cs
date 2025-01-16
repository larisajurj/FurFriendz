using DataAccess.Entities;
using DataAccess.Types;
using Service.Models;

namespace Service.Services.Abstractions;

public interface IPetSittingServiceManager
{
	Task<ServiceDTO> GetServiceByIdAsync(int id);
	Task AddServiceAsync(CreateServiceDTO service);
	Task UpdateServiceAsync(UpdateServiceDTO service, int serviceId);
	Task DeleteServiceAsync(int id);
	Task<IEnumerable<ServiceDTO>> GetServicesByUserIdAsync(Guid userId);

}
