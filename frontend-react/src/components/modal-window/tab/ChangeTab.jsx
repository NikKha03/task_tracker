import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdb-react-ui-kit';

import { AuthContext } from '../../../context/AuthContext';
import { AppContext } from '../../../context/AppContext';
import api from '../../../api/ApiHandlers';

const btnStyle = (width) => {
    return { width: width, boxShadow: 'none', borderRadius: '4px' };
};

export default function ChangeTab({ tab, isOpen, toggle }) {
    const navigate = useNavigate();

    const { setProjectTrigger } = useContext(AuthContext);
    const { projectIdClicked, tabIdClicked, setTabIdClicked } = useContext(AppContext);

    const deleteTab = (id) => {
        api.deleteTab(id).then((isDeleted) => {
            if (isDeleted) {
                setProjectTrigger(true);
                setTabIdClicked(NaN);
                tabIdClicked === id && navigate(`/board?project=${projectIdClicked}`);
            }
        });
    };

    const handleSubmitSave = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        api.changeTab(data.get('tabName'), tab.tabId).then((isChanged) => {
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
                            <MDBModalTitle>Редактировать доску</MDBModalTitle>
                            <MDBBtn className="btn-close btn-close-white" color="none" onClick={toggle}></MDBBtn>
                        </MDBModalHeader>
                        <form onSubmit={handleSubmitSave}>
                            <MDBModalBody>
                                <p style={{ marginBottom: '0.25rem' }}>Название доски</p>
                                <input name="tabName" defaultValue={tab.name} autoComplete="off" />
                            </MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn type="submitSave" style={btnStyle('calc(100% - 5rem)')} color="success">
                                    Сохранить
                                </MDBBtn>
                                <MDBBtn type="submitDelete" style={btnStyle('4rem')} color="danger" onClick={() => deleteTab(tab.tabId)}>
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
