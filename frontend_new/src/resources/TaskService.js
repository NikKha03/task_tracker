class TaskService {
	getTasks(handlerURL) {
		const tasks = async tabId => {
			try {
				const response = await axios.get(handlerURL, { withCredentials: true });
				setTasks(response.data);
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};
	}
}
