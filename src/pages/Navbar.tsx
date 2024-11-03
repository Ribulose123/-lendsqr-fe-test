import React from 'react';
import {
  FaSearch,
  FaHome,
  FaRegHandshake,
  FaUserTimes,
  FaHandHoldingUsd,
  FaCoins,
  FaRegChartBar,
  FaToolbox,
  FaUser,
  FaUserFriends,
  FaUserEdit
} from 'react-icons/fa';
import { FaRegBell, FaUserCheck, FaUserGear } from "react-icons/fa6";

import { GrTransaction, GrDocumentPerformance } from "react-icons/gr";
import { GiBank, GiRibbon } from "react-icons/gi";


import { TbMoneybag } from "react-icons/tb";
import { MdSavings } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = () => {
  const { userName } = useAppContext();

  return (
    <div className='Navbar'>
      {/* Horizontal Navbar First */}
      <div className='horizontal-navbar'>
        <img src="/Group.svg" alt="" />
        <nav className='navar-hori'>
          <div className='nav-input'>
            <input type="text" placeholder='Search for anything' />
            <FaSearch className='search-icons' />
          </div>

          <div className='hori-content'>
            <p>Doc</p>
            <FaRegBell className='bell-icons' />

            <div className="avater">
              <img src="/avatar.jpg" alt="" />
              <p>{userName}</p>
            </div>
          </div>
        </nav>
      </div>

      {/* Vertical Navbar Second */}
      <div className="vertical-nav">
        <nav className='nav-veri' >
          <ul>
            <li className='header-tw' style={{gap:'7px '}}>
              <FaToolbox />
              <span>Switch Organization</span>
            </li>
            <li className='header-tw' style={{gap:'7px '}}>
            <FaHome />
            <span>Dashboard</span>
            </li>
            <li>
              <Link to=''>
                <FaUser />
                <span>User</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaUserFriends />
                <span>Guarantors</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <TbMoneybag />
                <span>Loans</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaRegHandshake />
                <span>Decision Model</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <MdSavings />
                <span>Savings</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaHandHoldingUsd />
                <span>Loans Request</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaUserCheck />
                <span>WhiteList</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaUserTimes />
                <span>Karma</span>
              </Link>
            </li>

            <span className='tab-header'>BUSINESSES</span>
            <li>
              <Link to=''>
                <FaToolbox />
                <span>Organisation</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaHandHoldingUsd />
                <span>Loan Products</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <GiBank />
                <span>Saving Products</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaCoins />
                <span>Fees and Charges</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <GrTransaction />
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaUserGear />
                <span>Services</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaUserGear />
                <span>Services Accounts</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <GiRibbon />
                <span>Settlement</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaRegChartBar />
                <span>Reports</span>
              </Link>
            </li>

            <span className='tab-header'>Settings</span>

            <li>
              <Link to=''>
                <GrDocumentPerformance />
                <span>Preferences</span>
              </Link>
            </li>
            <li>
              <Link to=''>
                <FaUserEdit />
                <span>Fees and Pricing</span>
              </Link>
            </li>

            <li>
              <Link to=''>
                <CgNotes />
                <span>Audit Logs</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
