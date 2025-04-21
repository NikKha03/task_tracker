import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu';
import Column from '../../components/task/Column';

import { AuthContext } from '../../context/AuthContext';
import { AppContext } from '../../context/AppContext';
import { getTasksByTabIdPath } from '../../resources/ApiPath';

export default function KanbanBoardsPage() {
	const { loading } = useContext(AuthContext);
	const { trigger, setTrigger, tabIdClicked, projectIdClicked } = useContext(AppContext);

	const [tasks, setTasks] = useState([]);

	const getTasks = async tabId => {
		try {
			const response = await axios.get(getTasksByTabIdPath(tabId), { withCredentials: true });
			setTasks(response.data);
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};

	if (loading) return null; // Показываем пустой экран, пока идет проверка авторизации

	useEffect(() => {
		if (trigger) setTrigger(false);
		if (!isNaN(tabIdClicked)) getTasks(tabIdClicked);
	}, [trigger, tabIdClicked]);

	useEffect(() => {
		setTasks([]);
	}, [projectIdClicked]);

	return (
		<>
			<Navbar pageType={'board'} />
			<div className='task-area'>
				<LeftMenu listIsClicked={false} />
				<div className='main-window'>
					{!isNaN(tabIdClicked) ? (
						<>
							{/* <Column status={'AWAITING_COMPLETION'} tasks={tasks.AWAITING_COMPLETION !== undefined ? tasks.AWAITING_COMPLETION.concat(tasks.WITHOUT_DATE_IMPL) : []} /> */}
							<Column status={'AWAITING_COMPLETION'} tasks={tasks.AWAITING_COMPLETION} />
							<Column status={'IN_PROGRESS'} tasks={tasks.IN_PROGRESS} />
							<Column status={'COMPLETED'} tasks={tasks.COMPLETED} />
						</>
					) : null}
				</div>
			</div>
		</>
	);
}
