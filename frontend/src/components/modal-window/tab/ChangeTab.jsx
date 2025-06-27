import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

import { AuthContext } from '../../../context/AuthContext';
import { AppContext } from '../../../context/AppContext';
import { changeTabPath, deleteTabPath } from '../../../api/apiPath';

const btnStyle = width => {
	return { width: width, boxShadow: 'none', borderRadius: '4px' };
};

export default function ChangeTab({ tab, isOpen, toggle }) {
	const navigate = useNavigate();

	const { setProjectTrigger } = useContext(AuthContext);
	const { projectIdClicked, tabIdClicked, setTabIdClicked } = useContext(AppContext);

	const changeTab = async (id, tabName) => {
		if (tabName.trim().length < 1) return null;
		try {
			await axios.put(
				changeTabPath(id),
				{
					name: tabName.trim(),
				},
				{ withCredentials: true }
			);
			setProjectTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const deleteTab = async id => {
		try {
			await axios.delete(deleteTabPath(id), { withCredentials: true });
			setProjectTrigger(true);
			setTabIdClicked(NaN);
			tabIdClicked === id && navigate(`/board?project=${projectIdClicked}`);
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
				<MDBModalDialog size='lg'>
					<MDBModalContent className='modal-content'>
						<MDBModalHeader>
							<MDBModalTitle>Редактировать доску</MDBModalTitle>
							<MDBBtn className='btn-close' color='none' onClick={toggle}></MDBBtn>
						</MDBModalHeader>
						<form onSubmit={handleSubmitSave}>
							<MDBModalBody>
								<p style={{ marginBottom: '0.25rem' }}>Название доски</p>
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
						</form>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}
