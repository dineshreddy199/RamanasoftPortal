import React from 'react'
import './Style/Home.css';
import superAdmin from '../asserts/images/superAdmin.png';
import adminLogo from '../asserts/images/adminLogo.png';
import employee from '../asserts/images/homeEmployee.png';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';


const Home = () => {
  const { logout } = useAuth();
  return (
    <>
          <div>
            <button onClick={() => {
                  logout();
                  window.location.href = "/loginPage";
                }}
                    type="button"
                    className="btn btn-primary Add_bttn"
                >
                  Logout
                </button>
          </div>
    <div className='bodyPage'>
      <div className='Card1 '>
                <img src={superAdmin} alt='EmployeeDetails-Image' className='Card1-Img'/>
                <p className='Card1-p'>Super Admin</p>
                <hr/>
                    <Link to='/SuperAdmin'>
                <button className='CardBtn'> 
                    <div className='Card1-btn-txt'>View  </div> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16" className='Card1-btn-Img'>
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                </button>
                    </Link>
              </div>
                  <div className='Card2'>
                      <img src={adminLogo} alt='RegistationDetails-Image' className='Card1-Img'/>
                      <p className='Card1-p'>Admin</p>
                      <hr/>
                      <Link to='./Admin'>
                <button className='CardBtn'> 
                    <div className='Card1-btn-txt'>View  </div> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16" className='Card1-btn-Img'>
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                </button>
                    </Link>
              </div>
                <div className='Card3'>
                            <img src={employee} alt='Registation-Image' className='Card1-Img'/>
                            <p  className='Card1-p'> Employee</p>
                            <hr/>
                    <Link to='/Employee'>
                <button className='CardBtn'> 
                    <div className='Card1-btn-txt'>View  </div> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16" className='Card1-btn-Img'>
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                </button>
                    </Link>
              </div>
    </div>
  </>
  )
}

export default Home