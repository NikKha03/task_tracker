const hostApiGateway = 'localhost';
const portApiGateway = 8080;

export const userController = `http://${hostApiGateway}:${portApiGateway}/api_gateway/user`;
export const projectController = `http://${hostApiGateway}:${portApiGateway}/task_service/project`;
export const apiTaskController = `http://${hostApiGateway}:${portApiGateway}/task-tracker/task`;

export const authPath = `http://${hostApiGateway}:${portApiGateway}/oauth2/authorization/keycloak`;
export const getUserPath = `${userController}/get`;
export const getProjectsPath = username => `${projectController}/?username=${username}`;

export const allCompletedTasks = `${apiTaskController}/allCompleted`;
export const tasksOnTheDay = `${apiTaskController}/onTheDay`;
export const tasksOnOtherDays = `${apiTaskController}/onOtherDays`;
export const tasksIncomplete = `${apiTaskController}/incomplete`;
export const tasksOnSomeday = `${apiTaskController}/onSomeday`;

export const createTaskPath = () => `${apiTaskController}/create`;
export const changeTaskPath = taskId => `${apiTaskController}/change/${taskId}`;
export const deleteTaskPath = taskId => `${apiTaskController}/delete/${taskId}`;
export const changeTaskStatusOnCompletedPath = taskId => `${apiTaskController}/changeStatusOnCompleted/${taskId}`;
export const changeTaskStatusOnInProgressPath = taskId => `${apiTaskController}/changeStatusOnInProgress/${taskId}`;

export const userPagePath = () => `${userController}`;

export const userInfoPath = `${userController}/userInfo`;
export const changeUserInfoPath = `${userController}/changeInfo`;
