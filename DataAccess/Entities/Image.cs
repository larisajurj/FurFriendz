using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;
public class Image
{
    [Key]
    public int ImageID { get; set; }

    [Required, Url]
    public string? Url { get; set; }

    public User? User { get; set; }
    public Pet? Pet { get; set; }
}
