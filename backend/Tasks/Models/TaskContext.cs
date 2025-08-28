using Microsoft.EntityFrameworkCore;

namespace Tasks.Models
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
