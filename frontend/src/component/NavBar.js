import React from 'react'
import { useAuth } from './AuthContext'; // Use the custom useAuth hook to access the context
import RamanaSoft from '../Resources/image (1).png';
import './Style/NavBar.css'
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { user } = useAuth(); // Use the custom hook to get the user object

  return (
    <div>
      <div className='left'>
        <Link to='/'>
          <img src={RamanaSoft} alt='' className='company-logo'/>
        </Link>
        <div className='Dashboard'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3" className='homeLogo'>
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
          </svg>
          <p className='Dashboard-txt'>Dashboard</p>
        </div>
      </div>

      <div className='NavTab'>
        {user ? ( // Check if the user exists before displaying employeeId
          <p>Welcome {user.name}</p> // Display employeeId if user is logged in
        ) : (
          <p></p> // Fallback message if user is not logged in
        )}
      </div>
    </div>
  );
}

export default NavBar;
