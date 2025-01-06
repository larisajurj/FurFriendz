using DataAccess.Types;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class PetSittingListings
{
	[Key]
	public int Id { get; set; }
	public Guid RequestingUserId { get; set; }
	public User? RequestingUser { get; set; }
	public List<Pet> ListingPets { get; set; } = new List<Pet>();
	public DateOnly StartDate { get; set; }
	public DateOnly EndDate { get; set; }
	public DateOnly RequestDate { get; set; }
	public String? Details { get; set; }
	public RequestStatus Status { get; set; }
	public int Price { get; set; }
	public int ServiceId { get; set; }
	public PetSitterServices Service { get; set; }
}
