﻿using DataAccess.Entities;
using Service.Models;

namespace Service.Services.Abstractions;

public interface IUserService
{
	Task<IEnumerable<UserDTO>> GetAllUsersAsync();
	Task<List<PetSitterDTO>> GetAllPetSittersAsync();
	Task<UserDTO?> GetUserByIdAsync(Guid id);
	Task<UserDTO?> GetUserByEmailAsync(string email);
	Task<UserDTO> UpdateUserAsync(User user, UpdateUserDTO updatedUserModel);
	Task<UserDTO> CreatePetOwnerUserAsync(CreateUserDto newUserModel);
	Task<UserDTO> CreatePetSitterUserAsync(CreateUserDto newUserModel);
	Task DeleteUserAsync(Guid id);
}