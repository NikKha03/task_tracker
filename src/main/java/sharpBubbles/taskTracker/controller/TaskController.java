package sharpBubbles.taskTracker.controller;

import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import sharpBubbles.taskTracker.DTO.TaskRequest;
import sharpBubbles.taskTracker.model.Task;
import sharpBubbles.taskTracker.model.TaskBuilder;
import sharpBubbles.taskTracker.model.TaskStatus;
import sharpBubbles.taskTracker.service.TaskService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/taskServiceApi/{ownerId}")
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/allTasks")
    public List<Task> getAllTasks(@PathVariable("ownerId") Long ownerId) {
        return taskService.getAllTasks(ownerId);
    }

    @GetMapping("/allCompletedTasks")
    public List<Task> getCompletedTask(@PathVariable("ownerId") Long ownerId) {
        return taskService.getCompletedTasks(ownerId);
    }

    @GetMapping("/tasksOnTheDay")
    public List<Task> getTasksOnTheDay(@PathVariable("ownerId") Long ownerId) {
        return taskService.getTasksOnTheDay(ownerId);
    }

    @GetMapping("/tasksOnOtherDays")
    public List<Task> getTasksOnOtherDays(@PathVariable("ownerId") Long ownerId) {
        return taskService.getTasksOnOtherDays(ownerId);
    }

    @GetMapping("/tasksIncomplete")
    public List<Task> getTasksIncomplete(@PathVariable("ownerId") Long ownerId) {
        return taskService.getTasksIncomplete(ownerId);
    }

    @GetMapping("/allInProgressTasksWithoutDatePlannedImplementation")
    public List<Task> getInProgressTaskWithoutDatePlannedImplementation(@PathVariable("ownerId") Long ownerId) {
        return taskService.getInProgressTasksWithoutDatePlannedImplementation(ownerId);
    }

    @PostMapping("/createTask")
    public Task createTask(@PathVariable("ownerId") Long ownerId, @RequestBody TaskRequest request) {
        TaskBuilder taskBuilder = new TaskBuilder()
                .setHeader(request.getHeader())
                .setComment(request.getComment())
                .setOwner(ownerId)
                .setTaskStatus(TaskStatus.IN_PROGRESS)
                .setCreationDate();


        if (request.getPlannedImplDate() != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime dateTimeOfTask = LocalDateTime.parse(request.getPlannedImplDate(), formatter);
            taskBuilder.setPlannedImplDate(dateTimeOfTask);
        }

        return taskService.createTask(taskBuilder.build());
    }

    @Transactional
    @PutMapping("/changeTask/{taskId}")
    public Task changeTask(@PathVariable("ownerId") Long ownerId, @PathVariable("taskId") Long taskId, @RequestBody TaskRequest request) {
        Task task = taskService.findTaskByTaskId(taskId);

        TaskBuilder taskBuilder = new TaskBuilder(task)
                .setHeader(request.getHeader())
                .setComment(request.getComment())
                .setCreationDate();

        if (request.getPlannedImplDate() != null && request.getPlannedImplDate().length() >= 10) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime dateTimeOfTask = LocalDateTime.parse(request.getPlannedImplDate(), formatter);
            taskBuilder.setPlannedImplDate(dateTimeOfTask);
        } else {
            taskBuilder.setPlannedImplDate(null);
        }

        return taskService.changeTask(taskBuilder.build());
    }

    @Transactional
    @DeleteMapping("/deleteTask/{taskId}")
    public void deleteTask(@PathVariable("ownerId") Long ownerId, @PathVariable("taskId") Long taskId) {
        taskService.deleteTask(taskId);
    }

    @PutMapping("/changeTaskStatusOnCompleted/{taskId}")
    public Task changeTaskStatusOnCompleted(@PathVariable("ownerId") Long ownerId, @PathVariable("taskId") Long taskId) {
        Task task = taskService.findTaskByTaskId(taskId);

        task.setExecutionDate(LocalDateTime.now());
        task.setTaskStatus(TaskStatus.COMPLETED);

        return taskService.changeTask(task);
    }

    @PutMapping("/changeTaskStatusOnInProgress/{taskId}")
    public Task changeTaskStatusOnInProgress(@PathVariable("ownerId") Long ownerId, @PathVariable("taskId") Long taskId) {
        Task task = taskService.findTaskByTaskId(taskId);

        task.setExecutionDate(null);
        task.setTaskStatus(TaskStatus.IN_PROGRESS);

        return taskService.changeTask(task);
    }
}