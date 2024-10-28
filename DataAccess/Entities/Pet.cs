using DataAccess.Types;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class Pet
{
	[Key]
	public int Id { get; set; }

	[Required]
	[StringLength(100)]
	public required string Name { get; set; }

	[Required]
	public Gender Gender { get; set; }  // True for male, False for female

	[Required]
	public int SpecieId { get; set; }

	[StringLength(100)]
	public string? Breed { get; set; }

	public byte[]? ProfileImage { get; set; }

	[Range(0, int.MaxValue)]
	public int Weight { get; set; }
	public DateOnly Birthday { get; set; }
	public required User Owner { get; set; }
}
