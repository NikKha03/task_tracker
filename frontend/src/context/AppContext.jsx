import { createContext, useContext, useState, useEffect } from 'react';

import { AuthContext } from './AuthContext';
import apiHandlers from '../api/apiHandlers';
import { names } from '../components/navigate/Navbar';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	// объявляем класс для вызова запросов на api
	const api = new apiHandlers();
	// получаем параметры из URL
	let params = new URLSearchParams(document.location.search);

	const { user, projectTrigger } = useContext(AuthContext);

	const [taskTrigger, setTaskTrigger] = useState(false);
	const [taskStatusId, setTaskStatusId] = useState(names.find(obj => obj.apiName === params.get('status'))?.i);

	const [projectIdClicked, setProjectIdClicked] = useState(parseInt(params.get('project')));
	const [project, setProject] = useState({});

	const [tabIdClicked, setTabIdClicked] = useState(parseInt(params.get('tab')));
	let [tabs, setTabs] = useState([]);
	if (tabs.length > 0) {
		tabs = tabs.sort(function (a, b) {
			return a.tabId - b.tabId;
		});
	}
	// для получения имени и фамилии пользователя из username
	const [usernameAndName, setUsernameAndName] = useState({});
	const usernames = [];

	useEffect(() => {
		if (isNaN(taskStatusId)) {
			setTaskStatusId(0);
		}
	}, []);

	useEffect(() => {
		if (!user) return;
		if (isNaN(projectIdClicked)) return;
		api.getProject(projectIdClicked, user.name, setProject, setTabs);
	}, [projectIdClicked, projectTrigger, user]);

	useEffect(() => {
		if (project.team !== undefined) project.team.forEach(i => usernames.push(i.username));
		if (usernames.length > 0) api.getUsersByUsername(usernames, setUsernameAndName);
	}, [project]);

	return (
		<AppContext.Provider value={{ api, taskTrigger, setTaskTrigger, projectIdClicked, setProjectIdClicked, project, tabIdClicked, setTabIdClicked, tabs, taskStatusId, setTaskStatusId, usernameAndName }}>
			{children}
		</AppContext.Provider>
	);
};
