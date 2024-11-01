import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Users: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById } = useAppContext();
  const user = getUserById(Number(id));

  console.log(id);
  

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name.first} {user.name.last}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Status: {user.status}</p>
      <p>Organization: {user.organization}</p>
      <p>Date Joined: {user.dateJoined}</p>
      <p>Marital Status: {user.marital}</p>
      <p>Loan: {user.loan ? 'Yes' : 'No'}</p>
      <p>Savings: {user.savings ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Users;
