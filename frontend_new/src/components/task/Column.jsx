import React, { useState, useEffect } from 'react';
import CreateTaskPanel from '../modal/CreateTaskPanel';

import Task from './Task';

export default function Column({ status, tasks = [] }) {
	const [topRightModal, setTopRightModal] = useState(false);
	const toggleOpen = () => setTopRightModal(!topRightModal);

	const addTask = () => {};
	const column = (style, header, paddingBottom) => {
		return (
			<>
				<div className='column-background' style={style}>
					<div className='column-area'>
						<h2 style={{ paddingBottom: paddingBottom }}>{header}</h2>
						{header === 'Нужно сделать' ? <p onClick={toggleOpen}>+ Добавить задачу</p> : null}

						{tasks.map(task => {
							return (
								<div className='tasks' key={task.taskId}>
									<Task task={task} />
								</div>
							);
						})}
					</div>
				</div>
				<CreateTaskPanel toggleOpen={toggleOpen} topRightModal={topRightModal} setTopRightModal={setTopRightModal} />
			</>
		);
	};

	// useEffect(() => {

	// }, []);

	switch (status) {
		case 'AWAITING_COMPLETION':
			return column({ backgroundColor: '#999999' }, 'Нужно сделать', '0.25rem');
		case 'IN_PROGRESS':
			return column({ backgroundColor: '#ff7324' }, 'В работе', '0.75rem');
		case 'COMPLETED':
			return column({ backgroundColor: '#71db7f' }, 'Готово', '0.75rem');
	}
}
