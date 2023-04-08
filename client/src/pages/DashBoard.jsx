/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import { base_url } from '../utils';

const DashBoard = () => {
  const [transactions, setTransactions] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [machineId, setMachineId] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [date, setDate] = useState('');

  const getTransactions = async () => {
    try {
      const res = await axios.get(
        `${base_url}/transaction?machineId=${machineId}&cardNo=${cardNo}&date=${date}`
      );
      const data = res.data;
      setTransactions(data);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [fetchAgain]);

  const filterHandler = () => {
    setFetchAgain(!fetchAgain);
  };

  return (
    <div>
      <NavbarComponent />
      <div className="dashboard-input-container">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search By Machine ID"
            aria-label="Machine ID"
            aria-describedby="basic-addon2"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
          />
          <Button
            className="bg-dark text-light"
            variant="outline-secondary"
            id="button-addon2"
            onClick={filterHandler}
          >
            Filter
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search By Card No"
            aria-label="Card No"
            aria-describedby="basic-addon2"
            value={cardNo}
            onChange={(e) => setCardNo(e.target.value)}
          />
          <Button
            className="bg-dark text-light min-vw-10"
            variant="outline-secondary"
            id="button-addon2"
            onClick={filterHandler}
          >
            Filter
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            type="date"
            aria-label="Date"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              let date = e.target.value.split('-').map(Number);
              date = date.reverse().join('/');
              console.log('date: ', date);
              setDate(date);
            }}
          />
          <Button
            className="bg-dark text-light"
            variant="outline-secondary"
            id="button-addon2"
            onClick={filterHandler}
          >
            Filter
          </Button>
        </InputGroup>
      </div>
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

export default DashBoard;
