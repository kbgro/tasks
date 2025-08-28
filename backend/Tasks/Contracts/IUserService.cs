using Tasks.DTO;
using Tasks.Models;

namespace Tasks.Contracts
{
    public interface IUserService
    {
        Task<User> AddUser(RegisterRequest register);

        Task<User?> GetUser(string email);

        bool VerifyUserPassword(User user, string password);
    }
}
