using AutoMapper;
using DataAccess.Entities;
using Service.Models;

namespace Service.Profiles;

public class PetProfile : Profile
{
	public PetProfile()
	{
		CreateMap<Pet, PetDTO>();
	}
}

