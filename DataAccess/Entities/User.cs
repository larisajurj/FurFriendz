using DataAccess.Types;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class User
{
	[Key]
	public Guid Id { get; set; }

	[Required]
	[StringLength(100)]
	public required string LastName { get; set; }

	[Required]
	[StringLength(100)]
	public required string FirstName { get; set; }
	[Required]
	public Gender Gender { get; set; }

	[Required]
	[StringLength(100)]
	public required string Username { get; set; }

	[Phone]
	[StringLength(15)]
	public string? Telephone { get; set; }

	[EmailAddress]
	[StringLength(100)]
	public string? Email { get; set; }

	[Required]
	public UserRole Role { get; set; }

	public Guid? ImageID { get; set; }

	public List<Pet>? Pets { get; set; }

	public Image? ProfileImage { get; set; }
}
