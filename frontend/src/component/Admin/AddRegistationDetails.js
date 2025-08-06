import React, { useEffect, useState } from 'react';
import '../Style/ApplyLeave.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AddRegistationDetails = () => {
  const {user}=useAuth();
  const API_BASE_URL=process.env.REACT_APP_URL+'/hrResign';

  const navigate = useNavigate();
  const location = useLocation();
  const editEmployee = location.state?.employee || null;

  const [formData, setFormData] = useState({
    employeeId: `${user.employeeId}`,
    name: `${user.name}`,
    email: `${user.email}`,
    role: `${user.role}`,
    designation: `${user.designation}`,
    mobile: `${user.mobile}`,
    reason:'',
  });

  useEffect(() => {
    if (editEmployee) {
      setFormData(editEmployee);
    }
  }, [editEmployee,API_BASE_URL]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (editEmployee) {
  await fetch(`${API_BASE_URL}/${editEmployee._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
} else {
  await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
}

  setFormData({ employeeId: '', name: '', email: '', role: '', designation: '', mobile: '',reason:'' });
  navigate('/Admin/RegistationDetails');
};
  return (
    <>
      <Link to="/Admin/RegistationDetails">
        <button type="button" className="btn btn-primary Back_bttn">Back</button>
      </Link>

      
      <div className='Nav-txt'>Add Admin Resignation</div>

      <form onSubmit={handleSubmit}>
        <div style={{ position: "absolute", top: "4.5rem", left: "19.15rem", backgroundColor: "#8080809a", borderRadius: "0.52rem", width: "50rem", height: "25rem" }}>
          <div style={{ position: "relative", top: "2.5rem", right: "-5.1rem" }}>
            <div className="row mb-3 mt-3" style={{ width: "630px" }}>
              <div className="col">
                <label>Reason for Resignation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Reason for Resignation"
                   style={{ width: "630px" ,height:"200px",textIndent:"12px"}}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
              </div>
            </div> 
          </div>

          <div>
            <div className="d-grid gap-2 d-md-block">
              <button className="btn btn-primary" type="submit" style={{
                position: "absolute",
                top: "19rem",
                left: "19rem",
                width: "9rem",
                height: "3rem",
              }}>
                {editEmployee ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
  </>
  );
};

export default AddRegistationDetails;
