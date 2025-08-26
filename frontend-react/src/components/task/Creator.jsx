import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { MDBInput } from 'mdb-react-ui-kit';

export function Creator({ username }) {
	const { api } = useContext(AppContext);
	let [creator, setCreator] = useState(null);

	useEffect(() => {
		api.getUserByUsername(username, setCreator);
	}, []);

	return (
		<>
			{creator === null ? null : (
				<div>
					<h2 style={{ fontSize: '1.25rem' }}>Создатель</h2>
					<MDBInput style={{ height: '2.25rem', backgroundColor: '#ffffff', color: '#9e9e9e' }} name='creator' type='text' autoComplete='off' defaultValue={creator} disabled />
				</div>
			)}
		</>
	);
}
