import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/Dashboard';
import { Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <Box sx={{ 
        margin: 0, 
        padding: 0, 
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}>
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<AdminDashboard />} /> {/* Temporary default route */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
