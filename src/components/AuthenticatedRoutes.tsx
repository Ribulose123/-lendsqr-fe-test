
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from '../pages/Dashboard';

const AuthenticatedRoutes: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  </Routes>
);

export default AuthenticatedRoutes;
