using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repository;
using DataAccess.Repository.Abstractions;
using Service.Models;
using Service.Services.Abstractions;

namespace Service.Profiles;

public class UserResolver : IValueResolver<PetDTO, Pet, User?>
{
	private readonly IUserRepository _userRepository;

	public UserResolver(IUserRepository userRepository)
	{
		_userRepository = userRepository;
	}

	public User? Resolve(PetDTO source, Pet destination, User? destMember, ResolutionContext context)
	{
		if (source.OwnerId == null)
			return null;

		// Fetch the breed from the database
		return _userRepository.FindByIdAsync(source.OwnerId).GetAwaiter().GetResult();
	}
}
