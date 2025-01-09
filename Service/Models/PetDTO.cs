using DataAccess.Entities;
using DataAccess.Types;
using System.ComponentModel.DataAnnotations;

namespace Service.Models;

public class PetDTO
{
	public int? Id { get; set; }
	public required string Name { get; set; }
	public Gender Gender { get; set; }
	public AnimalSpecie SpecieId { get; set; }
	public int? BreedId { get; set; }
	public byte[]? ProfileImage { get; set; }
	public int Weight { get; set; }
	public DateTime Birthday { get; set; }
	public Guid OwnerId { get; set; }
}
