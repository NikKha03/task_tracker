import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../api/ApiHandlers';

export default function CreateTab({ isOpen, toggle }) {
    const [searchParams] = useSearchParams();
    const { setProjectTrigger } = useContext(AuthContext);

    const createTab = (tabName) => {
        api.createTab(tabName, parseInt(searchParams.get('project'))).then((isCreated) => {
            if (isCreated) setProjectTrigger(true);
        });
    };

    const handleSubmitSave = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        createTab(data.get('tabName'));
        toggle();
    };

    return (
        <>
            <MDBModal open={isOpen} onClose={toggle} tabIndex="-1">
                <MDBModalDialog size="lg">
                    <MDBModalContent className="modal-content">
                        <MDBModalHeader>
                            <MDBModalTitle>Создать доску</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggle}></MDBBtn>
                        </MDBModalHeader>
                        <form onSubmit={handleSubmitSave}>
                            <MDBModalBody>
                                <p style={{ marginBottom: '0.25rem' }}>Название доски</p>
                                <MDBInput name="tabName" autoComplete="off" />
                            </MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn type="submitSave" style={{ width: '100%', boxShadow: 'none', borderRadius: '4px' }} color="success">
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
