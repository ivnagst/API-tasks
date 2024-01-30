"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
router.post('/', taskController_1.createTask);
router.get('/', taskController_1.getAllTasks);
router.put('/:id', taskController_1.updateTask);
router.delete('/:id', taskController_1.removeTask);
router.patch('/:id/complete', taskController_1.markTaskComplete);
// router.post('/import', importTasks)
exports.default = router;
