import React, { useState, useContext } from 'react';

import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu';
import Column from '../../components/task/Column';

import { AuthContext } from '../../context/AuthContext';

import { MDBIcon } from 'mdb-react-ui-kit';

export default function KanbanBoardsPage() {
	const { user, logout, loading } = useContext(AuthContext);

	// Показываем пустой экран, пока идет проверка авторизации
	if (loading) return null;

	return (
		<>
			<Navbar pageType={'board'} />
			<div className='task-area'>
				<LeftMenu listIsClicked={false} />
				<div className='main-window'>
					<Column status={'AWAITING_COMPLETION'} />
					<Column status={'IN_PROGRESS'} />
					<Column status={'COMPLETED'} />
				</div>
			</div>
		</>
	);
}
