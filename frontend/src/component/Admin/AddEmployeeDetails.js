import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../Style/AddEmployee.css';

const AddEmployeeDetails = () => {
  const API_BASE_URL = 'http://localhost:5000/employees';
  const navigate = useNavigate();
  const location = useLocation();
  const editEmployee = location.state?.employee || null;

  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    role: '',
    designation: '',
    mobile: ''
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

  setFormData({ employeeId: '', name: '', email: '', role: '', designation: '', mobile: '' });
  navigate('/Admin/EmployeeDetails');
};



    

  return (
    <><div>
        <Link to="/Admin/EmployeeDetails">
          <button
            type="button"
            className="btn btn-primary Back_bttn"
            
          >
            Back
          </button>
        </Link>
      </div>

      <div className='Nav-txt'>Add Employee Details</div>

      <form onSubmit={handleSubmit}>
        <div style={{ position: "absolute", top: "4.5rem", left: "19.15rem", backgroundColor: "#8080809a", borderRadius: "0.52rem", width: "50rem", height: "25rem" }}>
          <div style={{ position: "relative", top: "2.5rem", right: "-5.1rem" }}>
            <div className="row mb-3 mt-3" style={{ width: "630px" }}>
              <div className="col">
                <label>Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Employee ID here"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  required
                />
              </div>

              <div className="col">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder=" Enter your Email here"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="row mb-3 mt-3" style={{ width: "630px" }}>
              <div className="col">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Full Name here"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
{/* 
              <div className="col">
                <label>Role</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your role here"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div> */}

              <div className='col'>
                <label>Role</label>
                <select name="role"className="form-control"
                  placeholder="Enter your role here"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required>
                  <option value="Employee">Employee</option>
                  <option value="Admin">HR</option>
                  <option value="Super Admin">Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>


            </div>

            <div className="row mb-3 mt-3" style={{ width: "630px" }}>
              <div className="col">
                <label>Designation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Designation here"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  required
                />
              </div>

              <div className="col">
                <label>Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Mobile Number here"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
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

export default AddEmployeeDetails;
