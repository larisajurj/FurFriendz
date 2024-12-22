using DataAccess.Entities;

namespace Service.Services.Abstractions;

public interface IBreedService
{
	Task<Breed?> GetBreedByIdAsync(int id);
}
