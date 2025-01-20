const hostAuthService = 'localhost:9010';

export const oAuth2Yandex = `http://${hostAuthService}/oauth2/authorization/yandex`;

export const apiCategoryController = `http://${hostAuthService}/task-tracker/category`;
export const apiTaskController = `http://${hostAuthService}/task-tracker/task`;
export const apiUserController = `http://${hostAuthService}/task-tracker/user`;
export const apiAuth = `http://${hostAuthService}/task-tracker/auth`;

export const getCategoryPath = `${apiCategoryController}/getAll`;

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
