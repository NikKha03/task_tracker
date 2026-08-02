import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectFromMembers({ member, setMember }) {
    const { project, usernameAndName } = useContext(AppContext);
    const { user } = useContext(AuthContext);

    const handleChange = (event) => {
        setMember(event.target.value);
    };

    return window.location.pathname === '/list' ? (
        <>
            <select disabled value={user.name} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }}>
                <option value={user.name}>{user.fullName}</option>
            </select>
        </>
    ) : (
        <>
            {project && project.team ? (
                <>
                    <select displayEmpty value={member} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }}>
                        <option value="">Нет</option>
                        {project.team.map((item) => (
                            <option key={item.id} value={item.username}>
                                {usernameAndName[item.username]}
                            </option>
                        ))}
                    </select>
                </>
            ) : (
                <>
                    <select displayEmpty value={member} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }}>
                        {/* <MenuItem value=''>Нет</MenuItem> */}
                    </select>
                </>
            )}
        </>
    );
}
