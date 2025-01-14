using DataAccess.Types;

namespace Service.Models;

public class UpdatePetDTO
{
	public string? Name { get; set; }
	public Gender? Gender { get; set; }
	public AnimalSpecie? SpecieId { get; set; }
	public int? BreedId { get; set; }
	public byte[]? ProfileImage { get; set; }
	public int? Weight { get; set; }
	public DateTime? Birthday { get; set; }
}
