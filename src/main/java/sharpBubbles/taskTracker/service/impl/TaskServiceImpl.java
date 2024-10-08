package sharpBubbles.taskTracker.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import sharpBubbles.taskTracker.model.Task;
import sharpBubbles.taskTracker.model.TaskStatus;
import sharpBubbles.taskTracker.repository.TaskRepository;
import sharpBubbles.taskTracker.service.TaskService;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;


@Service
@AllArgsConstructor
@Primary
public class TaskServiceImpl implements TaskService {
    private final TaskRepository repository;

    @Override
    public List<Task> getAllTasks(Long owner) {
        return repository.getAllTasksByOwner(owner);
    }

    @Override
    public List<Task> getCompletedTasks(Long owner) {
        return repository.getAllByOwnerAndTaskStatus(owner, TaskStatus.COMPLETED).stream()
                .sorted(Comparator.comparing(Task::getExecutionDate).reversed())
                .toList();
    }

    @Override
    public List<Task> getTasksOnTheDay(Long owner) {
        List<Task> tasks = repository.getAllByOwnerAndTaskStatus(owner, TaskStatus.IN_PROGRESS);

        return tasks.stream()
                .filter(task -> task.getPlannedImplDate() != null && LocalDate.now().equals(task.getPlannedImplDate().toLocalDate()))
                .sorted(Comparator.comparing(Task::getCreationDate).reversed())
                .toList();
    }

    @Override
    public List<Task> getTasksOnOtherDays(Long owner) {
        List<Task> tasks = repository.getAllByOwnerAndTaskStatus(owner, TaskStatus.IN_PROGRESS);

        return tasks.stream()
                .filter(task -> task.getPlannedImplDate() != null && task.getPlannedImplDate().toLocalDate().isAfter(LocalDate.now()))
                .sorted(Comparator.comparing(Task::getCreationDate))
                .toList();
    }

    @Override
    public List<Task> getTasksIncomplete(Long owner) {
        List<Task> tasks = repository.getAllByOwnerAndTaskStatus(owner, TaskStatus.IN_PROGRESS);

        return tasks.stream()
                .filter(task -> task.getPlannedImplDate() != null && task.getPlannedImplDate().toLocalDate().isBefore(LocalDate.now()))
                .sorted(Comparator.comparing(Task::getPlannedImplDate).reversed())
                .toList();
    }

    @Override
    public List<Task> getInProgressTasksWithoutDatePlannedImplementation(Long owner) {
        List<Task> tasks = repository.getAllByOwnerAndTaskStatus(owner, TaskStatus.IN_PROGRESS);

        return tasks.stream()
                .filter(task -> task.getPlannedImplDate() == null)
                .sorted(Comparator.comparing(Task::getCreationDate).reversed())
                .toList();
    }

    @Override
    public Task createTask(Task task) {
        return repository.save(task);
    }

    @Override
    public void deleteTask(Long taskId) {
        repository.deleteTaskByTaskId(taskId);
    }

    @Override
    public Task changeTask(Task task) {
        return repository.save(task);
    }

    public Task findTaskByTaskId(Long id) {
        return repository.findTaskByTaskId(id);
    }
}
