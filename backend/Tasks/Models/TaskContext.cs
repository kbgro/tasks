using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Tasks.Config;

namespace Tasks.Models
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public void Seed()
        {
            if (!Users.Any())
            {
                var admin = new User
                {
                    Email = "admin@example.com",
                    Password = "_Admin123",
                    Role = Roles.Admin,
                    Username = "admin"
                };

                var user = new User
                {
                    Email = "user@example.com",
                    Password = "_User123",
                    Role = Roles.User,
                    Username = "user",
                };

                user.Password = new PasswordHasher<User>().HashPassword(user, user.Password);
                admin.Password = new PasswordHasher<User>().HashPassword(admin, admin.Password);

                Users.AddRange(user, admin);
                SaveChanges();
            }

        }
    }
}
