using DataAccess.Repository.Abstractions;
using Service.Models;

namespace Service.Services;

using AutoMapper;
using DataAccess.Entities;
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

	public async Task<UserDTO> UpdateUserAsync(UserDTO updatedUserModel)
	{
		var updatedUser = _mapper.Map<User>(updatedUserModel);
		var result = await _userRepository.UpdateAsync(updatedUser);
		return _mapper.Map<UserDTO>(result);
	}

	public async Task DeleteUserAsync(Guid id)
	{
		await _userRepository.DeleteAsync(id);
	}

	public Task<IEnumerable<UserDTO>> GetAllPetSittersAsync()
	{
		throw new NotImplementedException();
	}
}
