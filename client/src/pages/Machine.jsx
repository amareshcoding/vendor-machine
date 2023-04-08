import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { base_url } from '../utils';
import NavbarComponent from '../components/Navbar';
import { Toast, ToastContainer } from 'react-bootstrap';

const Machine = () => {
  const [show, setShow] = useState(false);
  const [bg, setBg] = useState('success');
  const [toastMassage, setToastMassage] = useState('');

  const machineId = '64303462225a4b173b8d3503';
  const [machine, setMachine] = useState({});
  const [machineInputs, setMachineInputs] = useState({
    cardNo: '',
    slot: '',
  });

  const getMachine = async () => {
    try {
      const res = await axios.get(`${base_url}/machine/${machineId}`);
      const data = res.data;
      setMachine(data);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const registerNewTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${base_url}/transaction/${machineId}`,
        machineInputs
      );
      const data = res.data;
      console.log('data: ', data);

      if (data.message === 'Transaction Success') {
        setToastMassage('Transaction Success!');
        setBg('success');
        setShow(true);
      } else {
        setToastMassage('Transaction Field!');
        setBg('danger');
        setShow(true);
      }
    } catch (err) {
      setToastMassage('Error occurred!');
      setBg('danger');
      setShow(true);
    } finally {
      setMachineInputs({
        cardNo: '',
        slot: '',
      });
    }
  };

  useEffect(() => {
    getMachine();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="Auth-form-container" style={{ marginTop: '-40px' }}>
        <form onSubmit={registerNewTransaction} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Vendor Machine</h3>
            <p className="fs-5 mt-1 mb-1">Company: {machine?.companyName}</p>
            <p className="fs-5 mt-0 mb-1">
              Location: {machine?.installLocation}
            </p>
            <p className="fs-5">About: {machine?.description}</p>

            <div className="form-group mt-3">
              <label>Card No</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter card number"
                value={machineInputs.cardNo}
                onChange={(e) =>
                  setMachineInputs({
                    ...machineInputs,
                    cardNo: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Slot</label>
              <select
                className="form-control mt-1"
                onChange={(e) =>
                  setMachineInputs({
                    ...machineInputs,
                    slot: e.target.value,
                  })
                }
              >
                <option value="">Choose One</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="A3">A3</option>
              </select>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <ToastContainer className="p-3" position={'top-center'}>
          <Toast
            bg={bg}
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">{toastMassage}</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
};

export default Machine;
