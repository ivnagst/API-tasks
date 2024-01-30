import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use('/tasks', taskRoutes);


app.listen(PORT, () => {
  console.log(`The API is running on http://localhost:${PORT}`);
});
