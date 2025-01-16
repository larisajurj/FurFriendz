using DataAccess.Types;

namespace Service.Models;

public class UpdateServiceDTO
{
	public int? Price { get; set; }
	public int? MaxNumberOfPets { get; set; }
	public string? PersonalDescription { get; set; }
	public AnimalSpecie? TypeOfPet { get; set; }
}
