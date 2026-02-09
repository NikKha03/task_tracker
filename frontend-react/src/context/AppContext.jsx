import { createContext, useContext, useState, useEffect } from 'react';

import { AuthContext } from './AuthContext';
import apiService from '../api/apiService';
import { names } from '../components/navigate/Navbar';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	/** Сервис для вызова запросов на api */
	const api = new apiService();

	/** Получаем параметры из URL */
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
	/** Для получения имени и фамилии пользователя из username  */
	const [usernameAndName, setUsernameAndName] = useState({});
	const usernames = [];

	useEffect(() => {
		if (isNaN(taskStatusId)) {
			setTaskStatusId(0);
		}
	}, []);

	useEffect(async () => {
		if (!user) return;
		if (isNaN(projectIdClicked)) return;

		const project = await api.getProject(projectIdClicked, user.name, setProject);
		setProject(project);
		project && setTabs(project?.tabs);
	}, [projectIdClicked, projectTrigger, user]);

	useEffect(async () => {
		if (project.team !== undefined) project.team.forEach(i => usernames.push(i.username));
		if (usernames.length > 0) setUsernameAndName(await api.getUsersByUsername(usernames));
	}, [project]);

	return (
		<AppContext.Provider
			value={{
				api,
				taskTrigger,
				setTaskTrigger,
				projectIdClicked,
				setProjectIdClicked,
				project,
				tabIdClicked,
				setTabIdClicked,
				tabs,
				taskStatusId,
				setTaskStatusId,
				usernameAndName,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
