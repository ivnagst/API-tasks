import express from 'express';
import { createTask, getAllTasks, updateTask, removeTask, markTaskComplete } from '../controllers/taskController';

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.put('/:id', updateTask);
router.delete('/:id', removeTask);
router.patch('/:id/complete', markTaskComplete);
// router.post('/import', importTasks)

export default router;
