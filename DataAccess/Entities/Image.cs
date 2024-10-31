using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Entities;
public class Image
{
    [Key]
    public int ImageID { get; set; }

    public Guid? UserID { get; set; }
    public int? PetID { get; set; }

    [Required, Url]
    public string? Url { get; set; }

    public User? User { get; set; }
    public Pet? Pet { get; set; }
}
