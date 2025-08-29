using Tasks.Models;

namespace Tasks.DTO
{
    public class TaskRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Models.TaskStatus Status { get; set; }
        public int Priority { get; set; }
        public int AssigneeId { get; set; }
    }

    public class TaskUpdateRequest 
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Models.TaskStatus? Status { get; set; }
        public int? Priority { get; set; }
        public int? AssigneeId { get; set; }
    }
}
