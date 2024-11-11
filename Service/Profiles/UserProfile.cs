﻿namespace Service.Profiles;

using AutoMapper;
using DataAccess.Entities;
using Service.Models;

public class UserProfile : Profile
{
	public UserProfile()
	{
		CreateMap<User, UserDTO>();

		CreateMap<UserDTO, User>()
			.ForMember(dest => dest.Pets, opt => opt.Ignore()); // Ignore navigation properties if not needed
	}
}