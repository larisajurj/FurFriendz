using DataAccess.Entities;
using DataAccess.Types;
using Service.Models;

namespace Service.Services.Abstractions;

public interface IPetSittingService
{
	Task CreateRequestAsync(CreatePetListingDTO listing);
	Task ChangeRequestStatusAsync(int id, RequestStatus newStatus);
	Task DeleteRequestAsync(int id);
}
