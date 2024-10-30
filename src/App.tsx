import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import { AnimatePresence } from 'framer-motion';
import Navbar from './pages/Navbar';

const App: React.FC = () => (
  <AppProvider>
    <Router>
    <Navbar/>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  </AppProvider>
);

export default App;
