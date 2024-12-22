using Microsoft.AspNetCore.Mvc;
using Service.Models;
using Service.Services.Abstractions;

namespace FurFriendzAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
	private readonly IUserService _userService;

	public UsersController(IUserService userService)
	{
		_userService = userService;
	}

	[HttpGet]
	public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
	{
		var users = await _userService.GetAllUsersAsync();
		return Ok(users);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<UserDTO>> GetUserById(Guid id)
	{
		var user = await _userService.GetUserByIdAsync(id);
		if (user == null)
		{
			return NotFound();
		}
		return Ok(user);
	}

	[HttpPost("CreatePetOwner")]
	public async Task<ActionResult<UserDTO>> CreatePetOwnerUser(CreateUserDto newUserModel)
	{
		if (newUserModel == null)
		{
			return BadRequest("User data cannot be null.");
		}

		var createdUser = await _userService.CreatePetOwnerUserAsync(newUserModel);
		return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
	}
	[HttpPost("CreatePetSitter")]
	public async Task<ActionResult<UserDTO>> CreatePetSitterUser(CreateUserDto newUserModel)
	{
		if (newUserModel == null)
		{
			return BadRequest("User data cannot be null.");
		}

		var createdUser = await _userService.CreatePetSitterUserAsync(newUserModel);
		return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
	}

	[HttpPut("{id}")]
	public async Task<ActionResult<UserDTO>> UpdateUser(Guid id, UserDTO updatedUserModel)
	{
		if (updatedUserModel == null || id != updatedUserModel.Id)
		{
			return BadRequest("User ID mismatch.");
		}

		var existingUser = await _userService.GetUserByIdAsync(id);
		if (existingUser == null)
		{
			return NotFound();
		}

		var updatedUser = await _userService.UpdateUserAsync(updatedUserModel);
		return Ok(updatedUser);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteUser(Guid id)
	{
		var existingUser = await _userService.GetUserByIdAsync(id);
		if (existingUser == null)
		{
			return NotFound();
		}

		await _userService.DeleteUserAsync(id);
		return NoContent();
	}
}
