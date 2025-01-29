import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<AdminDashboard />} /> {/* Temporary default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
