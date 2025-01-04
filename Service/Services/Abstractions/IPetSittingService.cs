using DataAccess.Entities;
using DataAccess.Types;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Service.Services.Abstractions;

public interface IPetSittingService
{
	Task CreateRequestAsync(PetSittingListings listing);
	Task ChangeRequestStatusAsync(int id, RequestStatus newStatus);
	Task DeleteRequestAsync(int id);
}
