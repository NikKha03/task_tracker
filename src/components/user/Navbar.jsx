import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Navbar({ mode }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem
				onClick={() => {
					location.href = '/task-tracker/profile';
				}}
			>
				Профиль
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
		</Menu>
	);

	return (
		<Box container sx={{ flexGrow: 1 }}>
			<AppBar position='static' sx={{ paddingLeft: 2.3, paddingRight: 2.3, backgroundColor: '#050e5c' }}>
				<Toolbar>
					<Typography variant='h4' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
						Task tracker
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{mode}
						<IconButton size='large' edge='end' aria-label='account of current user' aria-controls={menuId} aria-haspopup='true' onClick={handleProfileMenuOpen} color='inherit'>
							<AccountCircle />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMenu}
		</Box>
	);
}
