using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Types;

namespace DataAccess.Entities;

public class PetSitterTags
{
    [Required]
    public int Id { get; set; }

    [Required]
    public TagName Tag { get; set; }
}
