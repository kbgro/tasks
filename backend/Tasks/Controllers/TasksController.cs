using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tasks.Contracts;
using Tasks.DTO;

namespace Tasks.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService task)
        {
            _taskService = task;
        }

        [HttpGet(Name = "List Tasks")]
        public async Task<IActionResult> List(string? status, int? assignee)
        {
            Models.TaskStatus? status_ = null;

            if (!string.IsNullOrEmpty(status))
            {
                if (Enum.TryParse<Models.TaskStatus>(status, out var taskStatus))
                {
                    status_ = taskStatus;
                }
                else
                {
                    return BadRequest(new Dictionary<string, object>()
                    {
                        {"message", "invalid status" }
                    });
                }
            }

            var tasks = await _taskService.Listing(status_, assignee);

            return Ok(tasks);
        }

        [HttpPost(Name = "Add Task")]
        public async Task<IActionResult> Add([FromBody] TaskRequest taskRequest)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var taskEntity = await _taskService.Add(taskRequest, 1);

            return Ok(taskEntity);
        }

        [HttpGet("{id}", Name = "Get Task")]
        public async Task<IActionResult> Get(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var taskEntity = await _taskService.Get(id);
            if (taskEntity == null)
            {
                return BadRequest(new Dictionary<string, object>()
                {
                    {"message", "task not found." }
                });
            }

            return Ok(taskEntity);
        }

        [HttpPut("{id}", Name = "Update Task")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskUpdateRequest taskData)
        {
            taskData.Id = id;
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var taskExists = await _taskService.Exists(taskData.Id);
            if (!taskExists)
            {
                return BadRequest(new Dictionary<string, object>()
                {
                    {"message", "task not found." }
                });
            }

            taskData.Id = id;
            var taskEntity = await _taskService.Update(taskData);

            return Ok(taskEntity);
        }

        [HttpDelete("{id}", Name = "DeleteTask")]
        public async Task<IActionResult> Delete(int id)
        {
            var taskExists = await _taskService.Exists(id);
            if (taskExists)
            {
                await _taskService.Remove(id);
            }

            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
