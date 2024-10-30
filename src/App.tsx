import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AnimatePresence>
          <Routes>
            
            <Route path="/" element={<Login />} />
            
           
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </AppProvider>
  );
};


const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default App;
