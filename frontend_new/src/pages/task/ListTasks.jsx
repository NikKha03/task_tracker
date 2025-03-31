import React, { useState, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';

import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu';

export default function ListTasks() {
	const { user, logout, loading } = useContext(AuthContext);

	// Показываем пустой экран, пока идет проверка авторизации
	if (loading) return null;

	return (
		<>
			<>
				<Navbar pageType={'list'} />
				<div className='task-area'>
					<LeftMenu listIsClicked={true} />
					<div className='main-window'></div>
				</div>
			</>
		</>
	);
}
