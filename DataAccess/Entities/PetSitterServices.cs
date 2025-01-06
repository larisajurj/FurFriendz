
using DataAccess.Types;

namespace DataAccess.Entities;

public class PetSitterServices
{
	public int Id { get; set; }
	public Guid UserId { get; set; }
	public User User { get; set; }
	public PetSittingServicesEnum Name { get; set; }
	public int Price { get; set; }
	public int? MaxNumberOfPets { get; set; }
	public string? PersonalDescription { get; set; }
	public AnimalSpecie TypeOfPet { get; set; }

}
