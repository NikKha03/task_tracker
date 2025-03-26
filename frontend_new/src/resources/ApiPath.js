const hostApiGateway = 'localhost';
const portAuthService = 8090;

export const apiTaskController = `http://${hostApiGateway}:${portAuthService}/task-tracker/task`;
export const apiUserController = `http://${hostApiGateway}:${portAuthService}/task-tracker/user`;
export const apiAuth = `http://${hostApiGateway}:${portAuthService}/task-tracker/auth`;

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

export const checkAuthPath = `${apiAuth}/checkAuth`;

export const userPagePath = () => `${apiUserController}`;

export const userInfoPath = `${apiUserController}/userInfo`;
export const changeUserInfoPath = `${apiUserController}/changeInfo`;
