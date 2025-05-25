import React, { useState, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../../context/AuthContext';
import { AppContext } from '../../../context/AppContext';
import Implementer from '../../task/Implementer';
import TaskStatus from '../../task/TaskStatus';
import { createTaskPath } from '../../../resources/ApiPath';

import '../../../styles/TaskPanel.css';
import { MDBBtn, MDBModal, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

const getCurrentDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

export default function CreateTask({ toggleOpen, topRightModal, setTopRightModal }) {
	const { user } = useContext(AuthContext);
	const { setTaskTrigger, tabIdClicked } = useContext(AppContext);
	const [implementer, setImplementer] = useState('');
	const [status, setStatus] = useState('AWAITING_COMPLETION');

	const createTask = async (creatorUsername, header, comment, deadline, taskStatus, implementer) => {
		if (creatorUsername.trim().length < 1) return null;
		try {
			await axios.post(
				createTaskPath(creatorUsername),
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
			setTaskTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		createTask(user.name, data.get('header'), data.get('comment'), data.get('deadline') + ' 00:00', status, implementer);
		console.log(user.name);
	};

	return (
		<>
			<MDBModal animationDirection='right' open={topRightModal} onClose={() => setTopRightModal(false)}>
				<div className='create-task-panel'>
					<div className='header'>
						<h2 style={{ fontSize: '1.375rem', margin: '0' }}>Создать задачу</h2>
						<MDBBtn className='btn-close btn-close-white' color='none' onClick={() => setTopRightModal(false)}></MDBBtn>
					</div>

					<form style={{ height: '100%', position: 'relative' }} onSubmit={handleSubmitSave}>
						<div className='content'>
							<div>
								<h2 style={{ fontSize: '1.25rem' }}>Заголовок</h2>
								<MDBInput style={{ height: '2.25rem', backgroundColor: '#ffffff' }} name='header' type='text' autoComplete='off' />
							</div>
							<div>
								<h2 style={{ fontSize: '1.25rem' }}>Описание</h2>
								<MDBTextArea style={{ height: '5rem', backgroundColor: '#ffffff' }} name='comment' />
							</div>
							<div>
								<h2 style={{ fontSize: '1.25rem' }}>Дата сдачи</h2>
								{/* TextField */}
								<MDBInput
									id='date'
									name='deadline'
									type='date'
									autoComplete='off'
									defaultValue={null}
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
							<MDBBtn type='submitSave' color='success' style={{ width: '100%', boxShadow: 'none', borderRadius: '4px' }}>
								Создать
							</MDBBtn>
						</div>
					</form>
				</div>
			</MDBModal>
		</>
	);
}
