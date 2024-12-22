using Service.Types;

namespace Service.Models;

public class CreateUserDto
{
	public required string LastName { get; set; }
	public required string FirstName { get; set; }
	public required string Username { get; set; }
	public string? Telephone { get; set; }
	public string? Email { get; set; }
	public UserRole Role { get; set; }
	public byte[]? ImageID { get; set; }
}
