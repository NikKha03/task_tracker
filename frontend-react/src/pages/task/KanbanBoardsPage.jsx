import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../../components/navigate/Navbar';
import LeftMenu from '../../components/navigate/LeftMenu';
import Column from '../../components/project/Column';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import { getTasksByTabIdPath } from '../../api/apiPath';

export default function KanbanBoardsPage() {
	let [searchParams, setSearchParams] = useSearchParams();
	const { user } = useContext(AuthContext);
	const { taskTrigger, setTaskTrigger, tabIdClicked, projectIdClicked } = useContext(AppContext);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async tabId => {
			try {
				const response = await axios.get(getTasksByTabIdPath(searchParams.get('project'), tabId, user.name), { withCredentials: true });
				setTasks(response.data);
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};

		if (taskTrigger) setTaskTrigger(false);
		if (!isNaN(tabIdClicked)) getTasks(tabIdClicked);
	}, [taskTrigger, tabIdClicked]);

	useEffect(() => {
		setTasks([]);
	}, [projectIdClicked]);

	return (
		<>
			<Navbar pageType={'board'} />
			<div className='task-area'>
				<LeftMenu />
				<div className='main-window'>
					{!isNaN(tabIdClicked) && (
						<>
							{/* <Column status={'AWAITING_COMPLETION'} tasks={tasks.AWAITING_COMPLETION !== undefined ? tasks.AWAITING_COMPLETION.concat(tasks.WITHOUT_DATE_IMPL) : []} /> */}
							<Column status={'AWAITING_COMPLETION'} tasks={tasks.AWAITING_COMPLETION} />
							<Column status={'IN_PROGRESS'} tasks={tasks.IN_PROGRESS} />
							<Column status={'COMPLETED'} tasks={tasks.COMPLETED} />
						</>
					)}
				</div>
			</div>
		</>
	);
}
