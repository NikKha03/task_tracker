import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import { awaitingCompletionTaskPath, withoutDateImplTasksPath, inProgressTasksPath, incompleteTasksPath, completedTasksPath } from '../../resources/ApiPath';

import Navbar from '../../components/navigate/Navbar';
import { names } from '../../components/navigate/Navbar';
import LeftMenu from '../../components/navigate/LeftMenu';
import Task from '../../components/task/Task';
import ChangeTask from '../../components/modal-window/task/ChangeTask';
import EmptyPageMassage from '../../components/task/EmptyPageMassage';

const buildPath = (status, implementer) => {
	switch (status) {
		case 'awaitingCompletionTasks':
			return awaitingCompletionTaskPath(implementer);
		case 'withoutDateImplTasks':
			return withoutDateImplTasksPath(implementer);
		case 'inProgressTasks':
			return inProgressTasksPath(implementer);
		case 'incompleteTasks':
			return incompleteTasksPath(implementer);
		case 'completedTasks':
			return completedTasksPath(implementer);
	}
};

export default function ListTasks() {
	let [searchParams, setSearchParams] = useSearchParams();
	const { taskTrigger, setTaskTrigger, taskStatusId } = useContext(AppContext);
	const { user } = useContext(AuthContext);
	const [tasks, setTasks] = useState([]);

	const [changeModal, setChangeModal] = useState(false);
	const toggleOpenChange = () => setChangeModal(!changeModal);
	const [changeTask, setChangeTask] = useState(null);

	useEffect(() => {
		const getTasks = async apiName => {
			try {
				const response = await axios.get(buildPath(apiName, user.name), { withCredentials: true });
				// console.log(response.data);
				setTasks(response.data);
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};

		if (taskTrigger) setTaskTrigger(false);
		if (!isNaN(taskStatusId)) getTasks(names[taskStatusId].apiName);
	}, [taskTrigger, taskStatusId]);

	useEffect(() => {
		// params.set('status', names.find(obj => obj.i === 0).apiName);
		setSearchParams({ status: names.find(obj => obj.i === 0).apiName });
	}, []);

	return (
		<>
			<Navbar pageType={'list'} />
			<div className='task-area'>
				<LeftMenu listIsClicked={true} />
				<div className='main-window'>
					{tasks.length === 0 ? (
						<EmptyPageMassage />
					) : (
						<div className='list-area'>
							{tasks.map(task => {
								return (
									<div className='tasks' key={task.taskId}>
										<Task task={task} tasks={tasks} displayMethod='list' setChangeTask={setChangeTask} toggleOpen={toggleOpenChange} />
									</div>
								);
							})}
						</div>
					)}
				</div>
				<ChangeTask task={changeTask} topRightModal={changeModal} setTopRightModal={setChangeModal} />
			</div>
		</>
	);
}
