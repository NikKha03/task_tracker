import axios from 'axios';
import { getProjectPath, getUserByUsernamePath, getUsersByUsernamePath, kickedOutPath } from './api-path';
import { buildGetTasksPath } from './api-builder';

class ApiHandlers {
    constructor() {}

    getTasks = async (taskStatus: string, username: string) => {
        try {
            const response = await axios.get(buildGetTasksPath(taskStatus, username), { withCredentials: true });
            if (response) return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    getProject = async (projectId: number, username: string): Promise<any> => {
        try {
            const response = await axios.get(getProjectPath(projectId, username), { withCredentials: true });
            if (response.data.body !== null) return response.data.body;
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    kickedOut = async (projectId: number, username: string) => {
        try {
            axios.delete(kickedOutPath(username, projectId), { withCredentials: true });
            return true;
        } catch (error) {
            console.error('Error fetching user:', error);
            return false;
        }
    };

    getUserByUsername = async (username: string) => {
        try {
            const response = await axios.get(getUserByUsernamePath(username), { withCredentials: true });
            if (response) return { firstName: response.data.firstName, lastName: response.data.lastName };
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    getUsersByUsername = async (usernames: string[]) => {
        try {
            const response = await axios.post(getUsersByUsernamePath, usernames, { withCredentials: true });
            if (response) return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
}

// объявляем класс для вызова запросов на api
const api = new ApiHandlers();
export default api;
