using AutoMapper;
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
	private readonly IMapper _mapper;

	public PetSittingService(IPetSittingListingRepository repository, IUserRepository userRepository, IPetRepository petRepository, IPetSitterServicesRepository servicesRepository, IMapper mapper)
	{
		_repository = repository;
		_userRepository = userRepository;
		_petRepository = petRepository;
		_servicesRepository = servicesRepository;
		_mapper = mapper;
	}

	public async Task ChangeRequestStatusAsync(int id, RequestStatus newStatus)
	{
		await _repository.UpdateStatusAsync(id, newStatus);
	}

	public async Task DeleteRequestAsync(int id)
	{
		await _repository.DeleteAsync(id);
	}

	public async Task<int> CreateRequestAsync(CreatePetListingDTO createListingDto)
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
			//RequestingUserId = createListingDto.RequestingUserId,
			RequestingUser = requestingUser,
			ListingPets = pets,
			StartDate = createListingDto.StartDate,
			EndDate = createListingDto.EndDate,
			RequestDate = DateOnly.FromDateTime(DateTime.Today),
			Status = RequestStatus.Pending,
			Service = service
		};
		return await _repository.CreateAsync(listing);
	}

	public async Task<List<ListingDTO>> GetListingsForUser(Guid userId)
	{
		var requestingUser = await _userRepository.FindByIdAsync(userId);
		var listings = requestingUser.RequestingListings.Select(listing => new ListingDTO
		{
			Id = listing.Id ?? 0,
			RequestingUserId = userId,
			Pets = _mapper.Map<List<PetDTO>>(requestingUser.Pets),
			StartDate = listing.StartDate,
			EndDate = listing.EndDate,
			Details = listing.Details,
			ServiceId = listing.Service.Id,
			Status = listing.Status
		}).ToList();
		return listings;
	}

	public async Task<List<ListingDTO>> GetListingsFromPetSitter(Guid petSitterId)
	{
		var listings = await _repository.GetAllAsync();
		var listingsDTO = listings.Where(l => l.Service.UserId == petSitterId).Select(listing => new ListingDTO
		{
			Id = listing.Id ?? 0,
			RequestingUserId = listing.RequestingUser.Id,
			Pets = _mapper.Map<List<PetDTO>>(listing.ListingPets),
			StartDate = listing.StartDate,
			EndDate = listing.EndDate,
			Details = listing.Details,
			ServiceId = listing.Service.Id,
			Status = listing.Status
		}).ToList();
		return listingsDTO;
	}


}
