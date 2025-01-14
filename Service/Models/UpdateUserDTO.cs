using DataAccess.Entities;
using DataAccess.Types;
using System.ComponentModel.DataAnnotations;

namespace Service.Models;

public class UpdateUserDTO
{
	public string? LastName { get; set; }
	public string? FirstName { get; set; }
	public Gender? Gender { get; set; }
	public string? Telephone { get; set; }
	public byte[]? ProfileImage { get; set; }
	public string? Description { get; set; }
	public bool? IsVerified { get; set; }
	public Address? HomeAddress { get; set; }
}
