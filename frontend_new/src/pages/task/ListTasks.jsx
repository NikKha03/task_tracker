import Navbar from '../../components/Navbar';
import LeftMenu from '../../components/LeftMenu';

export default function ListTasks() {
	return (
		<>
			<>
				<Navbar pageType={'list'} />
				<div className='task-area'>
					<LeftMenu listIsClicked={true} />
					<div className='main-window'></div>
				</div>
			</>
		</>
	);
}
