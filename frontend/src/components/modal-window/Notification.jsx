import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

export default function Notification({ isOpen, toggle }) {
	return (
		<>
			<MDBModal open={isOpen} onClose={toggle} tabIndex='-1'>
				<MDBModalDialog size='lg'>
					<MDBModalContent className='modal-content'>
						<MDBModalHeader>
							<MDBModalTitle>Уведомления</MDBModalTitle>
							<MDBBtn className='btn-close' color='none' onClick={toggle}></MDBBtn>
						</MDBModalHeader>
						{/* <form onSubmit={handleSubmitSave}> */}
						<MDBModalBody>
							<p style={{ marginBottom: '0.25rem' }}>У вас нет непрочитанных уведомлений</p>
							{/* <MDBInput name='projectName' defaultValue={project.name} autoComplete='off' /> */}
						</MDBModalBody>

						{/* <MDBModalFooter style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
									<MDBBtn type='submitSave' style={btnStyle('calc(100% - 5rem)')} color='success'>
										Сохранить
									</MDBBtn>
									<MDBBtn type='submitDelete' style={btnStyle('4rem')} color='danger' onClick={() => deleteProject()}>
										<MDBIcon far icon='trash-alt' />
									</MDBBtn>
								</MDBModalFooter> */}
						{/* </form> */}
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}
