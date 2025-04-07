import React, { useState, useEffect } from 'react';
import './../../../src/CreateTaskPanel.css';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

export default function CreateTaskPanel({ toggleOpen, topRightModal, setTopRightModal }) {
	return (
		<>
			<MDBModal animationDirection='right' open={topRightModal} onClose={() => setTopRightModal(false)}>
				{/* <MDBModalDialog position='bottom-right' side>
					<MDBModalContent>
						<MDBModalHeader className='bg-info text-white'>
							<MDBModalTitle>Product in the cart</MDBModalTitle>
							<MDBBtn color='none' className='btn-close btn-close-white' onClick={toggleOpen}></MDBBtn>
						</MDBModalHeader>
						<MDBModalBody>
							<div className='row'>
								<div className='col-3 text-center'>
									<i className='fas fa-shopping-cart fa-4x text-info'></i>
								</div>

								<div className='col-9'>
									<p>Do you need more time to make a purchase decision?</p>
									<p>No pressure, your product will be waiting for you in the cart.</p>
								</div>
							</div>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color='info'>Go to the cart</MDBBtn>
							<MDBBtn outline color='info' onClick={toggleOpen}>
								Close
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog> */}
				<div className='create-task-panel'>
					<div className='header'>
						<h2>Создание задачи</h2>
						<button className='close-btn' onClick={() => setTopRightModal(false)}>
							✕
						</button>
					</div>

					<div className='content'>
						<input type='text' placeholder='Название задачи' />
						<textarea placeholder='Описание задачи' />
						<button className='submit-btn'>Создать</button>
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
