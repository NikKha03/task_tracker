import React, { useState } from 'react';
import CreateTask from '../modal/CreateTask';
import ChangeTask from '../modal/ChangeTask';

import Task from './Task';

export default function Column({ status, tasks = [] }) {
	const [createModal, setCreateModal] = useState(false);
	const toggleOpenCreate = () => setCreateModal(!createModal);

	const [changeModal, setChangeModal] = useState(false);
	const toggleOpenChange = () => setChangeModal(!changeModal);
	const [changeTask, setChangeTask] = useState(null);

	const column = (style, header, paddingBottom) => {
		return (
			<>
				<div className='column-background' style={style}>
					<div className='column-area'>
						<h2 style={{ paddingBottom: paddingBottom }}>{header}</h2>
						{header === 'Нужно сделать' ? <p onClick={toggleOpenCreate}>+ Добавить задачу</p> : null}

						{tasks.map(task => {
							return (
								<div className='tasks' key={task.taskId}>
									<Task task={task} setChangeTask={setChangeTask} toggleOpen={toggleOpenChange} />
								</div>
							);
						})}
					</div>
				</div>
				<CreateTask toggleOpen={toggleOpenCreate} topRightModal={createModal} setTopRightModal={setCreateModal} />
				<ChangeTask task={changeTask} topRightModal={changeModal} setTopRightModal={setChangeModal} />;
			</>
		);
	};

	switch (status) {
		case 'AWAITING_COMPLETION':
			return column({ backgroundColor: '#999999' }, 'Нужно сделать', '0.25rem');
		case 'IN_PROGRESS':
			return column({ backgroundColor: '#ff7324' }, 'В работе', '0.75rem');
		case 'COMPLETED':
			return column({ backgroundColor: '#71db7f' }, 'Готово', '0.75rem');
	}
}
