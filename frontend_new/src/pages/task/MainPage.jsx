import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import Column from '../../components/task/Column';

export default function MainPage() {
	const user = { name: 'Халимендик Николай' };
	return (
		<>
			<Navbar user={user} />
			<div className='task-area'>
				<div className='left-menu'>
					<h1>Hi</h1>
				</div>
				<div className='main-window'>
					<Column status={'AWAITING_COMPLETION'} />
					<Column status={'IN_PROGRESS'} />
					<Column status={'COMPLETED'} />
				</div>
			</div>
		</>
	);
}
