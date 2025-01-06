using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using DataAccess.Types;
using Microsoft.EntityFrameworkCore;
using Service.Models;
using Service.Services.Abstractions;

namespace Service.Services;

public class PetSittingService : IPetSittingService
{
	private readonly IPetSittingListingRepository _repository;
	private readonly IUserRepository _userRepository;
	private readonly IPetRepository _petRepository;
	private readonly IPetSitterServicesRepository _servicesRepository;


	public PetSittingService(IPetSittingListingRepository repository, IUserRepository userRepository, IPetRepository petRepository, IPetSitterServicesRepository servicesRepository)
	{
		_repository = repository;
		_userRepository = userRepository;
		_petRepository = petRepository;
		_servicesRepository = servicesRepository;
	}

	public async Task ChangeRequestStatusAsync(int id, RequestStatus newStatus)
	{
		await _repository.UpdateStatusAsync(id, newStatus);
	}

	public async Task DeleteRequestAsync(int id)
	{
		await _repository.DeleteAsync(id);
	}

	public async Task CreateRequestAsync(CreatePetListingDTO createListingDto)
	{
		var requestingUser = await _userRepository.FindByIdAsync(createListingDto.RequestingUserId);
		var pets = new List<Pet>();
		foreach (var petId in createListingDto.Pets) { 
			var pet = await _petRepository.FindByIdAsync(petId);
			if (pet != null)
			{
				pets.Add(pet);
			}
		}
		var service = await _servicesRepository.GetByIdAsync(createListingDto.ServiceId);

		PetSittingListings listing = new PetSittingListings()
		{
			RequestingUserId = createListingDto.RequestingUserId,
			RequestingUser = requestingUser,
			ListingPets = pets,
			StartDate = createListingDto.StartDate,
			EndDate = createListingDto.EndDate,
			RequestDate = DateOnly.FromDateTime(DateTime.Today),
			Status = RequestStatus.Pending,
			ServiceId = createListingDto.ServiceId,
			Service = service
		};
		await _repository.CreateAsync(listing);
	}

}
