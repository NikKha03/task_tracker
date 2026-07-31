import { useEffect, useState } from 'react';
import api from '../../api/ApiHandlers';
import { AppContext } from '../../context/AppContext';
import { MDBInput } from 'mdb-react-ui-kit';

export function Creator({ username }) {
    let [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchFio = async () => {
            const fio = await api.getUserByUsername(username, setCreator);
            if (fio) setCreator(`${fio.firstName} ${fio.lastName}`);
        };
        fetchFio();
    }, []);

    return (
        <>
            {creator === null ? null : (
                <div>
                    <h2 style={{ fontSize: '1.25rem' }}>Создатель</h2>
                    <MDBInput
                        style={{ height: '2.25rem', opacity: 0.75 }}
                        className="selector"
                        name="creator"
                        type="text"
                        autoComplete="off"
                        defaultValue={creator}
                        disabled
                    />
                </div>
            )}
        </>
    );
}
