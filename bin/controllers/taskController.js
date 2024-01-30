"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markTaskComplete = exports.removeTask = exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
let tasks = [];
const generateId = () => {
    return self.crypto.randomUUID();
};
const createTask = (req, res) => {
    const { title, description } = req.body;
    if (!title || description) {
        res.status(400).json({ error: 'Title and description are required' });
        return;
    }
    const newTask = {
        id: generateId(),
        title,
        description: '',
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
};
exports.createTask = createTask;
const getAllTasks = (req, res) => {
    const { title, description } = req.body;
    let filteredTasks = tasks;
    if (title) {
        filteredTasks = filteredTasks.filter((tasks) => tasks.title.includes(title));
    }
    if (description) {
        filteredTasks = filteredTasks.filter((tasks) => tasks.description.includes(description));
    }
    res.json({ tasks: filteredTasks });
};
exports.getAllTasks = getAllTasks;
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    taskToUpdate.title = title !== undefined ? title : taskToUpdate.title;
    taskToUpdate.title = description !== undefined ? description : taskToUpdate.description;
    taskToUpdate.updated_at = new Date();
    res.json(taskToUpdate);
};
exports.updateTask = updateTask;
const removeTask = (req, res) => {
    const { id } = req.params;
    const indexToRemove = tasks.findIndex((task) => task.id === id);
    if (indexToRemove === -1) {
        res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(indexToRemove, 1);
    res.json({ message: 'Task removed sucessfully' });
};
exports.removeTask = removeTask;
const markTaskComplete = (req, res) => {
    const { id } = req.params;
    const taskToComplete = tasks.find((task) => task.id === id);
    if (!taskToComplete) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    taskToComplete.completed_at = new Date();
    taskToComplete.updated_at = new Date();
    res.json(taskToComplete);
};
exports.markTaskComplete = markTaskComplete;
