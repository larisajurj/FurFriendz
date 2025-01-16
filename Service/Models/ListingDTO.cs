using DataAccess.Types;

namespace Service.Models;

public class ListingDTO
{
	public int Id { get; set; }
	public Guid RequestingUserId { get; set; }
	public List<PetDTO> Pets { get; set; } = new();
	public DateOnly StartDate { get; set; }
	public DateOnly EndDate { get; set; }
	public String? Details { get; set; }
	public int ServiceId { get; set; }
	public RequestStatus Status { get; set; }

}
