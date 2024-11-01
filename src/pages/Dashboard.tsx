
import React from 'react'
import { useAppContext } from '../context/AppContext'
import '../styles/Dashboard.scss'
import Customers from './Customers';

const Dashboard: React.FC = () => {
    const{customers} = useAppContext()


    const customerStats = {
      totalCustomers: customers.length,
      activeUsers: customers.filter(user => user.status === 'active').length,
      customersWithLoans: customers.filter(user => user.loan).length,
      customersWithSavings: customers.filter(user => user.savings).length,
    };
    

   
    
  return(
    <div className='dashboard'>
      <div className="customer-content">
        <div className="customer-stats">
          <div className='total_stats total_users'>
          <img src="/image/icon.png" alt="" />
              <h3>Users</h3>
              <h2>{customerStats.totalCustomers}</h2>
          </div>
          <div className='total_stats total_active'>
            <img src="/image/icon (1).png" alt="" />
              <h3>Active Users</h3>
              <h2>{customerStats.activeUsers}</h2>
          </div>
          <div className='total_stats total_loan'>
              <img src="/image/icon (2).png" alt="" />
              <h3>users with Loans</h3>
              <h2>{customerStats.customersWithLoans}</h2>
          </div>
          <div className='total_stats total_loan'>
            <img src="/image/icon (3).png" alt="" />
              <h3>Users with saving</h3>
              <h2>{customerStats.customersWithSavings}</h2>
          </div>
        </div>

        <Customers/>
      </div>
    </div>
  )
  
}

export default Dashboard
