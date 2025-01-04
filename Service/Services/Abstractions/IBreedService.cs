using DataAccess.Entities;
using DataAccess.Types;

namespace Service.Services.Abstractions;

public interface IBreedService
{
	Task<Breed?> GetBreedByIdAsync(int id);
	Task<IEnumerable<Breed>> GetBreedBySpecieAsync(AnimalSpecie specie);

}
