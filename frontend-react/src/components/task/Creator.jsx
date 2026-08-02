import { useEffect, useState } from 'react';
import api from '../../api/ApiHandlers';
import { AppContext } from '../../context/AppContext';

export function Creator({ username }) {
    let [creator, setCreator] = useState(null);

    useEffect(() => {
        api.getUserByUsername(username, setCreator).then((fio) => {
            if (fio) setCreator(`${fio.firstName} ${fio.lastName}`);
        });
    }, []);

    return (
        <>
            {creator === null ? null : (
                <div className="field">
                    <label>Создатель</label>
                    <input
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
