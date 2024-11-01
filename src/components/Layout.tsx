import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import '../styles/Layout.scss'

const Layout: React.FC = () => {
  return (
    <div className='layout'>
      <Navbar />
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
