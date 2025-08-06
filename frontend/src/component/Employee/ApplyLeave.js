import React, { useEffect, useState } from 'react';
import '../Style/ApplyLeave.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ApplyLeave = () => {
  const { user } = useAuth();
  const API_BASE_URL=process.env.REACT_APP_URL+'/employeeLeave';
  const navigate = useNavigate();
  const location = useLocation();
  const editEmployee = location.state?.employee || null;

  const [formData, setFormData] = useState({
    employeeId:`${user.employeeId}`,
    name: `${user.name}`,
    email: `${user.email}`,
    role: `${user.role}`,
    designation: `${user.designation}`,
    mobile: `${user.mobile}`,
    startDate: '',
    endDate: '',
    reason: '',
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
  
    setFormData({ employeeId: '', name: '', email: '', role: '', designation: '', mobile: '',startDate:'',endDate:'',reason:'' });
    navigate('/Employee/LeavesHistory');
  };
  return (
    <>
    <Link to="/Employee/LeavesHistory">
        <button type="button" className="btn btn-primary Back_bttn">Back</button>
      </Link>

      <div className='Nav-txt'>Add Employee Leave</div>
    <div className="leave-container">
      <h2>Apply Leave</h2>
      <form onSubmit={handleSubmit} className="leave-form">
       <div className='date'>
         <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            className='date-in'
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
            />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            className='date-in'
            value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
       </div>
        <div className="form-group">
          <label>Reason For Leave</label>
          <textarea
            name="reason"
            placeholder="Please mention your reason here"
            value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
        </div>
        <div className="button-group">
          <button type="button" className="cancel-btn" >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
                {editEmployee ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  </>
  );
};

export default ApplyLeave;
