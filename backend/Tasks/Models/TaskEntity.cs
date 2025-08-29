namespace Tasks.Models
{
    public enum TaskStatus
    {
        Done,
        InProgress,
        Todo
    }

    public class TaskEntity
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Todo;
        public int Priority { get; set; }
        public int AssigneeId { get; set; }
        public int creatorId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}
