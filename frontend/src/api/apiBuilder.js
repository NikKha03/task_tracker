import { awaitingCompletionTaskPath, withoutDateImplTasksPath, inProgressTasksPath, incompleteTasksPath, completedTasksPath } from './apiPath';

export const buildGetTasksPath = (status, implementer) => {
	switch (status) {
		case 'awaitingCompletionTasks':
			return awaitingCompletionTaskPath(implementer);
		case 'withoutDateImplTasks':
			return withoutDateImplTasksPath(implementer);
		case 'inProgressTasks':
			return inProgressTasksPath(implementer);
		case 'incompleteTasks':
			return incompleteTasksPath(implementer);
		case 'completedTasks':
			return completedTasksPath(implementer);
	}
};
