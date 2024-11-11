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
	public Gender Gender { get; set; }

	[Required]
	public AnimalSpecie Specie { get; set; }

	[StringLength(100)]
	public Breed? Breed { get; set; }

	public byte[]? ProfileImage { get; set; }

	[Range(0, int.MaxValue)]
	public int Weight { get; set; }
	public DateTime? Birthday { get; set; }
	public required User Owner { get; set; }

	public List<PetSitterTags>? Tags { get; set; }

	public List<Image> Images { get; set; } = new();
}
