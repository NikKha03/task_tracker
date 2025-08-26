import axios from 'axios';
import { getProjectPath, getUserByUsernamePath, getUsersByUsernamePath, kickedOutPath } from './apiPath';
import { buildGetTasksPath } from './apiBuilder';

export default class apiHandlers {
	constructor() {}

	getTasks = async (taskStatus, username, setTasks) => {
		try {
			const response = await axios.get(buildGetTasksPath(taskStatus, username), { withCredentials: true });
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
