import { Request, Response } from 'express';

interface Task {
  id: string;
  title: string;
  description: string;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

let tasks: Task[] = [];

const generateId = (): string => {
  return crypto.randomUUID();
};

export const createTask = (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
    return;
  }

  const newTask: Task = {
    id: generateId(),
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

export const getAllTasks = (req: Request, res: Response) => {
  const { title, description } = req.body;

  let filteredTasks = tasks;
  if (title) {
    filteredTasks = filteredTasks.filter((tasks) => tasks.title.includes(title as string));
  }

  if (description) {
    filteredTasks = filteredTasks.filter((tasks) => tasks.description.includes(description as string));
  }

  res.json({ tasks: filteredTasks });
};

export const updateTask = (req: Request, res: Response) => {
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

export const removeTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const indexToRemove = tasks.findIndex((task) => task.id === id);

  if (indexToRemove === -1) {
    res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(indexToRemove, 1);

  res.json({ message: 'Task removed sucessfully' });
};

export const markTaskComplete = (req: Request, res: Response) => {
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
