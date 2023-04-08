import { Router } from 'express';
import {
  getTransactions,
  registerNewTransaction,
} from '../controllers/TransactionController.js';

//create a router
const transactionRoute = Router();

//api endpoints with controller functions
transactionRoute.get('/', getTransactions);
transactionRoute.post('/:machineId', registerNewTransaction);

//export the router
export default transactionRoute;
