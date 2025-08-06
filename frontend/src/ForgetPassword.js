import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import bcryptjs from 'bcryptjs';
import './component/Style/ForgetPassword.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const API_BASE_URL=process.env.REACT_APP_URL+"/employees";
  const API_BASE_URL2=process.env.REACT_APP_URL+"/Auth/send-verification";
  
  const generateAndSendOtp = async () => {
    // Check if user/email exists
      const response = await fetch(API_BASE_URL);
      const data = await response.json();

      const existingUser = data.find((emp) => emp.email === email);

      if (!existingUser) {
        setMessage('Email not found in employee records.');
        return;
      }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setMessage(`OTP sent to your email.`);
    // console.log(otpCode);
    console.log(`password :${setPassword} conformPwd :${setConfirmPassword}`);
    
    

    try {
      await fetch(API_BASE_URL2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });
    } catch (err) {
      console.error('Failed to send OTP:', err);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    // OTP validation
    if (otp !== generatedOtp) {
      setMessage('Invalid OTP!');
      return;
    }

    try {
      // Check if user/email exists
      const response = await fetch(API_BASE_URL);
      const data = await response.json();

      const existingUser = data.find((emp) => emp.email === email);

      if (!existingUser) {
        setMessage('Email not found in employee records.');
        return;
      }

          // const hashedPassword = bcryptjs.hashSync(password, 10);
      // Update password
      const updateResponse = await fetch(`${API_BASE_URL}/${existingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (updateResponse.ok) {
        setMessage('Password updated successfully!');
        navigate('/loginPage');
      } else {
        setMessage('Failed to update password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div className='frameBody'
    > 
    <center> {message && <p className='message'>{message}</p>} </center>
        <h1 style={{marginLeft:"50px"}}>Register with OTP</h1>
      <div className='boxDiv'>
        <label className='lableStyle'>Email</label><br/>
        <input
          type='email'
          value={email}
          className='valueStyle'
          onChange={(e) => setEmail(e.target.value)}
          /><br />
          </div>

        <div className='boxDiv'>
        <label className='lableStyle'>Create Password</label><br/>
        <input
          type='password'
          value={password}
          className='valueStyle'
          onChange={(e) => setPassword(e.target.value)}
          /><br />
         </div> 


        <div className='boxDiv'>
        <label className='lableStyle'>Confirm Password</label><br/>
        <input
          type='password'
          value={confirmPassword}
          className='valueStyle'
          onChange={(e) => setConfirmPassword(e.target.value)}
          /><br />
        </div>
        <div className='boxDiv'>
        <button className='sendOtp' onClick={generateAndSendOtp}>Generate OTP</button><br />
        </div>
        {generatedOtp && (
          <>
        <div className='boxDiv'>
        <input
          type='text'
          value={otp}
          className='valueStyle'
          onChange={(e) => setOtp(e.target.value)}
          placeholder='Enter OTP'
          /><br />
          </div>
        <div className='boxDiv'>
        <input className='sendOtp' type='submit' onClick={handleSubmit} value='Register' />
        <br />
        {/* {message && <p>{message}</p>} */}
        </div>
      </>
    )}
      {/* </center> */}
    </div>
  );
};

export default ForgetPassword;
