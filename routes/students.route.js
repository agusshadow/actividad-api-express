import { Router } from 'express';
import * as controller from '../controllers/students.controller.js';

const route = Router();

route.get('/students', controller.getStudents);

route.get('/students/:legajo', controller.getStudentByLegajo);

route.post('/students', controller.createStudent);

route.delete('/students/:legajo', controller.deleteStudent)

route.patch('/students/:legajo', controller.editStudent)

export default route;