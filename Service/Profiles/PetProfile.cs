using AutoMapper;
using DataAccess.Entities;
using Service.Models;

namespace Service.Profiles;

public class PetProfile : Profile
{
	protected PetProfile()
	{
		CreateMap<Pet, PetDTO>();
	}
}

