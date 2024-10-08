package sharpBubbles.taskTracker.service;

import sharpBubbles.taskTracker.model.Task;

import java.util.List;

public interface TaskService {

    List<Task> getAllTasks(Long owner);

    List<Task> getCompletedTasks(Long owner);

    List<Task> getTasksOnTheDay(Long owner);

    List<Task> getTasksOnOtherDays(Long owner);

    List<Task> getTasksIncomplete(Long owner);

    List<Task> getInProgressTasksWithoutDatePlannedImplementation(Long owner);

    Task createTask(Task task);

    void deleteTask(Long taskId);

    Task changeTask(Task task);

    Task findTaskByTaskId(Long id);

}
