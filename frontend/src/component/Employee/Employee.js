import React from 'react'
import '../Style/Home.css';
import EmployeeDetails from '../../Resources/Rectangle 34625562.png';
import LeaveDetails from '../../Resources/Rectangle 34625563.png';
// import RegistationDetails from '../../Resources/Rectangle 34625564.png';
import { Link } from 'react-router-dom';


const Employee = () => {
  return (
    <>
<div>
        <Link to="/">
          <button
            type="button"
            className="btn btn-primary Back_bttn"
            
          >
            Back
          </button>
        </Link>
      </div>

      <div className='Nav-txt' >Employee DashBoard</div>

      <div>
        <Link to="/AddEmployeeDetails">
          <button
            type="button"
            className="btn btn-primary Add_bttn"
            
          >
            Add+
          </button>
        </Link>
      </div>

    <div className='bodyPage'>
      <div className='Card1 '>
                <img src={EmployeeDetails} alt='EmployeeDetails-Image' className='Card1-Img'/>
                <p className='Card1-p'> Leaves History </p>
                <hr/>
                    <Link to='/Employee/LeavesHistory'>
                <button className='CardBtn'> 
                    <div className='Card1-btn-txt'>View  </div> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16" className='Card1-btn-Img'>
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                </button>
                    </Link>
              </div>
                  <div className='Card2'>
                      <img src={LeaveDetails} alt='RegistationDetails-Image' className='Card1-Img'/>
                      <p className='Card1-p'>Registation Details</p>
                      <hr/>
                      <Link to='/Employee/EmployeeResignation'>
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

export default Employee