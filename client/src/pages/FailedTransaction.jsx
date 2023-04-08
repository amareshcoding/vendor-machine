import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import { base_url } from '../utils';

const FailedTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const res = await axios.get(`${base_url}/transaction?failed=${true}`);
      const data = res.data;
      setTransactions(data);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>TransactionId</th>
              <th>Card No</th>
              <th>MachineId</th>
              <th>Machine Location</th>
              <th>Employee Name</th>
              <th>Company Name</th>
              <th>Transaction Status</th>
              <th>Transaction At</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((trans) => (
              <tr key={trans._id}>
                <td>{trans?._id}</td>
                <td>{trans?.cardNo}</td>
                <td>{trans?.machineId?._id}</td>
                <td>{trans?.machineId?.installLocation}</td>
                <td>{trans?.employeeId?.employeeName}</td>
                <td>{trans?.employeeId?.companyName}</td>
                <td>{trans?.transactionStatus ? 'Success' : 'Failed'}</td>
                <td>{trans?.createdAt?.substr(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default FailedTransaction;
