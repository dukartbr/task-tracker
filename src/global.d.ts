type Task = {
	id: string
	title: string;
	createdDate?: string;
	dueDate?: string;
	priority: number;
	status: string;
};

interface TaskColumn {
	title: string;
	status: string;
	tasks: Task[];
}