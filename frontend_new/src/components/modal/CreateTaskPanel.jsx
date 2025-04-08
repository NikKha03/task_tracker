import React, { useState, useEffect } from 'react';
import './../../../src/CreateTaskPanel.css';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

const btnStyle = width => {
	return { width: width, boxShadow: 'none', borderRadius: '4px' };
};

export default function CreateTaskPanel({ toggleOpen, topRightModal, setTopRightModal }) {
	return (
		<>
			<MDBModal animationDirection='right' open={topRightModal} onClose={() => setTopRightModal(false)}>
				<div className='create-task-panel'>
					<div className='header' color='black'>
						<MDBModalTitle>Создать задачу</MDBModalTitle>
						<MDBBtn className='btn-close' color='none' onClick={() => setTopRightModal(false)}></MDBBtn>
					</div>

					<div className='content'>
						<MDBInput type='text' />
						<MDBTextArea />
					</div>

					<div className='footer'>
						<MDBBtn type='submitSave' color='success' style={btnStyle('100%')}>
							Создать
						</MDBBtn>
					</div>
				</div>
			</MDBModal>

			{/* Панель создания задачи */}
			{/* <div className='create-task-panel'>
				<div className='header'>
					<h2>Создание задачи</h2>
					<button className='close-btn'>
						✕
					</button>
				</div>

				<div className='content'>
					<input type='text' placeholder='Название задачи' />
					<textarea placeholder='Описание задачи' />
					<button className='submit-btn'>Создать</button>
				</div>
			</div> */}
		</>
	);
}
