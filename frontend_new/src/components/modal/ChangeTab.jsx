import React, { useContext } from 'react';
import axios from 'axios';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

import { AuthContext } from '../../context/AuthContext';
import { AppContext } from '../../context/AppContext';
import { changeTabPath, deleteTabPath } from '../../resources/ApiPath';

const btnStyle = width => {
	return { width: width, boxShadow: 'none', borderRadius: '4px' };
};

export default function ChangeTab({ tab, isOpen, toggle }) {
	const { setTrigger } = useContext(AuthContext);
	const { setTabIdClicked } = useContext(AppContext);

	const changeTab = async (id, tabName) => {
		if (tabName.trim().length < 1) return null;
		try {
			const response = await axios.put(
				changeTabPath(id),
				{
					name: tabName.trim(),
				},
				{ withCredentials: true }
			);
			setTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const deleteTab = async id => {
		try {
			const response = await axios.delete(deleteTabPath(id), { withCredentials: true });
			setTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		changeTab(tab.tabId, data.get('tabName'));
		toggle();
	};

	return (
		<>
			<MDBModal open={isOpen} onClose={toggle} tabIndex='-1'>
				<form onSubmit={handleSubmitSave}>
					<MDBModalDialog size='lg'>
						<MDBModalContent className='modal-content'>
							<MDBModalHeader>
								<MDBModalTitle>Редактировать вкладку</MDBModalTitle>
								<MDBBtn className='btn-close' color='none' onClick={toggle}></MDBBtn>
							</MDBModalHeader>

							<MDBModalBody>
								<p style={{ marginBottom: '0.25rem' }}>Название вкладки</p>
								<MDBInput name='tabName' defaultValue={tab.name} autoComplete='off' />
							</MDBModalBody>

							<MDBModalFooter>
								<MDBBtn type='submitSave' style={btnStyle('calc(100% - 5rem)')} color='success'>
									Сохранить
								</MDBBtn>
								<MDBBtn type='submitDelete' style={btnStyle('4rem')} color='danger' onClick={() => deleteTab(tab.tabId)}>
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
