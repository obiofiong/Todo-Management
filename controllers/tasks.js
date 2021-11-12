const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});
	// res.status(201).json({ tasks });
	// res.status(201).json({ tasks, amount: tasks.length });
	// res.status(201).json({ success:true, data={tasks} });
	res.status(201).json({ status: "success", data: { tasks } });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });
	if (!task) {
		const Error = new Error("Not found");
		Error.status = 404;
		return res
			.status(404)
			.json({ message: `No Task Found with id ${taskID}` });
	}
	res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!task) {
		return res
			.status(404)
			.json({ message: `No Task Found with id ${taskID}` });
	}
	res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });
	if (!task) {
		return res
			.status(404)
			.json({ message: `No Task Found with id ${taskID}` });
	}
	res.status(201).json({ task });
	// res.status(201).send();
	// res.status(201).json({ task :null}, status:'success');
});

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
