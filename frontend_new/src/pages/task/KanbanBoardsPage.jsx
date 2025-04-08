import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu';
import Column from '../../components/task/Column';

import { AuthContext } from '../../context/AuthContext';
import { AppContext } from '../../context/AppContext';
import { getTasksByTabIdPath } from '../../resources/ApiPath';

import { MDBIcon } from 'mdb-react-ui-kit';

export default function KanbanBoardsPage() {
	const { user, logout, loading } = useContext(AuthContext);
	const { tabIdClicked, projectIdClicked } = useContext(AppContext);

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
		if (!isNaN(tabIdClicked)) getTasks(tabIdClicked);
	}, [tabIdClicked]);

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
