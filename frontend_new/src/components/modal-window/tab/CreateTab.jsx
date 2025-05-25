import { useContext } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';

import { AuthContext } from '../../../context/AuthContext';
import { createTabPath } from '../../../resources/ApiPath';

export default function CreateTab({ isOpen, toggle }) {
	const [searchParams] = useSearchParams();
	const { setProjectTrigger } = useContext(AuthContext);

	const createTab = async tabName => {
		if (tabName.trim().length < 1) return null;
		try {
			await axios.post(
				createTabPath,
				{
					name: tabName.trim(),
					projectId: parseInt(searchParams.get('project')),
				},
				{ withCredentials: true }
			);
			setProjectTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		createTab(data.get('tabName'));
		toggle();
	};

	return (
		<>
			<MDBModal open={isOpen} onClose={toggle} tabIndex='-1'>
				<MDBModalDialog size='lg'>
					<MDBModalContent className='modal-content'>
						<MDBModalHeader>
							<MDBModalTitle>Создать вкладку</MDBModalTitle>
							<MDBBtn className='btn-close' color='none' onClick={toggle}></MDBBtn>
						</MDBModalHeader>
						<form onSubmit={handleSubmitSave}>
							<MDBModalBody>
								<p style={{ marginBottom: '0.25rem' }}>Название вкладки</p>
								<MDBInput name='tabName' autoComplete='off' />
							</MDBModalBody>

							<MDBModalFooter>
								<MDBBtn type='submitSave' style={{ width: '100%', boxShadow: 'none', borderRadius: '4px' }} color='success'>
									Создать
								</MDBBtn>
							</MDBModalFooter>
						</form>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}
