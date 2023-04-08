import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoConnect from './config/db.js';
import employeeRoute from './routers/EmployeeRoute.js';
import machineRoute from './routers/MachineRoute.js';
import transactionRoute from './routers/TransactionsRoute.js';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//Home Route
app.get('/', (req, res) => {
  res.send('Home Route!');
});

//General Routes
app.use('/api/employee', employeeRoute);
app.use('/api/machine', machineRoute);
app.use('/api/transaction', transactionRoute);

//Port
const PORT = process.env.PORT || 8000;

//Server Listening
app.listen(PORT, async () => {
  try {
    //connect with mongodb
    await mongoConnect();
    console.log(`server listening on port ${PORT}`);
  } catch (err) {
    console.log('err: ', err);
  }
});
