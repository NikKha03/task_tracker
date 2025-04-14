const hostApiGateway = 'https://api.sharpbubbles.ru';
// const hostApiGateway = 'https://api.sharpbubbles.online';

export const userController = `${hostApiGateway}/user_service`;
export const projectController = `${hostApiGateway}/task_service/project`;
export const tabController = `${hostApiGateway}/task_service/tab`;
export const taskController = `${hostApiGateway}/task_service/task`;
export const apiTaskController = `${hostApiGateway}/task-tracker/task`;

export const authPath = `${hostApiGateway}/oauth2/authorization/keycloak`;
export const getUserPath = `${userController}/authorized`;

export const getProjectsPath = username => `${projectController}/?username=${username}`;
export const getProjectPath = (id, username) => `${projectController}/${id}?username=${username}`;
export const createProjectPath = `${projectController}/create`;
export const changeProjectPath = id => `${projectController}/change/${id}`;
export const deleteProjectPath = id => `${projectController}/delete/${id}`;

export const createTabPath = `${tabController}/create`;
export const changeTabPath = id => `${tabController}/change/${id}`;
export const deleteTabPath = id => `${tabController}/delete/${id}`;

export const getTasksByTabIdPath = tabId => `${taskController}/byTab/${tabId}`;

export const userInfoPath = `${userController}/userInfo`;
export const changeUserInfoPath = `${userController}/changeInfo`;
