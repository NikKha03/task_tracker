import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

export default function CreateProject({ isOpen, toggle }) {
	return (
		<>
			<MDBModal open={isOpen} onClose={toggle} tabIndex='-1'>
				<MDBModalDialog>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Modal title</MDBModalTitle>
							<MDBBtn className='btn-close' color='none' onClick={toggle}></MDBBtn>
						</MDBModalHeader>
						<MDBModalBody>Modal body text goes here.</MDBModalBody>

						<MDBModalFooter>
							<MDBBtn color='secondary' onClick={toggle}>
								Close
							</MDBBtn>
							<MDBBtn>Save changes</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}
