const hostApiGateway = 'localhost';
const portApiGateway = 8080;

export const userController = `http://${hostApiGateway}:${portApiGateway}/api_gateway/user`;
export const projectController = `http://${hostApiGateway}:${portApiGateway}/task_service/project`;
export const apiTaskController = `http://${hostApiGateway}:${portApiGateway}/task-tracker/task`;

export const authPath = `http://${hostApiGateway}:${portApiGateway}/oauth2/authorization/keycloak`;
export const getUserPath = `${userController}/get`;
export const getProjectsPath = username => `${projectController}/?username=${username}`;
export const getProjectPath = (id, username) => `${projectController}/${id}?username=${username}`;
export const createProjectPath = `${projectController}/create`;
export const changeProjectPath = id => `${projectController}/change/${id}`;
export const deleteProjectPath = id => `${projectController}/delete/${id}`;

export const userInfoPath = `${userController}/userInfo`;
export const changeUserInfoPath = `${userController}/changeInfo`;
