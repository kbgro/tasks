using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Tasks.Config;
using Tasks.Contracts;
using Tasks.DTO;
using Tasks.Models;

namespace Tasks.Services
{
    public class UserService : IUserService
    {
        private readonly TaskContext _db;
        private readonly PasswordHasher<User> _hasher = new PasswordHasher<User>();

        public UserService(TaskContext db)
        {
            _db = db;
        }

        public bool VerifyUserPassword(User user, string password)
        {
            return _hasher.VerifyHashedPassword(user, user.Password, password) == PasswordVerificationResult.Success;

        }

        public async Task<User> AddUser(RegisterRequest register)
        {
            var user = new User()
            {
                Email = register.Email,
                Username = register.Username,
                Role = Roles.User,
                CreatedAt = DateTime.Now,
            };

            user.Password = new PasswordHasher<User>().HashPassword(user, register.Password);

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            return user;
        }

        public async Task<User?> GetUser(string email)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;

        }

        public async Task<List<UserResponse>> Listing()
        {
            return await _db.Users.Select(u => new UserResponse { ID = u.ID, Username = u.Username }).ToListAsync();
        }

    }
}
