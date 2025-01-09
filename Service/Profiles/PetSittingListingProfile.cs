using AutoMapper;
using DataAccess.Entities;
using Service.Models;

namespace Service.Profiles;

public class PetSittingListingProfile : Profile
{
	public PetSittingListingProfile()
	{
		CreateMap<CreatePetListingDTO, PetSittingListings>()
			.ForMember(dest => dest.RequestDate, opt => opt.Ignore()) // Ignore navigation properties if not needed
			.ForMember(dest => dest.Status, opt => opt.Ignore()); // Ignore navigation properties if not needed
		CreateMap<CreateServiceDTO, PetSitterServices>()
			.ForMember(dest => dest.User, opt => opt.Ignore());
	}
}
