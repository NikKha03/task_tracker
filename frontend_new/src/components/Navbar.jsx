import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import ChangeProject from './modal/ChangeProject';
import Tab from './task/ Tab';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup,
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBNavbarLink,
} from 'mdb-react-ui-kit';

const names = [
  { name: 'Нужно сделать', icon: <MDBIcon far size="lg" icon="folder" /> },
  { name: 'В работе', icon: <MDBIcon far size="lg" icon="folder" /> },
  { name: 'Просроченные', icon: <MDBIcon far size="lg" icon="folder" /> },
  { name: 'Завершенные', icon: <MDBIcon far size="lg" icon="folder" /> },
];

export default function Navbar({ pageType }) {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);
  const { project } = useContext(AppContext);

  const [idClicked, setIdClicked] = useState(0);
  const taskStatus = (id, icon, name) => {
    return (
      <div
        className={`task-status ${idClicked === id ? 'active' : ''}`}
        key={id}
        onClick={() => setIdClicked(id)}
      >
        <div style={{ display: 'flex' }}>
          <div className="icon">{icon}</div>
          <h2 className="lite">{name}</h2>
        </div>
      </div>
    );
  };

  const projBlokForList = () => {
    return (
      <>
        <div className="top">{/* <h4>t</h4> */}</div>
        <div className="bottom" style={{ padding: '0' }}>
          {names.map((obj, i) => taskStatus(i, obj.icon, obj.name))}
        </div>
      </>
    );
  };

  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const projBlokForBoard = () => {
    return (
      <>
        <div className="top">
          <div className="proj-h">
            <h2 style={{ fontSize: '1.25rem' }}>{project.name}</h2>
            <MDBIcon
              fas
              icon="cog"
              size="1x"
              onClick={toggleOpen}
              style={{ color: '#b3b3b3', cursor: 'pointer' }}
            />
            <ChangeProject isOpen={basicModal} toggle={toggleOpen} />
          </div>
        </div>
        <div className="bottom">
          <Tab />
        </div>
      </>
    );
  };

  const manageProjBlok = () => {
    switch (pageType) {
      case 'list':
        return projBlokForList();
      case 'board':
        return projBlokForBoard();
    }
  };

  // useEffect(() => {}, []);

  return (
    <MDBNavbar className="navbar">
      <div className="profile-block" onClick={() => navigate('/profile/')}>
        <MDBIcon
          className="user-icon"
          style={{ cursor: 'pointer' }}
          size="2x"
          fas
          icon="user-circle"
        />
        <h2 className="lite" style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
          {/* {user.fullName} */}
        </h2>
      </div>
      <div className="nav-m">{manageProjBlok()}</div>
    </MDBNavbar>
  );
}
