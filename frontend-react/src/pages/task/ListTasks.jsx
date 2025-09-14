import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';

import Navbar from '../../components/navigate/Navbar';
import { names } from '../../components/navigate/Navbar';
import LeftMenu from '../../components/navigate/LeftMenu';
import Task from '../../components/task/Task';
import ChangeTask from '../../components/modal-window/task/ChangeTask';
import EmptyPageMassage from '../../components/task/EmptyPageMassage';

export default function ListTasks() {
	let [searchParams, setSearchParams] = useSearchParams();
	const { api, taskTrigger, setTaskTrigger, taskStatusId } = useContext(AppContext);
	const { user } = useContext(AuthContext);
	const [tasks, setTasks] = useState([]);

	const [changeModal, setChangeModal] = useState(false);
	const toggleOpenChange = () => setChangeModal(!changeModal);
	const [changeTask, setChangeTask] = useState(null);

	useEffect(() => {
		if (taskTrigger) setTaskTrigger(false);
		if (!isNaN(taskStatusId)) api.getTasks(names[taskStatusId].apiName, user.name, setTasks);
	}, [taskTrigger, taskStatusId]);

	useEffect(() => {
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
