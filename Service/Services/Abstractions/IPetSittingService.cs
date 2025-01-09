using DataAccess.Entities;
using DataAccess.Types;
using Service.Models;

namespace Service.Services.Abstractions;

public interface IPetSittingService
{
	Task<int> CreateRequestAsync(CreatePetListingDTO listing);
	Task<List<ListingDTO>> GetListingsForUser(Guid userId);
	Task<List<ListingDTO>> GetListingsFromPetSitter(Guid petSitterId);
	Task ChangeRequestStatusAsync(int id, RequestStatus newStatus);
	Task DeleteRequestAsync(int id);

}
