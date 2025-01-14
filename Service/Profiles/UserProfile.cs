namespace Service.Profiles;

using AutoMapper;
using DataAccess.Entities;
using Service.Models;

public class UserProfile : Profile
{
	public UserProfile()
	{
		CreateMap<User, UserDTO>()
			.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
			.ForMember(dest => dest.ImageID, opt => opt.MapFrom(src => src.ProfileImage));
		CreateMap<UserDTO, User>()
			.ForMember(dest => dest.Pets, opt => opt.Ignore()) // Ignore navigation properties if not needed
			.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
			.ForMember(dest => dest.ProfileImage, opt => opt.MapFrom(src => src.ImageID));
		CreateMap<CreateUserDto, User>()
			.ForMember(dest => dest.Pets, opt => opt.Ignore())
			.ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
			.ForMember(dest => dest.ProfileImage, opt => opt.MapFrom(src => src.ImageID));
	}
}
