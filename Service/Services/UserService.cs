using DataAccess.Repository.Abstractions;
using Service.Models;

namespace Service.Services;

using AutoMapper;
using DataAccess.Entities;
using DataAccess.Types;
using Service.Services.Abstractions;
using Service.Types;

public class UserService : IUserService
{
	private readonly IUserRepository _userRepository;
	private readonly IMapper _mapper;

	public UserService(IUserRepository userRepository, IMapper mapper)
	{
		_userRepository = userRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
	{
		var users = await _userRepository.GetAllAsync();
		return _mapper.Map<IEnumerable<UserDTO>>(users);
	}

	public async Task<UserDTO?> GetUserByIdAsync(Guid id)
	{
		var user = await _userRepository.FindByIdAsync(id);
		return user == null ? null : _mapper.Map<UserDTO>(user);
	}
	public async Task<UserDTO?> GetUserByEmailAsync(string email)
	{
		var user = await _userRepository.FindByEmailAsync(email);
		return user == null ? null : _mapper.Map<UserDTO>(user);
	}

	public async Task<UserDTO> CreatePetOwnerUserAsync(CreateUserDto newUserModel)
	{
		newUserModel.Role = Types.UserRoleDTO.PetOwner;
		var newUser = _mapper.Map<User>(newUserModel);
		var createdUser = await _userRepository.PostAsync(newUser);
		return _mapper.Map<UserDTO>(createdUser);
	}
	public async Task<UserDTO> CreatePetSitterUserAsync(CreateUserDto newUserModel)
	{
		newUserModel.Role = Types.UserRoleDTO.PetSitter;
		var newUser = _mapper.Map<User>(newUserModel);
		var createdUser = await _userRepository.PostAsync(newUser);
		return _mapper.Map<UserDTO>(createdUser);
	}

	public async Task<UserDTO> UpdateUserAsync(User user, UpdateUserDTO updateUserDTO)
	{
		if (updateUserDTO.LastName != null)
		{
			user.LastName = updateUserDTO.LastName;
		}

		if (updateUserDTO.FirstName != null)
		{
			user.FirstName = updateUserDTO.FirstName;
		}

		if (updateUserDTO.Gender != null)
		{
			user.Gender = updateUserDTO.Gender ?? DataAccess.Types.Gender.Unspecified;
		}

		if (updateUserDTO.Telephone != null)
		{
			user.Telephone = updateUserDTO.Telephone;
		}

		if (updateUserDTO.ProfileImage != null)
		{
			user.ProfileImage = updateUserDTO.ProfileImage;
		}

		if (updateUserDTO.Description != null)
		{
			user.Description = updateUserDTO.Description;
		}

		if (updateUserDTO.IsVerified != null)
		{
			user.IsVerified = updateUserDTO.IsVerified;
		}

		if (updateUserDTO.HomeAddress != null)
		{
			user.HomeAddress = updateUserDTO.HomeAddress;
		}
		var result = await _userRepository.UpdateAsync(user);
		return _mapper.Map<UserDTO>(result);
	}

	public async Task DeleteUserAsync(Guid id)
	{
		await _userRepository.DeleteAsync(id);
	}

	public async Task<List<PetSitterDTO>> GetAllPetSittersAsync()
	{
		var users = await _userRepository.GetAllAsync();
		var petSitters = users
			.Where(u => u.Role == UserRole.PetSitter)
			.Select(u => new PetSitterDTO()
			{
				Id = u.Id,
				Username = u.Username,
				FirstName = u.FirstName,
				LastName = u.LastName,
				Telephone = u.Telephone,
				Email = u.Email,
				ImageID = u.ProfileImage,
				HomeAddress = new AddressDTO()
				{
					StreetName = u.HomeAddress.StreetName,
					BuildingNumber = u.HomeAddress.BuildingNumber,
					ApartmentNumber	= u.HomeAddress.ApartmentNumber,
					City = u.HomeAddress.City,
					Latitude = u.HomeAddress.Latitude,
					Longitude = u.HomeAddress.Longitude
				},
				Services = u.Services.Select(s => new ServiceDTO()
				{
					Id = s.Id,
					Name = s.Name,
					UserId = s.UserId,
					Price = s.Price,
					MaxNumberOfPets = s.MaxNumberOfPets,
					PersonalDescription = s.PersonalDescription,
					TypeOfPet = s.TypeOfPet
				}).ToList()
			})
			.ToList();
		return petSitters;

	}
}
