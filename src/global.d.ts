type Task = {
	title: string;
	createdDate: string;
	dueDate: string;
};

interface TaskColumn {
	title: string;
	tasks: Task[];
}