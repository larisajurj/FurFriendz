using DataAccess.Entities;
using DataAccess.Types;
using Microsoft.AspNetCore.Mvc;
using Service.Models;
using Service.Services.Abstractions;
using Swashbuckle.AspNetCore.Annotations;

namespace FurFriendzAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PetSittingServiceController : ControllerBase
{
	private readonly IPetSittingServiceManager _serviceManager;
	private readonly IPetSittingService _service;

	public PetSittingServiceController(IPetSittingServiceManager serviceManager, IPetSittingService service)
	{
		_serviceManager = serviceManager;
		_service = service;

	}

	// GET: api/PetSitterServices/{id}
	[HttpGet("{id}")]
	public async Task<IActionResult> GetServiceById(int id)
	{
		var service = await _serviceManager.GetServiceByIdAsync(id);
		if (service == null)
		{
			return NotFound();
		}
		return Ok(service);
	}

	// POST: api/PetSitterServices
	[HttpPost]
	public async Task<IActionResult> AddService([FromBody] CreateServiceDTO service)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		await _serviceManager.AddServiceAsync(service);
		return CreatedAtAction(nameof(GetServiceById), new { id = service.UserId }, service);
	}

	// PUT: api/PetSitterServices/{id}
	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateService(int id, [FromBody] PetSitterServices service)
	{
		if (id != service.Id)
		{
			return BadRequest("ID in the route and request body do not match.");
		}

		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var existingService = await _serviceManager.GetServiceByIdAsync(id);
		if (existingService == null)
		{
			return NotFound();
		}

		await _serviceManager.UpdateServiceAsync(service);
		return NoContent();
	}

	// DELETE: api/PetSitterServices/{id}
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteService(int id)
	{
		var existingService = await _serviceManager.GetServiceByIdAsync(id);
		if (existingService == null)
		{
			return NotFound();
		}

		await _serviceManager.DeleteServiceAsync(id);
		return NoContent();
	}

	// GET: api/PetSitterServices/user/{userId}
	[HttpGet("user/{userId}")]
	public async Task<IActionResult> GetServicesByUserId(Guid userId)
	{
		var services = await _serviceManager.GetServicesByUserIdAsync(userId);
		return Ok(services);
	}


	[SwaggerOperation(Summary = "Create a new reques for petSitting")]
	[HttpPost("request")]
	public async Task<IActionResult> CreateRequest([FromBody] CreatePetListingDTO listing)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		await _service.CreateRequestAsync(listing);
		return Created("Request created successfully", null);
	}

	// PATCH: api/PetSittingRequests/{id}/status
	[HttpPatch("request/{id}/status")]
	public async Task<IActionResult> ChangeRequestStatus(int id, [FromBody] RequestStatus newStatus)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		await _service.ChangeRequestStatusAsync(id, newStatus);
		return NoContent();
	}

	// DELETE: api/PetSittingRequests/{id}
	[HttpDelete("request/{id}")]
	public async Task<IActionResult> DeleteRequest(int id)
	{
		await _service.DeleteRequestAsync(id);
		return NoContent();
	}
}