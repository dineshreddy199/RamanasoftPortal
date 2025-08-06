import { Router } from 'express';
import fetch from 'node-fetch';
import { Usermodel } from '../models/User.js';
import { SendEmail } from '../middleware/Email.confiq.js';

const AuthRoutes = Router();

AuthRoutes.post('/send-verification', async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    // Send the OTP via email
    await SendEmail(email, otp);
    
    res.status(200).json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// ✅ Verify OTP
AuthRoutes.post('/verify', async (req, res) => {
    try {
      const { email, code } = req.body;
      const user = await Usermodel.findOne({ email, verificationCode: code });
      
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid verification code' });
      }
      
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    
    res.status(200).json({ success: true, message: 'Email verified successfully' });
    
  } catch (error) {
    console.error(error);
      res.status(500).json({ success: false, message: 'Verification failed' });
    }
  });
  

export default AuthRoutes;