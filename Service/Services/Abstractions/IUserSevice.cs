using Service.Models;

namespace Service.Services.Abstractions;

public interface IUserService
{
	Task<IEnumerable<UserDTO>> GetAllUsersAsync();
	Task<UserDTO?> GetUserByIdAsync(Guid id);
	Task<UserDTO> CreateUserAsync(UserDTO newUserModel);
	Task<UserDTO> UpdateUserAsync(UserDTO updatedUserModel);
	Task DeleteUserAsync(Guid id);
}