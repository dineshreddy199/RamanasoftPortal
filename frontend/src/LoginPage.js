import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './component/AuthContext';
import './component/Style/Login.css'

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(employeeId, password);

    if (result.success) {
      const rolePath = result.role.toLowerCase().replace(/\s/g, '');
      navigate(`/${rolePath}`);
    } else {
      setError(result.message);
    }
  };

  return (
    <>
    <div className='frame-body'>
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className='input-value'
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input-value'
          /><br/>
        <button onClick={handleLogin} style={{ width: '110px' }}>Login</button>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
    <div className='forget'
    >
    <Link to='/forgetPassword'>
        Forget Password
    </Link>  
    </div>
  </>
  );
};

export default LoginPage;
