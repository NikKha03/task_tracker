const hostAuthService = 'localhost';
const portAuthService = 8090;

export const oAuth2Yandex = `http://${hostAuthService}:${portAuthService}/oauth2/authorization/yandex`;

export const apiTaskController = `http://${hostAuthService}:${portAuthService}/task-tracker/task`;
export const apiUserController = `http://${hostAuthService}:${portAuthService}/task-tracker/user`;
export const apiAuth = `http://${hostAuthService}:${portAuthService}/task-tracker/auth`;

export const allCompletedTasks = `${apiTaskController}/allCompleted`;
export const tasksOnTheDay = `${apiTaskController}/onTheDay`;
export const tasksOnOtherDays = `${apiTaskController}/onOtherDays`;
export const tasksIncomplete = `${apiTaskController}/incomplete`;
export const tasksOnSomeday = `${apiTaskController}/onSomeday`;

export const createTaskPath = () => `${apiTaskController}/create`;
export const changeTaskPath = taskId => `${apiTaskController}/change/${taskId}`;
export const deleteTaskPath = taskId => `${apiTaskController}/delete/${taskId}`;
export const changeTaskPathStatusOnCompletedPath = taskId => `${apiTaskController}/changeStatusOnCompleted/${taskId}`;
export const changeTaskPathStatusOnInProgressPath = taskId => `${apiTaskController}/changeStatusOnInProgress/${taskId}`;

export const checkAuthPath = `${apiAuth}/checkAuth`;

export const userPagePath = () => `${apiUserController}`;

export const userInfoPath = `${apiUserController}/userInfo`;
export const changeUserInfoPath = `${apiUserController}/changeInfo`;
