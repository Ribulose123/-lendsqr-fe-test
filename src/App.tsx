import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Users from './pages/Users';
import Customers from './pages/Customers';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/users/:id" element={<Users />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </AppProvider>
  );
};

export default App;
