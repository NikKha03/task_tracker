import axios from 'axios';
import {
    changeProjectPath,
    changeTabPath,
    changeTaskPath,
    changeUserInfoPath,
    createProjectPath,
    createTabPath,
    createTaskPath,
    deleteProjectPath,
    deleteTabPath,
    deleteTaskPath,
    getProjectPath,
    getProjectsPath,
    getTasksByTabIdPath,
    getUserByUsernamePath,
    getUserPath,
    getUsersByUsernamePath,
    inviteInProjectPath,
    kickedOutPath,
} from './api-path';
import { buildGetTasksPath } from './api-builder';

class ApiHandlers {
    constructor() {}

    // Функция для загрузки текущего пользователя
    async getUser(): Promise<any> {
        try {
            const response = await axios.get(getUserPath, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createTask(creatorUsername: string, taskData: object): Promise<boolean> {
        if (creatorUsername.trim().length < 1) return false;
        try {
            await axios.post(createTaskPath(creatorUsername), taskData, { withCredentials: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getTasksByTabId(tabId: number, projectId: string, username: string): Promise<any> {
        try {
            const response = await axios.get(getTasksByTabIdPath(projectId, tabId, username), { withCredentials: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getTasks(taskStatus: string, username: string): Promise<any> {
        try {
            const response = await axios.get(buildGetTasksPath(taskStatus, username), { withCredentials: true });
            if (response) return response.data;
        } catch (error) {
            throw error;
        }
    }

    async changeTask(taskId: number, taskData: object): Promise<boolean> {
        try {
            await axios.put(changeTaskPath(taskId), taskData, { withCredentials: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteTask(taskId: number): Promise<boolean> {
        try {
            await axios.delete(deleteTaskPath(taskId), { withCredentials: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async createProject(projectName: string, username: string): Promise<boolean> {
        if (projectName.trim().length < 1) return false;
        try {
            await axios.post(
                createProjectPath,
                {
                    name: projectName.trim(),
                    projectType: 'INDIVIDUAL_USER',
                    principalUser: username,
                },
                { withCredentials: true },
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getProjects(username: string): Promise<any> {
        try {
            const response = await axios.get(getProjectsPath(username), { withCredentials: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getProject(projectId: number, username: string): Promise<any> {
        try {
            const response = await axios.get(getProjectPath(projectId, username), { withCredentials: true });
            if (response.data.body !== null) return response.data.body;
        } catch (error) {
            throw error;
        }
    }

    async changeProject(projectName: string, projectId: number): Promise<boolean> {
        if (projectName.trim().length < 1) return false;
        try {
            await axios.put(
                changeProjectPath(projectId),
                {
                    name: projectName,
                },
                { withCredentials: true },
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteProject(projectId: number): Promise<boolean> {
        try {
            await axios.delete(deleteProjectPath(projectId), { withCredentials: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async inviteInProject(username: string, projectId: number): Promise<boolean> {
        try {
            await axios.post(inviteInProjectPath(username, projectId), { withCredentials: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async kickedOut(projectId: number, username: string): Promise<boolean> {
        try {
            axios.delete(kickedOutPath(username, projectId), { withCredentials: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async createTab(tabName: string, projectId: number): Promise<boolean> {
        if (tabName.trim().length < 1) return false;
        try {
            await axios.post(
                createTabPath,
                {
                    name: tabName.trim(),
                    projectId,
                },
                { withCredentials: true },
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async changeTab(tabName: string, tabId: number): Promise<boolean> {
        if (tabName.trim().length < 1) return false;
        try {
            await axios.put(
                changeTabPath(tabId),
                {
                    name: tabName.trim(),
                },
                { withCredentials: true },
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteTab(tabId: number): Promise<boolean> {
        try {
            await axios.delete(deleteTabPath(tabId), { withCredentials: true });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getUserByUsername(username: string) {
        try {
            const response = await axios.get(getUserByUsernamePath(username), { withCredentials: true });
            if (response) return { firstName: response.data.firstName, lastName: response.data.lastName };
        } catch (error) {
            throw error;
        }
    }

    async getUsersByUsername(usernames: string[]) {
        try {
            const response = await axios.post(getUsersByUsernamePath, usernames, { withCredentials: true });
            if (response) return response.data;
        } catch (error) {
            throw error;
        }
    }

    async changeUserInfo(firstName: string, lastName: string, email: string, tg: string): Promise<boolean> {
        try {
            await axios.put(
                changeUserInfoPath,
                {
                    firstName,
                    lastName,
                    email,
                    tg,
                },
                {
                    withCredentials: true,
                },
            );
            return true;
        } catch (error) {
            throw error;
        }
    }
}

// объявляем класс для вызова запросов на api
const api = new ApiHandlers();
export default api;
