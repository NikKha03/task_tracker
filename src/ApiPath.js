const hostAuthService = 'localhost';
const portAuthService = 8090;

export const oAuth2Yandex = `http://${hostAuthService}:${portAuthService}/oauth2/authorization/yandex`;

export const apiTasks = `http://${hostAuthService}:${portAuthService}/task-tracker/task`;
export const apiUsers = `http://${hostAuthService}:${portAuthService}/task-tracker/user`;
export const apiAuth = `http://${hostAuthService}:${portAuthService}/task-tracker/auth`;

export const apiAllTasks = () => `${apiTasks}/all`;
export const apiAllCompletedTasks = () => `${apiTasks}/allCompleted`;
export const apiTasksOnTheDay = () => `${apiTasks}/onTheDay`;
export const apiTasksOnOtherDays = () => `${apiTasks}/onOtherDays`;
export const apiTasksOnSomeday = () => `${apiTasks}/onSomeday`;

export const apiCreateTask = () => `${apiTasks}/create`;
export const apiChangeTask = taskId => `${apiTasks}/change/${taskId}`;
export const apiDeleteTask = taskId => `${apiTasks}/delete/${taskId}`;

export const apiCheckAuth = () => `${apiAuth}/checkAuth`;

export const apiChangeTaskStatusOnCompleted = taskId => `http://localhost:8080/taskServiceApi/1/changeTaskStatusOnCompleted/${taskId}`;

export const apiUserPage = () => `${apiUsers}`;
