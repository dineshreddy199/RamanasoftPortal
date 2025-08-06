import React, { useState } from 'react';
import '../Style/ApplyLeave.css';

const AddEmployeeLeave = () => {
  const [formData, setFormData] = useState({
    employeeId:`${user.employeeId}`,
    name: `${user.name}`,
    email: `${user.email}`,
    role: `${user.role}`,
    designation: `${user.designation}`,
    mobile: `${user.mobile}`,
    startDate: '',
    endDate: '',
    reason: ''
  });

  const API_BASE_URL=process.env.REACT_APP_URL+"/employeeLeave";
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can customize this endpoint
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        type: 'employeeLeave' // or 'hr', depending on who applies
      })
    },[API_BASE_URL]);

    const data = await response.json();
    console.log('Leave submitted:', data);
    alert('Leave submitted successfully!');
  };

  const handleCancel = () => {
    setFormData({ startDate: '', endDate: '', reason: '' });
  };

  return (
    <>
      <Link to="/Admin/LeaveDetails/EmployeeLeave">
        <button type="button" className="btn btn-primary Back_bttn">Back</button>
      </Link>

      <div className='Nav-txt'>Add employee Leave</div>
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            />
        </div>
        {/* <div>
          <label>Status :</label>
          <select>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </div> */}
        <div className="button-group">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  </>
  );
};

export default AddEmployeeLeave;
