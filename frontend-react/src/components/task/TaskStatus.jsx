import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function TaskStatus({ status, setStatus }) {
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <select value={status} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }} displayEmpty>
            <option value="AWAITING_COMPLETION">Нужно сделать</option>
            <option value="IN_PROGRESS">В работе</option>
            <option value="COMPLETED">Готово</option>
        </select>
    );
}
