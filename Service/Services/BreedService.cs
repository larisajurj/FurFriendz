using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using DataAccess.Types;
using Service.Services.Abstractions;

namespace Service.Services;

public class BreedService : IBreedService
{
	private readonly IBreedRepository breedRepository;

	public BreedService(IBreedRepository breedRepository)
	{
		this.breedRepository = breedRepository;
	}

	public async Task<Breed?> GetBreedByIdAsync(int id)
	{
		return await breedRepository.FindByIdAsync(id);
	}

	public async Task<IEnumerable<Breed>> GetBreedBySpecieAsync(AnimalSpecie specie)
	{
		return await breedRepository.GetByAnimalSpeciesAsync(specie);
	}
}
