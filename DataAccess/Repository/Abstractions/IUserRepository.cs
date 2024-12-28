using DataAccess.Entities;

namespace DataAccess.Repository.Abstractions;

public interface IUserRepository
{
	Task<IEnumerable<User>> GetAllAsync();
	Task<User?> FindByIdAsync(Guid id);
	Task<User?> FindByEmailAsync(string email);
	Task<User> PostAsync(User entity);
	Task<User> UpdateAsync(User entity);
	Task DeleteAsync(Guid id);
}
