using Tasks.DTO;
using Tasks.Models;

namespace Tasks.Contracts
{
    public interface ITaskService
    {
        Task<TaskEntity> Add(TaskRequest task, int creatorId);
        Task<TaskResponse?> Get(int id);
        Task<TaskEntity?> Update(TaskUpdateRequest task);
        Task<TaskEntity?> Remove(int id);
        Task<bool> Exists(int id);

        Task<List<TaskEntity>> Listing(Models.TaskStatus? status, int? assignee);
    }
}
