import React from 'react'
import {FaSearch, FaBell} from 'react-icons/fa'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const {userName} = useAppContext()

  return (
    <div className='Navbar'>
        <div className='horizontal-navbar'>
            <img src="/public/Group.svg" alt="" />
            <nav className='navar-hori'>
                <div className='nav-input'>
                    <input type="text" placeholder='search for anythingh' />
                    <FaSearch/>
                </div>

                <div className='hori-content'>
                    <p>Doc</p>
                    <FaBell/>

                    <div className="avater">
                        <img src="/public/avatar.jpg" alt="" />
                        <p>{userName}</p>
                    </div>
                </div>
            </nav>
        </div>
      
    </div>
  )
}

export default Navbar
