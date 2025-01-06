using DataAccess.Types;

namespace Service.Models;

public class CreateServiceDTO
{
	public Guid UserId { get; set; }
	public PetSittingServicesEnum Name { get; set; }
	public int Price { get; set; }
	public int? MaxNumberOfPets { get; set; }
	public string? PersonalDescription { get; set; }
	public AnimalSpecie TypeOfPet { get; set; }

}
