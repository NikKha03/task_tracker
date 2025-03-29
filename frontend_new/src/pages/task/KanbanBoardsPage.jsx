import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu';
import Column from '../../components/task/Column';

import { MDBIcon } from 'mdb-react-ui-kit';

export default function KanbanBoardsPage({ user }) {
	return (
		<>
			<Navbar pageType={'board'} user={user} />
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
