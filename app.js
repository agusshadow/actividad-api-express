import express from 'express';
import studentsRoute from './routes/students.route.js';

const app = express();
const PORT = 2023;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', studentsRoute);

app.listen(PORT, () => {
    console.log(`Listening in: ${PORT}`);
})