import React from 'react';
import SignUp from './Authentication/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './Authentication/login';
import ForgotPasword from './Authentication/ForgotPasword';
import './index.css'
import Invoice from './Dashboard/Invoice';


export default function App() {
  return (
    <div style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/test" element={<Login />} />          
          <Route path="/auth/forgot-password" element={<ForgotPasword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="invoice/:invoiceId" element={<Invoice />} />
          {/* <Route path="/goal/:goalId" element={} /> */}
        </Routes>
      </Router>
    </div>
  );
}