import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './pages/Auth';
import DashBoard from './pages/DashBoard';
import { Routes, Route } from 'react-router-dom';
import Machine from './pages/Machine';
import FailedTransaction from './pages/FailedTransaction';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/machine" element={<Machine />} />
        <Route path="/machine" element={<Machine />} />
        <Route path="/failedtransactions" element={<FailedTransaction />} />
      </Routes>
    </div>
  );
}

export default App;
