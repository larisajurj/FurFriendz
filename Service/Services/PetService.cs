using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repository;
using DataAccess.Repository.Abstractions;
using Service.Models;
using Service.Services.Abstractions;
using System.Reflection.Metadata.Ecma335;

namespace Service.Services;

public class PetService : IPetService
{
	private readonly IPetRepository _petRepository;
	private readonly IBreedRepository _breedRepository;
	private readonly IMapper _mapper;

	public PetService(IPetRepository petRepository, IMapper mapper, IBreedRepository breedRepository)
	{
		_petRepository = petRepository;
		_mapper = mapper;
		_breedRepository = breedRepository;
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

	public async Task<PetDTO> UpdatePetAsync(int petId, UpdatePetDTO updatedPetModel)
	{
		var pet = await _petRepository.FindByIdAsync(petId);
		if (pet == null)
			return new PetDTO() { Name = "NotFound"};

		if(updatedPetModel.Name != null)
			pet.Name = updatedPetModel.Name;

		if (updatedPetModel.Gender != null)
			pet.Gender = updatedPetModel.Gender ?? DataAccess.Types.Gender.Unspecified;
		
		if (updatedPetModel.SpecieId != null)
			pet.Specie = updatedPetModel.SpecieId ?? DataAccess.Types.AnimalSpecie.Any;
		
		if(updatedPetModel.BreedId != null)
		{
			var breed = await _breedRepository.FindByIdAsync(updatedPetModel.BreedId ?? 0);
			if(breed != null)
				pet.Breed = breed;
		}

		if (updatedPetModel.ProfileImage != null)
			pet.ProfileImage = updatedPetModel.ProfileImage;

		if(updatedPetModel.Birthday != null)
			pet.Birthday = updatedPetModel.Birthday;

		if(updatedPetModel.Weight != null)
			pet.Weight = updatedPetModel.Weight ?? 0;

		var result = await _petRepository.UpdateAsync(pet);
		return _mapper.Map<PetDTO>(result);
	}
}
