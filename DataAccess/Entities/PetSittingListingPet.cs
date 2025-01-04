namespace DataAccess.Entities;

public class PetSittingListingPet
{
	public int PetSittingListingId { get; set; }
	public PetSittingListings PetSittingListings { get; set; } = null!;
	public int PetId { get; set; }
	public Pet Pet { get; set; } = null!;
}
