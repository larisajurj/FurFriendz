
using DataAccess.Entities;
using DataAccess.Types;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Abstractions;

namespace FurFriendzAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BreedController : ControllerBase
{
	private readonly IBreedService _breedService;

	public BreedController(IBreedService breedService)
	{
		_breedService = breedService;
	}

	// GET: api/Breed/{id}
	[HttpGet("{id}")]
	public async Task<ActionResult<Breed>> GetBreedByIdAsync(int id)
	{
		var breed = await _breedService.GetBreedByIdAsync(id);

		if (breed == null)
		{
			return NotFound(); // Return 404 if breed not found
		}

		return Ok(breed); // Return 200 OK with breed data
	}

	// GET: api/Breed/species/{specie}
	[HttpGet("species/{specie}")]
	public async Task<ActionResult<IEnumerable<Breed>>> GetBreedBySpecieAsync(AnimalSpecie specie)
	{
		var breeds = await _breedService.GetBreedBySpecieAsync(specie);

		if (breeds == null || breeds.ToList().Count == 0)
		{
			return NotFound(); // Return 404 if no breeds found for specie
		}

		return Ok(breeds); // Return 200 OK with the list of breeds
	}
}
