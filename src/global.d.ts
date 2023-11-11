type Task = {
	id: string
	title: string;
	createdDate?: string;
	dueDate?: string;
	priority: string;
	status: string;
};

interface TaskColumn {
	title: string;
	status: string;
	tasks: Task[];
}