using AutoMapper;
using DataAccess.Entities;
using Service.Models;

namespace Service.Profiles;

public class PetProfile : Profile
{
	public PetProfile()
	{
		CreateMap<Pet, PetDTO>()
		.ForMember(dest => dest.BreedId, opt => opt.MapFrom(dest => dest.Breed.Id));
		CreateMap<PetDTO, Pet>()
			.ForMember(dest => dest.Breed, opt => opt.MapFrom<BreedResolver>())
			.ForMember(dest => dest.Owner, opt => opt.Ignore()); // Ignore navigation properties if not needed

	}
}

