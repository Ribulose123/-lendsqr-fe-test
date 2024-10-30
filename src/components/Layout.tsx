import React from 'react';
import Navbar from '../pages/Navbar';
import { useAppContext } from '../context/AppContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppContext();

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
