using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using DataAccess.Types;
using Service.Models;
using Service.Services.Abstractions;
using System.Diagnostics;

namespace Service.Services;

public class PetSitterServiceManager : IPetSittingServiceManager
{
	private readonly IPetSitterServicesRepository _repository;
	private readonly IMapper _mapper;

	public PetSitterServiceManager(IPetSitterServicesRepository repository, IMapper mapper)
	{
		_repository = repository;
		_mapper = mapper;
	}

	public async Task<ServiceDTO> GetServiceByIdAsync(int id)
	{
		var service = await _repository.GetByIdAsync(id);
		return new ServiceDTO()
		{
			Id = service.Id,
			UserId = service.UserId,
			Name = service.Name,
			Price = service.Price,
			MaxNumberOfPets = service.MaxNumberOfPets,
			PersonalDescription = service.PersonalDescription,
			TypeOfPet = service.TypeOfPet
		};
	}

	public async Task AddServiceAsync(CreateServiceDTO service)
	{
		var petSitterService = _mapper.Map<PetSitterServices>(service);

		await _repository.AddAsync(petSitterService);
	}

	public async Task UpdateServiceAsync(UpdateServiceDTO service, int serviceId)
	{
		var s = await _repository.GetByIdAsync(serviceId);
		if (service.TypeOfPet != null) { 
			s.TypeOfPet = service.TypeOfPet ?? AnimalSpecie.Any;
		}
		if (service.Price != null)
		{
			s.Price = service.Price ?? 0;
		}
		if (service.MaxNumberOfPets != null)
		{
			s.MaxNumberOfPets = service.MaxNumberOfPets ?? 0;
		}
		if (service.PersonalDescription != null)
		{
			s.PersonalDescription = service.PersonalDescription ?? "";
		}

		await _repository.UpdateAsync(s);
	}

	public async Task DeleteServiceAsync(int id)
	{
		await _repository.DeleteAsync(id);
	}

	public async Task<IEnumerable<ServiceDTO>> GetServicesByUserIdAsync(Guid userId)
	{
		var services = await _repository.GetByUserIdAsync(userId);
		return services.Select(service => new ServiceDTO()
		{
			Id = service.Id,
			UserId = service.UserId,
			Name = service.Name,
			Price = service.Price,
			MaxNumberOfPets = service.MaxNumberOfPets,
			PersonalDescription = service.PersonalDescription,
			TypeOfPet = service.TypeOfPet
		}).ToList();
	}

}
