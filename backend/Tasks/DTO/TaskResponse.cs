using Tasks.Models;

namespace Tasks.DTO
{
    public class TaskResponse
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Models.TaskStatus Status { get; set; } 
        public int Priority { get; set; }
        public int AssigneeId { get; set; }
        public UserResponse Assignee { get; set; }
        public int CreatorId { get; set; }
        public UserResponse Creator { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }
    }
}
