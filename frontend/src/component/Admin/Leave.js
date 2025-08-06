import React from 'react'
import Hr_Image from '../../asserts/images/admin1.png';
import Employee_Image from '../../asserts/images/Employee History Details icon.png';
import { Link } from 'react-router-dom';


const Leave = () => {

const leaveCards=[
    {
        name:"Employee Leave",
        image:`${Employee_Image}`,
        color:"pink",
        link:"/Admin/LeaveDetails/EmployeeLeave"
    },
    {
        name:"HR Leave",
        image:`${Hr_Image}`,
        color:"grey",
        link:"/Admin/LeaveDetails/HrLeave"
    }
]

  return (
    <>
    <div>
      <Link to="/Admin">
        <button
          type="button"
          className="btn btn-primary Back_bttn"
           >
          Back
        </button>
      </Link>

    </div>

    <div style={{display:"flex", position:"absolute",top:"8rem",left:"18rem"}}>
            {leaveCards.map((data,index)=>(
                <div className="card" style={{ width: "20rem",height:"22rem",marginLeft:"0.7rem",backgroundColor:`${data.color}`}}>
                <center>
              <img src={data.image} className="card-img-top" alt="..."  style={{ width: "14rem",height:"14rem"}} />
              <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <Link to={data.link} className="btn btn-primary">
                  Go somewhere
                </Link>
              </div>
                </center>
            </div>
              ))}
    </div>
  </>
  )
}

export default Leave