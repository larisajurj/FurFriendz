using DataAccess.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Entities;

public class Breed
{
    [Required]
    public int Id { get; set; }

    [Required]
    public AnimalSpecie Specie { get; set; }
    [Required, StringLength(100)]
    public string Name { get; set; }
}
