using DataAccess.Types;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class PetTag
{
    [Required]
    public int Id { get; set; }
    [Required]
    public TagName Tag { get; set; }
}
