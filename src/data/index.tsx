import { useQuery, useMutation } from "@tanstack/react-query";

const taskTemplate: TaskColumn[] = [
	{
		title: "Backlog",
		status: "0",
		tasks: [],
	},
	{
		title: "In Progress",
		status: "1",
		tasks: [],
	},
	{
		title: "Review",
		status: "2",
		tasks: [],
	},
	{
		title: "Done",
		status: "3",
		tasks: [],
	},
];

// Local Storage CRUD Query Functions
async function createTask(newTask: Task) {
	console.log("newTask", newTask);
	const taskColumns: TaskColumn[] = await fetchTaskColumns();
	const taskColumnToUpdate = taskColumns.find(
		(column) => column.status === newTask.status
	);

	console.log("taskColumnToUpdate", taskColumnToUpdate);
	if (!taskColumnToUpdate) {
		alert("error!");
		return;
	}

	const oldTaskColumns = taskColumns.filter(
		(col) => col.status !== newTask.status
	);

	const newColumn: TaskColumn = {
		title: taskColumnToUpdate.title,
		status: taskColumnToUpdate.status,
		tasks: [newTask, ...taskColumnToUpdate.tasks],
	};

	const updatedTasks = [...oldTaskColumns, newColumn];
	localStorage.setItem("task-tracker", JSON.stringify(updatedTasks));
	return updatedTasks;
}

async function fetchTaskColumns() {
	const storedTasks = localStorage?.getItem("task-tracker");
	const tasks = storedTasks ? JSON.parse(storedTasks) : taskTemplate;
	return tasks;
}

async function updateTask(taskToUpdate: Task) {
	const tasks = await fetchTaskColumns();
	const updatedTasks = tasks.map((task: Task) =>
		task.id === taskToUpdate.id ? taskToUpdate : task
	);
	localStorage.setItem("task-tracker", JSON.stringify(updatedTasks));
	return updatedTasks;
}

async function deleteTask(taskId: string) {
	const tasks = await fetchTaskColumns();
	const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
	localStorage.setItem("task-tracker", JSON.stringify(updatedTasks));
}

export function useTasks() {
	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ["task-tracker"],
		queryFn: fetchTaskColumns,
		initialData: taskTemplate,
	});

	const createTaskMutation = useMutation({
		mutationFn: createTask,
		onSuccess: () => refetch(),
	});

	const updateTaskMutation = useMutation({
		mutationFn: updateTask,
		onSuccess: () => refetch(),
	});

	const deleteTaskMutation = useMutation({
		mutationFn: deleteTask,
		onSuccess: () => refetch(),
	});

	return {
		tasks: data as TaskColumn[],
		error,
		isLoading,
		createTask: (newTask: Task) => createTaskMutation.mutate(newTask),
		updateTask: (taskToMutate: Task) => updateTaskMutation.mutate(taskToMutate),
		deleteTask: (taskId: string) => deleteTaskMutation.mutate(taskId),
	};
}
