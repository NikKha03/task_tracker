import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/ApiHandlers';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdb-react-ui-kit';
import { AuthContext } from '../../../context/AuthContext';
import { AppContext } from '../../../context/AppContext';

const btnStyle = (width) => {
    return { width: width, boxShadow: 'none', borderRadius: '4px' };
};

export default function ChangeProject({ isOpen, toggle }) {
    const { setProjectTrigger } = useContext(AuthContext);
    const { project } = useContext(AppContext);
    const navigate = useNavigate();

    const deleteProject = () => {
        api.deleteProject(project.projectId).then((isDeleted) => {
            if (isDeleted) {
                navigate('/list/');
                setProjectTrigger(true);
            }
        });
    };

    const handleSubmitSave = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        api.changeProject(data.get('projectName'), project.projectId).then((isChanged) => {
            if (isChanged) setProjectTrigger(true);
        });
        toggle();
    };

    return (
        <>
            <MDBModal open={isOpen} onClose={toggle} tabIndex="-1">
                <MDBModalDialog size="lg">
                    <MDBModalContent className="modal-content">
                        <MDBModalHeader>
                            <MDBModalTitle>Редактировать проект</MDBModalTitle>
                            <MDBBtn className="btn-close btn-close-white" color="none" onClick={toggle}></MDBBtn>
                        </MDBModalHeader>
                        <form onSubmit={handleSubmitSave}>
                            <MDBModalBody>
                                <p style={{ marginBottom: '0.25rem' }}>Название проекта</p>
                                <input name="projectName" defaultValue={project.name} autoComplete="off" />
                            </MDBModalBody>

                            <MDBModalFooter style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <MDBBtn type="submitSave" style={btnStyle('calc(100% - 5rem)')} color="success">
                                    Сохранить
                                </MDBBtn>
                                <MDBBtn type="submitDelete" style={btnStyle('4rem')} color="danger" onClick={() => deleteProject()}>
                                    <MDBIcon far icon="trash-alt" />
                                </MDBBtn>
                            </MDBModalFooter>
                        </form>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
