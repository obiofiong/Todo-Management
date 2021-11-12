const Task = require("../models/Task");
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {
	try {
		const tasks = await Task.find({});
		// res.status(201).json({ tasks });
		// res.status(201).json({ tasks, amount: tasks.length });
		// res.status(201).json({ success:true, data={tasks} });
		res.status(201).json({ status:"success", data={tasks} });
	} catch (error) {
		res.status(500).json({ message: error });
	}
})

const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json({ task });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const getTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findOne({ _id: taskID });
		if (!task) {
			return res
				.status(404)
				.json({ message: `No Task Found with id ${taskID}` });
		}
		res.status(201).json({ task });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const updateTask = async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const deleteTask = async (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
