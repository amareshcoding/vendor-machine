import { Router } from 'express';
import {
  createMachine,
  deleteMachine,
  getAllMachine,
  getOneMachine,
  updateMachine,
} from '../controllers/MachineController.js';

//create a router
const machineRoute = Router();

//api endpoints with controller functions
machineRoute.get('/', getAllMachine);
machineRoute.get('/:id', getOneMachine);
machineRoute.post('/', createMachine);
machineRoute.put('/:id', updateMachine);
machineRoute.delete('/:id', deleteMachine);

//export the router
export default machineRoute;
