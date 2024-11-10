using DataAccess.Entities;
using DataAccess.Types;
using System.ComponentModel.DataAnnotations;

namespace Service.Models;

public class PetDTO
{
	public int Id { get; set; }
	public required string Name { get; set; }
	public Gender Gender { get; set; }
	public int SpecieId { get; set; }
	public string? Breed { get; set; }
	public byte[]? ProfileImage { get; set; }
	public int Weight { get; set; }
	public DateOnly Birthday { get; set; }
}
