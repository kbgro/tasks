using Microsoft.EntityFrameworkCore;
using Tasks.Contracts;
using Tasks.DTO;
using Tasks.Models;

namespace Tasks.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskContext _db;

        public TaskService(TaskContext db)
        {
            _db = db;
        }

        public async Task<TaskEntity> Add(TaskRequest task, int creatorId)
        {
            var taskEntity = new TaskEntity()
            {
                Title = task.Title,
                Priority = task.Priority,
                creatorId = creatorId,
                AssigneeId = task.AssigneeId,
                Description = task.Description,
            };

            await _db.Tasks.AddAsync(taskEntity);
            await _db.SaveChangesAsync();

            return taskEntity;
        }

        public async Task<bool> Exists(int id)
        {
            var task = await _db.Tasks.FirstOrDefaultAsync(t => t.ID == id);
            return task != null;
        }

        public async Task<List<TaskEntity>> Listing(Models.TaskStatus? status, int? assignee)
        {
            var tasks = await _db.Tasks
                .Where(t => (status == null || t.Status == status) && (assignee == null || t.AssigneeId == assignee))
                .ToListAsync();

            return tasks;
        }

        public async Task<TaskEntity?> Remove(int id)
        {
            var task = await _db.Tasks.FirstOrDefaultAsync(t => t.ID == id);
            if (task == null) return null;

            _db.Tasks.Remove(task);
            await _db.SaveChangesAsync();
            return task;
        }

        public async Task<TaskEntity?> Update(TaskUpdateRequest task)
        {
            var taskEntity = await _db.Tasks.FirstOrDefaultAsync(t => t.ID == task.Id);
            if (taskEntity == null) return null;

            taskEntity.Status = task.Status ?? taskEntity.Status;
            taskEntity.Title = task.Title ?? taskEntity.Title;
            taskEntity.Priority = task.Priority ?? taskEntity.Priority;
            taskEntity.UpdatedAt = DateTime.Now;
            taskEntity.AssigneeId = task.AssigneeId ?? taskEntity.AssigneeId;
            taskEntity.Description = task.Description ?? taskEntity.Description;

            await _db.SaveChangesAsync();

            return taskEntity;
        }

    }
}
