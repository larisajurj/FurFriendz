using Service.Models;

namespace Service.Services.Abstractions;

public interface IPetService
{
	Task<PetDTO?> GetPetByIdAsync(int id);
	Task<IEnumerable<PetDTO>> GetPetsByUserId(Guid userId);
	Task<PetDTO> CreatePetAsync(PetDTO newPetModel);
	Task<PetDTO> UpdatePetAsync(PetDTO updatedPetModel);
	Task DeleteUserAsync(int id);
}
