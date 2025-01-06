using DataAccess.Entities;

namespace Service.Models;

public class CreatePetListingDTO
{	public Guid RequestingUserId { get; set; }
	public List<int> Pets { get; set; } = new List<int>();
	public DateOnly StartDate { get; set; }
	public DateOnly EndDate { get; set; }
	public String? Details { get; set; }
	public int ServiceId { get; set; }
}
