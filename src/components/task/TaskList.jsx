import CompletedTask from './CompletedTask';
import InProgressTask from './InProgressTask';

export default function TaskList({ status, tasks, task, click, changeOnNotChecked, changeOnChecked }) {
	switch (status) {
		case 'COMPLETED':
			return <CompletedTask tasks={tasks} task={task} click={click} change={changeOnNotChecked} />;
		case 'IN_PROGRESS':
			return <InProgressTask tasks={tasks} task={task} click={click} change={changeOnChecked} />;
	}
}
