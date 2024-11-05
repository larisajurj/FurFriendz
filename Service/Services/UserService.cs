using DataAccess.Repository.Abstractions;
using Service.Models;
using Service.Services.Abstractions;

namespace Service.Services;

using AutoMapper;
using DataAccess.Entities;

public class UserService : IUserSevice 
{
	private readonly IUserRepository _userRepository;
	private readonly IMapper _mapper;

	public UserService(IUserRepository userRepository, IMapper mapper)
	{
		_userRepository = userRepository;
		_mapper = mapper;
	}

	// Get all users and map to UserModel
	public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
	{
		var users = await _userRepository.GetAllAsync();
		return _mapper.Map<IEnumerable<UserDTO>>(users);
	}

	// Find a user by Id and map to UserModel
	public async Task<UserDTO?> GetUserByIdAsync(Guid id)
	{
		var user = await _userRepository.FindByIdAsync(id);
		return user == null ? null : _mapper.Map<UserDTO>(user);
	}

	// Add a new user (map UserModel to User)
	public async Task<UserDTO> CreateUserAsync(UserDTO newUserModel)
	{
		var newUser = _mapper.Map<User>(newUserModel);
		var createdUser = await _userRepository.PostAsync(newUser);
		return _mapper.Map<UserDTO>(createdUser);
	}

	// Update an existing user
	public async Task<UserDTO> UpdateUserAsync(UserDTO updatedUserModel)
	{
		var updatedUser = _mapper.Map<User>(updatedUserModel);
		var result = await _userRepository.UpdateAsync(updatedUser);
		return _mapper.Map<UserDTO>(result);
	}

	// Delete a user by Id
	public async Task DeleteUserAsync(Guid id)
	{
		await _userRepository.DeleteAsync(id);
	}
}
