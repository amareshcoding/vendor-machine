import { Router } from 'express';
import {
  login,
  register,
  update,
  deleteEmployee,
} from '../controllers/EmployeeController.js';

//create a router
const employeeRoute = Router();

//api endpoints with controller functions
employeeRoute.post('/register', register);
employeeRoute.post('/login', login);
employeeRoute.put('/update/:id', update);
employeeRoute.delete('/delete/:id', deleteEmployee);

//export the router
export default employeeRoute;
