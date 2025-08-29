using Microsoft.EntityFrameworkCore;

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
    }
}
