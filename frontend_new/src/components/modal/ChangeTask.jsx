import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';
import { AppContext } from '../../context/AppContext';
import Implementer from '../task/Implementer';
import TaskStatus from '../task/TaskStatus';
import { changeTaskPath, deleteTaskPath } from '../../resources/ApiPath';

import './../../../src/TaskPanel.css';
import { MDBBtn, MDBIcon, MDBModal, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

export default function ChangeTask({ task, topRightModal, setTopRightModal }) {
	const { user } = useContext(AuthContext);
	const { setTrigger, tabIdClicked } = useContext(AppContext);
	const [implementer, setImplementer] = useState('');
	const [status, setStatus] = useState('AWAITING_COMPLETION');

	const changeTask = async (taskId, header, comment, deadline, taskStatus, implementer) => {
		try {
			const response = await axios.put(
				changeTaskPath(taskId),
				{
					tabId: tabIdClicked,
					header: header,
					comment: comment,
					deadline: deadline.length < 10 ? null : deadline,
					taskStatus: taskStatus,
					implementer: implementer === '' ? null : implementer,
				},
				{ withCredentials: true }
			);
			setTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const deleteTask = async taskId => {
		try {
			const response = await axios.delete(deleteTaskPath(taskId), { withCredentials: true });
			setTrigger(true);
			setTopRightModal(false);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		changeTask(task.taskId, data.get('header'), data.get('comment'), data.get('deadline') + ' 00:00', status, implementer);
	};

	useEffect(() => {
		if (task !== null) {
			console.log(task);
			setImplementer(task.implementer !== null ? task.implementer : '');
			setStatus(task.taskStatus);
		}
	}, [task]);

	return (
		<>
			{task === null ? null : (
				<MDBModal animationDirection='right' open={topRightModal} onClose={() => setTopRightModal(false)}>
					<form onSubmit={handleSubmitSave}>
						<div className='create-task-panel'>
							<div className='header'>
								<h2 style={{ fontSize: '1.375rem', margin: '0' }}>Редактировать задачу</h2>
								<MDBBtn className='btn-close' color='none' onClick={() => setTopRightModal(false)}></MDBBtn>
							</div>

							<div className='content'>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Заголовок</h2>
									<MDBInput style={{ height: '2.25rem', backgroundColor: '#ffffff' }} name='header' type='text' autoComplete='off' defaultValue={task.header} />
								</div>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Описание</h2>
									<MDBTextArea style={{ height: '5rem', backgroundColor: '#ffffff' }} name='comment' defaultValue={task.comment} />
								</div>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Дата сдачи</h2>
									{/* TextField */}
									<MDBInput
										id='date'
										name='deadline'
										type='date'
										autoComplete='off'
										defaultValue={task.deadline === null ? '' : task.deadline.substring(0, 10)}
										style={{ width: '100%', height: '2.25rem', backgroundColor: '#ffffff' }}
										// size='small'
										// style={{ height: '2.25rem', backgroundColor: '#ffffff' }}
										// InputLabelProps={{
										// 	shrink: true,
										// }}
									/>
								</div>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Исполнитель</h2>
									<Implementer implementer={implementer} setImplementer={setImplementer} />
								</div>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Статус</h2>
									<TaskStatus status={status} setStatus={setStatus} />
								</div>
							</div>

							<div className='footer'>
								<MDBBtn type='submitSave' color='success' style={{ width: 'calc(100% - 4.5rem)', boxShadow: 'none', borderRadius: '4px' }}>
									Редактировать
								</MDBBtn>
								<MDBBtn type='submitDelete' style={{ width: '4rem', marginLeft: '0.5rem', boxShadow: 'none', borderRadius: '4px' }} color='danger' onClick={() => deleteTask(task.taskId)}>
									<MDBIcon far icon='trash-alt' />
								</MDBBtn>
							</div>
						</div>
					</form>
				</MDBModal>
			)}
		</>
	);
}
