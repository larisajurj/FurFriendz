using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using DataAccess.Types;
using Service.Services.Abstractions;

namespace Service.Services;

public class PetSittingService : IPetSittingService
{
	private readonly IPetSittingListingRepository _repository;

	public PetSittingService(IPetSittingListingRepository repository)
	{
		_repository = repository;
	}

	public async Task CreateRequestAsync(PetSittingListings listing)
	{
		listing.RequestDate = DateOnly.FromDateTime(DateTime.Today); 
		listing.Status = RequestStatus.Pending;
		await _repository.CreateAsync(listing);
	}

	public async Task ChangeRequestStatusAsync(int id, RequestStatus newStatus)
	{
		await _repository.UpdateStatusAsync(id, newStatus);
	}

	public async Task DeleteRequestAsync(int id)
	{
		await _repository.DeleteAsync(id);
	}
}
