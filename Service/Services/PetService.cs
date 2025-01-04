using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repository;
using DataAccess.Repository.Abstractions;
using Service.Models;
using Service.Services.Abstractions;

namespace Service.Services;

public class PetService : IPetService
{
	private readonly IPetRepository _petRepository;
	private readonly IMapper _mapper;

	public PetService(IPetRepository petRepository, IMapper mapper)
	{
		_petRepository = petRepository;
		_mapper = mapper;
	}

	public async Task<PetDTO> CreatePetAsync(PetDTO newPetModel)
	{
		var newPet = _mapper.Map<Pet>(newPetModel);
		var createdPet = await _petRepository.PostAsync(newPet);
		return _mapper.Map<PetDTO>(createdPet);
	}

	public async Task DeleteUserAsync(int id)
	{
		await _petRepository.DeleteAsync(id);
	}

	public async Task<PetDTO?> GetPetByIdAsync(int id)
	{
		var pet = await _petRepository.FindByIdAsync(id);
		return pet == null ? null : _mapper.Map<PetDTO>(pet);
	}

	public async Task<IEnumerable<PetDTO>> GetPetsByUserId(Guid userId)
	{
		var pets = await _petRepository.GetAllAsync();
		var userPets = pets.Where(p => p.OwnerId == userId);
		return _mapper.Map<IEnumerable<PetDTO>>(userPets);
	}

	public async Task<PetDTO> UpdatePetAsync(PetDTO updatedPetModel)
	{
		var updatedPet = _mapper.Map<Pet>(updatedPetModel);
		var result = await _petRepository.UpdateAsync(updatedPet);
		return _mapper.Map<PetDTO>(result);
	}
}
