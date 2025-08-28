using Tasks.Models;

namespace Tasks.Contracts
{
    public interface IAuthService
    {
        public string GetToken(User user);
    }
}
