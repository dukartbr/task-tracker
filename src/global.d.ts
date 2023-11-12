type Task = {
	id: string
	title: string;
	createdDate?: string;
	dueDate?: string;
	editedDate?: string;
	priority: string;
	status: string;
};

interface TaskColumn {
	title: string;
	status: string;
	tasks: Task[];
}