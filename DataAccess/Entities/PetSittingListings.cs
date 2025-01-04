using DataAccess.Types;

namespace DataAccess.Entities;

public class PetSittingListings
{
	public int Id { get; set; }
	public Guid RequestingUserId { get; set; }
	public User? RequestingUser { get; set; }
	public List<PetSittingListingPet> ListingPets { get; set; } = new List<PetSittingListingPet>();
	public DateOnly StartDate { get; set; }
	public DateOnly EndDate { get; set; }
	public DateOnly RequestDate { get; set; }
	public User? PetSitter { get; set; }
	public Guid PetSitterId { get; set; }
	public String? Details { get; set; }
	public RequestStatus Status { get; set; }
}
