import React, { useState, useEffect } from 'react';
import '../Style/EmployeeDetails.css';
import { Link, useNavigate } from 'react-router-dom';

const ResignationRequest = () => {
  const API_BASE_URL=process.env.REACT_APP_URL+'/adminRegistation';

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const rowsPerPage = 7;

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setContacts(data);
    };
    fetchEmployees();
  }, [API_BASE_URL]);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await fetch(`${API_BASE_URL}/${_id}`, { method: 'DELETE' });
      setContacts(contacts.filter(contact => contact._id !== _id));
    }
  };

  const handleEdit = (employee) => {
    navigate('/AddEmployeeRequest', { state: { employee } });
  };

  const askForConfirmation = (_id, status) => {
    setPendingStatus({ _id, status });
    setShowConfirm(true);
  };

  const confirmStatusChange = async () => {
    const { _id, status } = pendingStatus;
    try {
      const response = await fetch(`${API_BASE_URL}/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        const updatedEmployee = await response.json();
        setContacts(prev =>
          prev.map(emp => (emp._id === _id ? updatedEmployee : emp))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowConfirm(false);
      setPendingStatus(null);
    }
  };

  const cancelConfirmation = () => {
    setShowConfirm(false);
    setPendingStatus(null);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, contacts]);

  return (
    <>
      <Link to="/SuperAdmin/Approvels">
        <button type="button" className="btn btn-primary Back_bttn">Back</button>
      </Link>

      <div className='Nav-txt'>List Of Employee Details</div>

      <div className='Main-Box'>
        <div className='SearchBar'>
          <input
            type="text"
            placeholder="Search by ID, Name, Email"
            value={searchTerm}
            className='SearchBar-in'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='TableHeader'>
          <div className='TableHeader-In' id='EmployeeRequest_TableHeader-In'>
            <span>Sl.No</span>
            <span>Employee ID</span>
            <span>Employee Name</span>
            <span>Employee Designation</span>
            <span>Reason</span>
            <span>Status</span>
            <span>Action</span>
          </div>
        </div>

        <div className='TableBody'>
          {currentContacts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1rem', color: 'grey' }}>No Employees Found</div>
          ) : (
            currentContacts.map((contact, index) => (
              <div className='TableBody-In' id='EmployeeReq' key={contact._id}>
                <span style={{ marginLeft: "-2.2rem" }}>{startIndex + index + 1}</span>
                <span>{contact.employeeId}</span>
                <span>{contact.name}</span>
                <span>{contact.designation}</span>
                <span>{contact.reason}</span>
                <span>
                  {contact.status === 'Approved' || contact.status === 'Rejected' ? (
                    <span style={{ color: contact.status === 'Approved' ? 'green' : 'red', fontWeight: 'bold' }}>
                      {contact.status}
                    </span>
                  ) : (
                    <>
                      <button onClick={() => askForConfirmation(contact._id, 'Rejected')} style={{ marginRight: '0.5rem' }}>
                        Reject
                      </button>
                      <button onClick={() => askForConfirmation(contact._id, 'Approved')}>
                        Approve
                      </button>
                    </>
                  )}
                </span>
                <span>
                  {contact.status !== 'Approved' && contact.status !== 'Rejected' && (
                    <>
                    </>
                  )}
                          <button
                          onClick={() => handleEdit(contact)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f3f3f3', marginRight: '1rem' }}
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16" >
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => handleDelete(contact._id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f3f3f3' }}
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </button>
                </span>
              </div>
            ))
          )}
        </div>

        <div className='TableFooter'>
          <div className='TableFooter-In' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              &lt;
            </button>
            <p>{startIndex + 1} of {filteredContacts.length}</p>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to <strong>{pendingStatus.status}</strong> this request?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={confirmStatusChange} className="btn btn-success">Yes, Confirm</button>
              <button onClick={cancelConfirmation} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResignationRequest;
