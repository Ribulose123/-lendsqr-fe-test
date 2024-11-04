import React, { useEffect, useState } from "react";
import { useAppContext, User } from "../context/AppContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/Customer.scss";

interface Filters {
  organization?: string;
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  status?: string;
}

const Customers: React.FC = () => {
  const { customers, setCustomers } = useAppContext();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState<Filters>({});
  const [filteredCustomers, setFilteredCustomers] = useState<User[]>(customers);
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

  const navigate = useNavigate();

  // Load customers from localStorage on component mount
  useEffect(() => {
    const storedCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    ) as User[];
    if (storedCustomers.length > 0) {
      setCustomers(storedCustomers);
    }
  }, [setCustomers]);

  useEffect(() => {
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
        (!name ||
          customer.name?.first?.toLowerCase().includes(name.toLowerCase())) &&
        (!phone || customer.phone === phone) &&
        (!email ||
          customer.email.toLowerCase().includes(email.toLowerCase())) &&
        (!date || customer.dateJoined === date) &&
        (!status || customer.status === status)
      );
    });
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    filterCustomers();
    setShowFilterPanel(false);
  };

  const handleResetFilters = () => {
    setFilters({});
    setFilteredCustomers(customers);
    setCurrentPage(1);
  };

  const toggleFilterPanel = () => setShowFilterPanel((prev) => !prev);

  const handleCustomerClick = (customer: User) => {
    navigate(`/users/${customer.id}`);
  };

  // Calculate indices for the current page's customers
  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const maxVisibleButtons = 5;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageButtons = () => {
    const buttons = [];

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={currentPage === i ? "active" : ""}
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
              className={currentPage === i ? "active" : ""}
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
            className={currentPage === totalPages ? "active" : ""}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage > totalPages - maxVisibleButtons + 2) {
        buttons.push(
          <button
            key={1}
            onClick={() => paginate(1)}
            className={currentPage === 1 ? "active" : ""}
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
              className={currentPage === i ? "active" : ""}
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
            className={currentPage === 1 ? "active" : ""}
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
              className={currentPage === i ? "active" : ""}
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
            className={currentPage === totalPages ? "active" : ""}
          >
            {totalPages}
          </button>
        );
      }
    }
    return buttons;
  };

  const organizationOptions = [
    ...new Set(customers.map((customer) => customer.organization)),
  ];

  return (
    <div>
      <div className="customers-container">
        <div className="customer-table-container">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date joined</th>
                <th>Status</th>
                <th onClick={toggleFilterPanel}>
                  <IoFilterOutline />
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    handleCustomerClick(customer);
                  }}
                >
                  <td>{customer.organization}</td>
                  <td>{customer.name.first}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.dateJoined}</td>
                  <td className={`status-${customer.status}`}>
                    {customer.status}
                  </td>
                  <td>
                    <BsThreeDotsVertical />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                value={filters.organization || ""}
                onChange={(e) =>
                  handleFilterChange("organization", e.target.value)
                }
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
                value={filters.name || ""}
                onChange={(e) => handleFilterChange("name", e.target.value)}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                value={filters.phone || ""}
                onChange={(e) => handleFilterChange("phone", e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={filters.email || ""}
                onChange={(e) => handleFilterChange("email", e.target.value)}
              />
            </label>
            <label>
              Date Joined:
              <input
                type="date"
                value={filters.date || ""}
                onChange={(e) => handleFilterChange("date", e.target.value)}
              />
            </label>
            <label>
              Status:
              <select
                value={filters.status || ""}
                onChange={(e) => handleFilterChange("status", e.target.value)}
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

      {showFilterPanel && (
        <div className="filter-panel visible">
          <h3>Filter Options</h3>
          <label>
            Organization:
            <select
              value={filters.organization || ""}
              onChange={(e) =>
                handleFilterChange("organization", e.target.value)
              }
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
            Email:
            <input
              type="email"
              value={filters.email || ""}
              onChange={(e) => handleFilterChange("email", e.target.value)}
              placeholder="Enter email"
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              value={filters.phone || ""}
              onChange={(e) => handleFilterChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </label>
          <label>
            Status:
            <select
              value={filters.status || ""}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
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
