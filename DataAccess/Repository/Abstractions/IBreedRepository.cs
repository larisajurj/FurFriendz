using DataAccess.Entities;
using DataAccess.Types;

namespace DataAccess.Repository.Abstractions;

public interface IBreedRepository
{
	Task<Breed?> FindByIdAsync(int id);
	Task<IEnumerable<Breed>> GetByAnimalSpeciesAsync(AnimalSpecie specie);

}
