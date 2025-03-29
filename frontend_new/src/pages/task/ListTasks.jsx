import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu';

export default function ListTasks({ user }) {
	return (
		<>
			{/* <h1>List tasks</h1> */}
			<Navbar pageType={'list'} user={user} />
			<div className='task-area'>
				<LeftMenu listIsClicked={true} />
				<div className='main-window'></div>
			</div>
		</>
	);
}
