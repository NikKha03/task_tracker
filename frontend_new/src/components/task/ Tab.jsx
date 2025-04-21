import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import CreateTab from '../modal/CreateTab';
import ChangeTab from '../modal/ChangeTab';

import { MDBIcon } from 'mdb-react-ui-kit';

export default function Tab() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { tabIdClicked, setTabIdClicked, tabs } = useContext(AppContext);

	const [basicModal, setBasicModal] = useState(false);
	const toggleOpen = () => setBasicModal(!basicModal);

	const [tabToEdit, setTabToEdit] = useState({});
	const [basicModalTab, setBasicModalTab] = useState(false);

	const toggleOpenTab = () => setBasicModalTab(!basicModalTab);

	const params = `?project=${searchParams.get('project')}`;

	const clickTab = id => {
		setTabIdClicked(id);
		navigate(params + '&tab=' + id);
	};

	// if (searchParams.has('project') && !searchParams.has('tab') && sortedTabs.length > 0) {
	// 	clickTab(sortedTabs[0].tabId);
	// }

	// useEffect(() => {
	// 	if (sortedTabs === undefined || sortedTabs.length <= 0) return;
	// 	if (!searchParams.has('tab') && sortedTabs.length > 0) {
	// 		clickTab(sortedTabs[0].tabId);
	// 	}
	// }, [projectIdClicked]);

	const changeTab = tab => {
		setTabToEdit(tab);
		toggleOpenTab();
	};

	useEffect(() => {
		if (tabs === undefined || tabs.length <= 0) return;
	}, [tabs]);

	// console.log(searchParams.has('tab'));

	return (
		<>
			{tabs.map(tab => (
				<div className={`tab ${tabIdClicked === tab.tabId ? 'active' : ''}`} onClick={() => clickTab(tab.tabId)} key={tab.tabId}>
					<a>{tab.name}</a>
					<MDBIcon fas icon='ellipsis-v' style={{ marginLeft: '1rem', height: '1rem', width: '1rem', textAlign: 'center' }} onClick={() => changeTab(tab)} />
				</div>
			))}

			<div className='tab' onClick={toggleOpen}>
				+
			</div>
			<CreateTab isOpen={basicModal} toggle={toggleOpen} />
			<ChangeTab tab={tabToEdit} isOpen={basicModalTab} toggle={toggleOpenTab} />
		</>
	);
}
