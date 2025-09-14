import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import { userInfoPath, changeUserInfoPath } from '../../api/apiPath';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardImage, MDBCardText, MDBCardBody, MDBTypography, MDBIcon, MDBBtn, MDBListGroupItem } from 'mdb-react-ui-kit';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'column',
}));

export default function Profile() {
	const { user } = useContext(AuthContext);

	const changeUserInfo = async (firstName, lastName, email, tg) => {
		const response = await axios
			.put(
				changeUserInfoPath,
				{
					firstName: firstName,
					lastName: lastName,
					email: email,
					tg: tg,
				},
				{
					withCredentials: true,
				}
			)
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	// useEffect(() => {
	// }, []);

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		changeUserInfo(data.get('first-name'), data.get('last-name'), data.get('email'), data.get('Tg'));
	};

	return (
		<section style={{ backgroundColor: '#454545', minHeight: '100vh', height: '100%' }}>
			<MDBContainer className='py-3'>
				<MDBRow className='justify-content-center align-items-center h-100'>
					<MDBCol md='9' lg='7' xl='5' className='mt-5'>
						<MDBCard className='mb-3' style={{ borderRadius: '.5rem', backgroundColor: '#2c2c2c', color: 'white' }}>
							<MDBRow className='g-0'>
								<MDBCol md='8' style={{ width: '100%' }}>
									<MDBCardBody className='p-4'>
										<MDBListGroupItem className='mb-2 rounded-3 d-flex justify-content-between align-items-center'>
											<MDBTypography tag='h6' style={{ marginBottom: 0 }}>
												Информация
											</MDBTypography>
											{/* <MDBBtn floating color='white' size='sm' onClick={() => navigate('/habit-tracker/redaction-profile/', { state: principalUser })}>
												<MDBIcon fas color='#1e1e1e' size='2x' icon='cog' />
											</MDBBtn> */}
										</MDBListGroupItem>
										<hr className='mt-0 mb-4' />
										<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
											<MDBCardImage src='/src/img/profile.jpg' alt='avatar' className='rounded-circle' style={{ width: '150px' }} fluid />
										</div>

										<MDBRow className='pt-1'>
											<MDBCol sm='3'>
												<MDBCardText style={{ fontWeight: '500' }}>Имя:</MDBCardText>
											</MDBCol>
											<MDBCol sm='9'>
												<MDBCardText style={{ textAlign: 'right' }}>{user.fullName}</MDBCardText>
											</MDBCol>
										</MDBRow>
										<hr style={{ margin: '0.5rem 0' }} />
										<MDBRow className='pt-1'>
											<MDBCol sm='3'>
												<MDBCardText style={{ fontWeight: '500' }}>Email:</MDBCardText>
											</MDBCol>
											<MDBCol sm='9'>
												<MDBCardText style={{ textAlign: 'right' }}>{user.email}</MDBCardText>
											</MDBCol>
										</MDBRow>
										<hr style={{ margin: '0.5rem 0' }} />
										<MDBRow className='pt-1'>
											<MDBCol sm='3'>
												<MDBCardText style={{ fontWeight: '500' }}>Username:</MDBCardText>
											</MDBCol>
											<MDBCol sm='9'>
												<MDBCardText style={{ textAlign: 'right' }}>{user.name}</MDBCardText>
											</MDBCol>
										</MDBRow>
										{/* <MDBRow className='pt-1'>
											<MDBCol size='6' className='mb-3' style={{ width: '100%' }}>
												<MDBTypography tag='h6'>Tg</MDBTypography>
												<MDBCardText>@{}</MDBCardText>
											</MDBCol>
										</MDBRow> */}
									</MDBCardBody>
								</MDBCol>
							</MDBRow>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>
	);
}
