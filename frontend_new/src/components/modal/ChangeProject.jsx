import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

import { AuthContext } from '../../context/AuthContext';
import { AppContext } from '../../context/AppContext';
import { changeProjectPath, deleteProjectPath } from '../../resources/ApiPath';

const btnStyle = width => {
	return { width: width, boxShadow: 'none', borderRadius: '4px' };
};

export default function ChangeProject({ isOpen, toggle }) {
	const { user, setTrigger } = useContext(AuthContext);
	const { project } = useContext(AppContext);
	const navigate = useNavigate();

	const changeProject = async projectName => {
		if (projectName.trim().length < 1) return null;
		try {
			const response = await axios.put(
				changeProjectPath(project.projectId),
				{
					name: projectName,
				},
				{ withCredentials: true }
			);
			setTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const deleteProject = async () => {
		try {
			const response = await axios.delete(deleteProjectPath(project.projectId), { withCredentials: true });
			navigate('/list/');
			setTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		changeProject(data.get('projectName'));
		toggle();
	};

	return (
		<>
			<MDBModal open={isOpen} onClose={toggle} tabIndex='-1'>
				<form onSubmit={handleSubmitSave}>
					<MDBModalDialog size='lg'>
						<MDBModalContent className='modal-content'>
							<MDBModalHeader>
								<MDBModalTitle>Редактировать проект</MDBModalTitle>
								<MDBBtn className='btn-close' color='none' onClick={toggle}></MDBBtn>
							</MDBModalHeader>

							<MDBModalBody>
								<p style={{ marginBottom: '0.25rem' }}>Название проекта</p>
								<MDBInput name='projectName' defaultValue={project.name} autoComplete='off' />
							</MDBModalBody>

							<MDBModalFooter style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
								<MDBBtn type='submitSave' style={btnStyle('calc(100% - 5rem)')} color='success'>
									Сохранить
								</MDBBtn>
								<MDBBtn type='submitDelete' style={btnStyle('4rem')} color='danger' onClick={() => deleteProject()}>
									<MDBIcon far icon='trash-alt' />
								</MDBBtn>
							</MDBModalFooter>
						</MDBModalContent>
					</MDBModalDialog>
				</form>
			</MDBModal>
		</>
	);
}
