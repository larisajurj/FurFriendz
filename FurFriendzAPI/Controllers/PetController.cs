using Microsoft.AspNetCore.Mvc;
using Service.Models;
using Service.Services;
using Service.Services.Abstractions;

namespace FurFriendzAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PetsController : ControllerBase
{
	private readonly IPetService _petService;
	private readonly IUserService _userService;

	public PetsController(IPetService petService, IUserService userService)
	{
		_petService = petService;
		_userService = userService;
	}

	// GET: api/pets/{id}
	[HttpGet("{id}")]
	public async Task<ActionResult<PetDTO>> GetPetById(int id)
	{
		var pet = await _petService.GetPetByIdAsync(id);
		if (pet == null)
		{
			return NotFound();
		}
		return Ok(pet);
	}

	// GET: api/pets/user/{userId}
	[HttpGet("user/{userId}")]
	public async Task<ActionResult<IEnumerable<PetDTO>>> GetPetsByUserId(Guid userId)
	{
		var pets = await _petService.GetPetsByUserId(userId);
		return Ok(pets);
	}

	// POST: api/pets
	[HttpPost]
	public async Task<ActionResult<PetDTO>> CreatePet(PetDTO newPetModel)
	{
		if (newPetModel == null)
		{
			return BadRequest("Pet data cannot be null.");
		}

		var user = await _userService.GetUserByIdAsync(newPetModel.OwnerId);
		if (user == null)
		{
			return NotFound("Owner is not a registered user");
		}

		var createdPet = await _petService.CreatePetAsync(newPetModel);
		return CreatedAtAction(nameof(GetPetById), new { id = createdPet.Id }, createdPet);
	}

	// PUT: api/pets/{id}
	[HttpPut("{id}")]
	public async Task<ActionResult<PetDTO>> UpdatePet(int id, UpdatePetDTO updatedPetModel)
	{

		var existingPet = await _petService.GetPetByIdAsync(id);
		if (existingPet == null)
		{
			return NotFound();
		}

		var updatedPet = await _petService.UpdatePetAsync(id, updatedPetModel);
		return Ok(updatedPet);
	}

	// DELETE: api/pets/{id}
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeletePet(int id)
	{
		var existingPet = await _petService.GetPetByIdAsync(id);
		if (existingPet == null)
		{
			return NotFound();
		}

		await _petService.DeleteUserAsync(id);
		return NoContent();
	}
}
