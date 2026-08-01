import { useContext } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../api/ApiHandlers';

export default function CreateProject({ isOpen, toggle }) {
    const { user, setProjectTrigger } = useContext(AuthContext);

    const handleSubmitSave = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        api.createProject(data.get('projectName'), user.name).then((isCreated) => {
            if (isCreated) setProjectTrigger(true);
        });
        toggle();
    };

    return (
        <>
            <MDBModal open={isOpen} onClose={toggle} tabIndex="-1">
                <MDBModalDialog size="lg">
                    <MDBModalContent className="modal-content">
                        <MDBModalHeader>
                            <MDBModalTitle>Создать проект</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggle}></MDBBtn>
                        </MDBModalHeader>
                        <form onSubmit={handleSubmitSave}>
                            <MDBModalBody>
                                <p style={{ marginBottom: '0.25rem' }}>Название проекта</p>
                                <MDBInput name="projectName" autoComplete="off" />
                            </MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn type="submitSave" className="cust-btn" color="success">
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
