import axios from 'axios';
import {
	awaitingCompletionTaskPath,
	withoutDateImplTasksPath,
	inProgressTasksPath,
	incompleteTasksPath,
	completedTasksPath,
	getProjectPath,
	getUserByUsernamePath,
	getUsersByUsernamePath,
	kickedOutPath,
} from './apiPath';

const buildPath = (status, implementer) => {
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

export default class apiHandlers {
	constructor() {}

	getTasks = async (taskStatus, username, setTasks) => {
		try {
			const response = await axios.get(buildPath(taskStatus, username), { withCredentials: true });
			setTasks(response.data);
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};

	getProject = async (projectId, username, setProject, setTabs) => {
		try {
			const response = await axios.get(getProjectPath(projectId, username), { withCredentials: true });
			if (response.data.body !== null) {
				setProject(response.data.body);
				setTabs(response.data.body.tabs);
			} else {
				setProject({});
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};

	kickedOut = async (projectId, username, setProjectTrigger) => {
		try {
			await axios.delete(kickedOutPath(username, projectId), { withCredentials: true });
			setProjectTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	getUserByUsername = async (username, setFullName) => {
		try {
			const response = await axios.get(getUserByUsernamePath(username), { withCredentials: true });
			setFullName(`${response.data.firstName} ${response.data.lastName}`);
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};

	getUsersByUsername = async (usernames, setUsernameAndName) => {
		try {
			const response = await axios.post(getUsersByUsernamePath, usernames, { withCredentials: true });
			setUsernameAndName(response.data);
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};
}
