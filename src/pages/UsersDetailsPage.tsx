import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useAppContext, User } from "../context/AppContext";
import "../styles/User.scss";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract ID from URL parameter
  const { getUserById } = useAppContext();

  const [customer, setCustomer] = useState<User>();
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [selectedInfo, setSelectedInfo] = useState<string>("Account Details");

  useEffect(() => {
    const fetchedCustomer = getUserById(id || "");

    console.log(fetchedCustomer);
    setCustomer(fetchedCustomer);
    setIsLoading(false);
  }, [id, getUserById]);

  const handleToggleInfo = (infoType: string) => {
    setSelectedInfo(infoType);
  };
  if (isLoading) {
    return <p>Loading customer details...</p>;
  }

  if (!customer) {
    return <p>Customer not found.</p>;
  }

  return (
    <div className="user-detail">
      <div className="arrow">
        <Link to="/dashboard">
          <FaArrowLeftLong />
          <p>Back to Users</p>
        </Link>
      </div>

      <div className="user_black">
        <h2>User Details</h2>
        <div className="blacklisted">
          <button className={`status-${customer.status}`}>
            {customer.status} User
          </button>
          <button>Activate user</button>
        </div>
      </div>

      <div className="user_content-info">
        <div className="user-content">
          <div className="user_name">
            {/* <div className="user-img">
              <img src={customer.picture.thumbnail} alt="" />
            </div> */}
            <h2>
              {customer?.name?.first} {customer?.name?.last}
            </h2>
            <p className={`status-${customer?.status}`}>{customer?.salary}</p>
          </div>

          <div className="user_star">
            <img src="/image/tier.png" alt="" />
          </div>
          <div className="user-bank">
            <h3>200,000</h3>
            <p>0463524543 first bank</p>
          </div>
        </div>

        <div className="need-inf">
          {[
            "Account Details",
            "Document",
            "Bank Details",
            "Loans",
            "Savings",
            "App and system",
          ].map((infoType) => (
            <p
              key={infoType}
              onClick={() => handleToggleInfo(infoType)}
              className={selectedInfo === infoType ? "active" : ""}
            >
              {infoType}
            </p>
          ))}
        </div>
      </div>

      <div className="personal-info-content">
        {selectedInfo === "Account Details" && (
          <div className="person-info">
            <h4>Personal Information</h4>
            <div className="cutome-name">
              <div className="name">
                <p>Full name</p>
                <strong>
                  {customer?.name?.first} {customer?.name?.last}
                </strong>
              </div>
              <div className="name">
                <p>phone number</p>
                <strong>{customer?.phone}</strong>
              </div>
              <div className="name">
                <p>Email</p>
                <strong>{customer?.email}</strong>
              </div>
              {/* <div className="name">
                <p>BVN</p>
                <strong>{customer.id.value}</strong>
              </div>
              <div className="name">
                <p>Gender</p>
                <strong>{customer.gender}</strong>
              </div> */}
              <div className="name">
                <p>Marital status</p>
                <strong>{customer?.marital} </strong>
              </div>
              {/* <div className="name">
                <p>children</p>
                <strong>{customer.children} 4</strong>
              </div>
              <div className="name">
                <p>Type of Apartment</p>
                <strong>{customer.children} Rented</strong>
              </div> */}
            </div>

            <div className="socials">
              <h4>Socials</h4>
              <div className="social-info">
                <div className="social-content">
                  <p>Twitter</p>
                  <strong>
                    @{customer.name.first}_{customer.name.last}
                  </strong>
                </div>
                <div className="social-content">
                  <p>FaceBook</p>
                  <strong>
                    {customer.name.first} {customer.name.last}
                  </strong>
                </div>

                <div className="social-content">
                  <p>Instagram</p>
                  <strong>
                    @{customer.name.first}_{customer.name.last}
                  </strong>
                </div>
              </div>
            </div>

            <div className="guarantor">
              <h4>Guarantor</h4>
              <div className="guarantors-info">
                <div className="gurato-info">
                  <p>Full name</p>
                  <strong>Romeo John</strong>
                </div>
                <div className="gurato-info">
                  <p>Phone Number</p>
                  <strong>0801234585</strong>
                </div>
                <div className="gurato-info">
                  <p>Email</p>
                  <strong>remoejohn@gmail.com</strong>
                </div>
                <div className="gurato-info">
                  <p>Relation</p>
                  <strong>Brother</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedInfo === "Document" && (
          <div className="document">
            <h4>Document</h4>
            <div className="document-content">
              <div className="document-info">
                <p>National ID</p>
                <strong>12234HRE12</strong>
              </div>
              <div className="document-info">
                <p>Passport Number</p>
                <strong>A1234567</strong>
              </div>
              <div className="document-info">
                <p>Driver’s License</p>
                <strong>DL987654321</strong>
              </div>
            </div>
          </div>
        )}

        {selectedInfo === "Bank Details" && (
          <div className="bank">
            <h4>Bank Detalis</h4>
            <div className="bank-info">
              <div className="bank-conte">
                <p>Bank Name</p>
                <strong>First Bank</strong>
              </div>
              <div className="bank-conte">
                <p>Branch</p>
                <strong>Benin City</strong>
              </div>
              <div className="bank-conte">
                <p>IFSC Code</p>
                <strong>FBN123456</strong>
              </div>
            </div>
          </div>
        )}
        {selectedInfo === "Loans" && (
          <div className="loan">
            <h4>Loan</h4>
            <div className="loan-info">
              <div className="loan-content">
                <p>Loan Type</p>
                <strong>Personal Loan</strong>
              </div>
              <div className="loan-content">
                <p>Amount</p>
                <strong>₦50,000</strong>
              </div>
              <div className="loan-content">
                <p>Status</p>
                <strong>{customer.status}</strong>
              </div>
            </div>
          </div>
        )}
        {selectedInfo === "Savings" && (
          <div className="saving">
            <h4>Savings</h4>
            <div className="saving-info">
              <div className="saving-content">
                <p>Total Saving</p>
                <strong> ₦200,000</strong>
              </div>
              <div className="saving-content">
                <p>Saving Plans</p>
                <strong> Monthly</strong>
              </div>
              <div className="saving-content">
                <p>Interest Rate</p>
                <strong> 4%</strong>
              </div>
            </div>
          </div>
        )}
        {selectedInfo === "App and system" && (
          <div className="App">
            <div className="app-info">
              <div className="app-co">
                <p>Last Login</p>
                <strong>October 31, 2024</strong>
              </div>
              <div className="app-co">
                <p>Device</p>
                <strong>Iphone 13 Pro</strong>
              </div>
              <div className="app-co">
                <p>IP Address</p>
                <strong>252.243.1.1</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
