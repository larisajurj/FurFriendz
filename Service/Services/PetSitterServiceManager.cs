using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using Service.Models;
using Service.Services.Abstractions;

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

	public async Task<PetSitterServices> GetServiceByIdAsync(int id)
	{
		return await _repository.GetByIdAsync(id);
	}

	public async Task AddServiceAsync(CreateServiceDTO service)
	{
		var petSitterService = _mapper.Map<PetSitterServices>(service);

		await _repository.AddAsync(petSitterService);
	}

	public async Task UpdateServiceAsync(PetSitterServices service)
	{
		await _repository.UpdateAsync(service);
	}

	public async Task DeleteServiceAsync(int id)
	{
		await _repository.DeleteAsync(id);
	}

	public async Task<IEnumerable<PetSitterServices>> GetServicesByUserIdAsync(Guid userId)
	{
		return await _repository.GetByUserIdAsync(userId);
	}
}
