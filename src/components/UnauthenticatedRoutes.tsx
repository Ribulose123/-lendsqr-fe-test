
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';

const UnauthenticatedRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
);

export default UnauthenticatedRoutes;
