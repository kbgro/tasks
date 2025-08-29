using Tasks.DTO;
using Tasks.Models;

namespace Tasks.Contracts
{
    public interface IUserService
    {
        Task<User> AddUser(RegisterRequest register);
        Task<User?> GetUser(string email);
        Task<List<UserResponse>> Listing();
        bool VerifyUserPassword(User user, string password);
    }
}
