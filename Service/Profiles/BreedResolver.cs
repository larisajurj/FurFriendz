namespace Service.Profiles;

using AutoMapper;
using DataAccess.Entities;
using Service.Models;
using Service.Services.Abstractions;

public class BreedResolver : IValueResolver<PetDTO, Pet, Breed?>
{
	private readonly IBreedService _breedService;

	public BreedResolver(IBreedService breedService)
	{
		_breedService = breedService;
	}

	public Breed? Resolve(PetDTO source, Pet destination, Breed? destMember, ResolutionContext context)
	{
		if (source.BreedId == null)
			return null;

		// Fetch the breed from the database
		return _breedService.GetBreedByIdAsync(source.BreedId ?? 0).GetAwaiter().GetResult();
	}
}

