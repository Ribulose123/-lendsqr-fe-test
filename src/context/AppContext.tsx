// src/context/AppContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  users: User[];
  setUsers(value: React.SetStateAction<User[]>): void;
  userName: string; 
  login: (name: string) => void;
  logout: () => void;
  getUserById: (id: number) => User | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userName, setUserName] = useState<string>(''); 
  const [users, setUsers] = useState<User[]>([]);

  const login = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem('isAuthenticated', 'true');
    console.log('User logged in:', name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(''); 
    localStorage.removeItem('isAuthenticated');
  };

  const getUserById = (id: number) => users.find((user) => user.id === id);

  return (
    <AppContext.Provider value={{ isAuthenticated, users, setUsers, userName, login, logout, getUserById }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
