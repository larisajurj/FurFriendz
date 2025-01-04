using DataAccess.Entities;
using DataAccess.Repository.Abstractions;
using DataAccess.Types;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class BreedRepository : IBreedRepository
{
	protected readonly FurFriendzContext _context;

	public BreedRepository(FurFriendzContext context)
	{
		_context = context;
	}

	public async Task<Breed?> FindByIdAsync(int id)
	{
		try
		{
			return await _context.Set<Breed>().FindAsync(id);
		}
		catch (Exception ex)
		{
			throw new Exception($"Error when retrieving entity by id {id}, {ex.Message}", ex);
		}
	}

	public async Task<IEnumerable<Breed>> GetByAnimalSpeciesAsync(AnimalSpecie specie)
	{
		var allBreeds = await _context.Breeds
		  .ToListAsync();
		var breedsWithSpecie = new List<Breed>();
		foreach (var breed in allBreeds)
		{
			if (breed.Specie.Equals(specie))
				breedsWithSpecie.Add(breed);
		}

		return breedsWithSpecie;
	}

}
