import React, { useState, useEffect} from 'react';
import '../Style/EmployeeDetails.css';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
  const API_BASE_URL=process.env.REACT_APP_URL+'/employees';
  

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;


  
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
    setContacts(contacts.filter(contact => contact._id !==_id));
  }
};




const handleEdit = (employee) => {
  navigate('/Admin/EmployeeDetails/AddEmployeeDetails', { state: { employee } });
};



  // Filter contacts by search term
  const filteredContacts = contacts.filter(contact =>
    contact.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, startIndex + rowsPerPage);

  // Handlers for pagination
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Reset to page 1 when searchTerm or contacts change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, contacts]);

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

      <div className='Nav-txt'>List Of Employee Details</div>

      <div>
        <Link to="/Admin/EmployeeDetails/AddEmployeeDetails">
          <button
            type="button"
            className="btn btn-primary Add_bttn"
            
          >
            Add+
          </button>
        </Link>
      </div>

      <div className='Main-Box'>
        {/* Search Bar */}
        <div className='SearchBar'>
          <input
              type="text"
              placeholder="Search by ID, Name, Email"
              value={searchTerm}
              className='SearchBar-in'
              onChange={(e) => setSearchTerm(e.target.value)}
              // style={{ padding: '0.5rem', width: '20rem', marginLeft: '1rem', borderRadius: '5px' }}
            />
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search SearchIcon" viewBox="0 0 16 16"  className='SearchIcon'>
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
     </div>
     

        <div className='TableHeader'>
          <div className='TableHeader-In'>
            <span>Sl.No </span>
            <span>Employee ID</span>
            <span>Employee Name </span>
            <span>Employee Email</span>
            <span>Employee Mobile</span>
            <span>Employee Designation</span>
            <span>Action </span>
          </div>
        </div>

        <div className='TableBody'>
          {currentContacts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1rem', color: 'grey' }}>
              No Employees Found
            </div>
          ) : (
            currentContacts.map((contact, index) => (
              <div className='TableBody-In' key={contact._id}>
                <span>{startIndex + index + 1}</span>
                <span>{contact.employeeId}</span>
                <span>{contact.name}</span>
                <span>{contact.email}</span>
                <span>{contact.mobile}</span>
                <span>{contact.designation}</span>
                <span>
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
             <button
                onClick={handlePrev}
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16" className='FooterArrow'>
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
             </button>
            <p style={{position:"relative",top:"0.45rem",color:"#402040"}}>
              {startIndex + 1}  
               of {filteredContacts.length}
            </p>
              {/* <button
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                style={{ padding: '0.3rem 0.6rem', cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer' }}
              >
                 */}
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages || totalPages === 0}
                      style={{ cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer' }}
                    >

               
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16" className='FooterArrow'>
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
        </svg>
      
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
