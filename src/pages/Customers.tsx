import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoFilterOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Customer.scss';

interface Customer {
  id: string;
  organization: string;
  name: { first: string };
  email: string;
  phone: number;
  dateJoined: string;
  status: 'active' | 'inactive' | 'blacklisted' | 'pending';
  marital: 'Single'| 'Divorced'| 'Married'| 'Widowed';
}
interface Filters {
  organization?: string;
  name?: string;
  phone?: number;
  email?: string;
  date?: string;
  status?: string;
}

const Customers: React.FC = () => {
  const { customers, setCustomers } = useAppContext();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState<Filters>({});
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

  const navigate = useNavigate()
  
 
  

  // Load customers from localStorage on component mount
  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]') as Customer[];
    if (storedCustomers.length > 0) {
      setCustomers(storedCustomers);
    }
  }, [setCustomers]);

  useEffect(() => {
    // Initially set filteredCustomers to all customers
    setFilteredCustomers(customers);
  }, [customers]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filterCustomers = () => {
    const { organization, name, phone, email, date, status } = filters;
    const filtered = customers.filter((customer) => {
      return (
        (!organization || customer.organization === organization) &&
        (!name || customer.name?.first?.toLowerCase().includes(name.toLowerCase())) &&
        (!phone || customer.phone === phone) &&
        (!email || customer.email.toLowerCase().includes(email.toLowerCase())) &&
        (!date || customer.dateJoined === date) &&
        (!status || customer.status === status)
      );
    });
    setFilteredCustomers(filtered);
    setCurrentPage(1)
  };

  const handleApplyFilters = () => {
    filterCustomers();
    setShowFilterPanel(false);
    
  };


  const handleResetFilters = () => {
    setFilters({});
    setFilteredCustomers(customers);
    setCurrentPage(1); // Reset to the first page
  };

  const toggleFilterPanel = () => setShowFilterPanel((prev) => !prev);

  const handleCustomerClick = (customerId: number) => {
    navigate(`/users/${customerId}`);
  };

  // Calculate indices for the current page's customers
  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstPage, indexOfLastPage);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const maxVisibleButtons = 5; // Show 5 buttons at a time

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageButtons = () => {
    const buttons = [];

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage < maxVisibleButtons - 1) {
        for (let i = 1; i < maxVisibleButtons; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => paginate(i)}
              className={currentPage === i ? 'active' : ''}
            >
              {i}
            </button>
          );
        }
        buttons.push(<span key="ellipsis-end">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => paginate(totalPages)}
            className={currentPage === totalPages ? 'active' : ''}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage > totalPages - maxVisibleButtons + 2) {
        buttons.push(
          <button
            key={1}
            onClick={() => paginate(1)}
            className={currentPage === 1 ? 'active' : ''}
          >
            1
          </button>
        );
        buttons.push(<span key="ellipsis-start">...</span>);
        for (let i = totalPages - maxVisibleButtons + 2; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => paginate(i)}
              className={currentPage === i ? 'active' : ''}
            >
              {i}
            </button>
          );
        }
      } else {
        buttons.push(
          <button
            key={1}
            onClick={() => paginate(1)}
            className={currentPage === 1 ? 'active' : ''}
          >
            1
          </button>
        );
        buttons.push(<span key="ellipsis-start">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => paginate(i)}
              className={currentPage === i ? 'active' : ''}
            >
              {i}
            </button>
          );
        }
        buttons.push(<span key="ellipsis-end">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => paginate(totalPages)}
            className={currentPage === totalPages ? 'active' : ''}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  const organizationOptions = [...new Set(customers.map((customer) => customer.organization))];

  return (
    <div className="customers-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date joined</th>
            <th>Status</th>
            <th onClick={toggleFilterPanel}><IoFilterOutline /></th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer, index) => (
            <tr key={customer.id || customer.email || index}>
              <td>
              <Link to={`/users/${customer.id}`}>{customer.organization}</Link>
              </td>
              <td>
              <Link to={`/users/${customer.id}`}>{customer.name.first}</Link>
              </td>
              <td>
              <Link to={`/users/${customer.id}`}>{customer.email}</Link>
              </td>
              <td>
              <Link to={`/users/${customer.id}`}>{customer.phone}</Link>
              </td>
              <td>
              <Link to={`/users/${customer.id}`}>{customer.dateJoined}</Link>
              </td>
              <td className={`status-${customer.status}`}>
                {customer.status}
              </td>
              <td>
              <Link to={`/users/${customer.id}`}  onClick={() => handleCustomerClick(customer.id)}><BsThreeDotsVertical/></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {renderPageButtons()}
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)}>&gt;</button>
        )}
      </div>

      {showFilterPanel && (
        <div className="filter-panel visible">
          <h3>Filter Options</h3>
          <label>
            Organization:
            <select
              value={filters.organization || ''}
              onChange={(e) => handleFilterChange('organization', e.target.value)}
            >
              <option value="">All</option>
              {organizationOptions.map((org, index) => (
                <option key={`${org}-${index}`} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </label>
          <label>
            Name:
            <input
              type="text"
              value={filters.name || ''}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              value={filters.phone || ''}
              onChange={(e) => handleFilterChange('phone', e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={filters.email || ''}
              onChange={(e) => handleFilterChange('email', e.target.value)}
            />
          </label>
          <label>
            Date Joined:
            <input
              type="date"
              value={filters.date || ''}
              onChange={(e) => handleFilterChange('date', e.target.value)}
            />
          </label>
          <label>
            Status:
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blacklisted">Blacklisted</option>
              <option value="pending">Pending</option>
            </select>
          </label>

          <button onClick={handleApplyFilters}>Apply Filters</button>

          <button onClick={handleResetFilters}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default Customers;
