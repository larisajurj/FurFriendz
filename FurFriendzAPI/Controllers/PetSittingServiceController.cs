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
	[SwaggerOperation(Summary = "Get service by serviceId")]
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
	[SwaggerOperation(Summary = "Add a new service")]
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
	[SwaggerOperation(Summary = "Not yet implemented")]

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
	[SwaggerOperation(Summary = "Test")]
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
	[SwaggerOperation(Summary = "Get all services of a user")]
	[HttpGet("user/{userId}")]
	public async Task<IActionResult> GetServicesByUserId(Guid userId)
	{
		var services = await _serviceManager.GetServicesByUserIdAsync(userId);
		return Ok(services);
	}


	[SwaggerOperation(Summary = "Create a new request for petSitting")]
	[HttpPost("request")]
	public async Task<IActionResult> CreateRequest([FromBody] CreatePetListingDTO listing)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		int res = await _service.CreateRequestAsync(listing);
		return Ok(res);
	}

	// PATCH: api/PetSittingRequests/{id}/status
	[SwaggerOperation(Summary = "Change Status of a listing")]
	[HttpPatch("request/{id}/status/{newStatus}")]
	public async Task<IActionResult> ChangeRequestStatus(int id, RequestStatus newStatus)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		await _service.ChangeRequestStatusAsync(id, newStatus);
		return NoContent();
	}

	[SwaggerOperation(Summary = "Get all listings of a requesting user")]
	[HttpGet("request/user/{id}")]
	public async Task<IActionResult> GetRequestsFromUser(Guid id)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var listings = await _service.GetListingsForUser(id);
		return Ok(listings);
	}

	[SwaggerOperation(Summary = "Get all listings of a petSitter user")]
	[HttpGet("request/petSitter/{id}")]
	public async Task<IActionResult> GetRequestsForPetSitter(Guid id)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var listings = await _service.GetListingsFromPetSitter(id);
		return Ok(listings);
	}


	// DELETE: api/PetSittingRequests/{id}
	[SwaggerOperation(Summary = "Delete a listing")]
	[HttpDelete("request/{id}")]
	public async Task<IActionResult> DeleteRequest(int id)
	{
		await _service.DeleteRequestAsync(id);
		return NoContent();
	}
}