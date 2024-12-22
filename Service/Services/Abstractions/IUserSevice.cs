﻿using Service.Models;

namespace Service.Services.Abstractions;

public interface IUserService
{
	Task<IEnumerable<UserDTO>> GetAllUsersAsync();
	Task<UserDTO?> GetUserByIdAsync(Guid id);
	Task<UserDTO> UpdateUserAsync(UserDTO updatedUserModel);
	Task<UserDTO> CreatePetOwnerUserAsync(CreateUserDto newUserModel);
	Task<UserDTO> CreatePetSitterUserAsync(CreateUserDto newUserModel);
	Task DeleteUserAsync(Guid id);
}