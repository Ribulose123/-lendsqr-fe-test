import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById } = useAppContext();
  const customer = getUserById(parseInt(id || '0'));

  if (!customer) return <div>Customer not found</div>;

  return (
    <div>
      <h1>Customer Details</h1>
      <p><strong>Name:</strong> {customer.name.first} {customer.name.last}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Organization:</strong> {customer.organization}</p>
      <p><strong>Status:</strong> {customer.status}</p>
      <p><strong>Date Joined:</strong> {customer.dateJoined}</p>
      <p><strong>Marital Status:</strong> {customer.marital}</p>
      <p><strong>Loan:</strong> {customer.loan ? 'Yes' : 'No'}</p>
      <p><strong>Savings:</strong> {customer.savings ? 'Yes' : 'No'}</p>
      <p><strong>Children:</strong> {customer.children ? 'Yes' : 'No'}</p>
      <p><strong>Salary:</strong> ${customer.salary}</p>
    </div>
  );
};

export default User;
