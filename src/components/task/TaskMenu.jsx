import * as React from 'react';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LightModeIcon from '@mui/icons-material/LightMode';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InboxIcon from '@mui/icons-material/Inbox';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function TaskMenu({ create, onTheDay, onOtherDays, onSomeDays, completed, incomplete }) {
	return (
		<React.Fragment>
			<List disablePadding sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
				<Button sx={{ width: '100%', marginBottom: 1 }} onClick={() => create()}>
					<Stack sx={{ width: '100%', alignItems: 'center' }} direction='row'>
						<AddCircleOutlineIcon sx={{ color: 'green' }} />
						<Typography sx={{ fontSize: 22 }} ml={1} variant='subtitle1'>
							Создать
						</Typography>
					</Stack>
				</Button>
				<Button sx={{ width: '100%', marginBottom: 1 }} onClick={() => onTheDay()}>
					<Stack sx={{ width: '100%', alignItems: 'center' }} direction='row'>
						<LightModeIcon sx={{ color: 'orange' }} />
						<Typography sx={{ fontSize: 22 }} ml={1} variant='subtitle1'>
							Сегодня
						</Typography>
					</Stack>
				</Button>
				<Button sx={{ width: '100%', marginBottom: 1 }} onClick={() => onOtherDays()}>
					<Stack sx={{ width: '100%', alignItems: 'center' }} direction='row'>
						<CalendarMonthIcon sx={{ color: 'blue' }} />
						<Typography sx={{ fontSize: 22 }} ml={1} variant='subtitle1'>
							В планах
						</Typography>
					</Stack>
				</Button>
				<Button sx={{ width: '100%', marginBottom: 1 }} onClick={() => incomplete()}>
					<Stack sx={{ width: '100%', alignItems: 'center' }} direction='row'>
						<EventBusyIcon sx={{ color: '#dc143c' }} />
						<Typography sx={{ fontSize: 22 }} ml={1} variant='subtitle1'>
							Просрочено
						</Typography>
					</Stack>
				</Button>
				<Button sx={{ width: '100%', marginBottom: 1 }} onClick={() => onSomeDays()}>
					<Stack sx={{ width: '100%', alignItems: 'center' }} direction='row'>
						<InboxIcon sx={{ color: 'purple' }} />
						<Typography sx={{ fontSize: 22 }} ml={1} variant='subtitle1'>
							Когда-нибудь
						</Typography>
					</Stack>
				</Button>
				<Button sx={{ width: '100%', marginBottom: 1 }} onClick={() => completed()}>
					<Stack sx={{ width: '100%', alignItems: 'center' }} direction='row'>
						<CheckCircleOutlineIcon sx={{ color: 'green' }} />
						<Typography sx={{ fontSize: 22 }} ml={1} variant='subtitle1'>
							Завершено
						</Typography>
					</Stack>
				</Button>
			</List>
		</React.Fragment>
	);
}

export default TaskMenu;
