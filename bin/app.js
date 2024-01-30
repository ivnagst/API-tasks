"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use(body_parser_1.default.json());
app.use('/tasks', taskRoutes_1.default);
app.listen(PORT, () => {
    console.log(`The API is running on http://localhost:${PORT}`);
});
