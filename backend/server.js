import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import employeeRoutes from './routes/employeeRoutes.js';
import hrLeaveRoutes from './routes/hrLeaveRoutes.js';
import employeeResignationRouters from './routes/employeeResignationRouters.js';
import hrResignationRouters from './routes/hrResignationRouters.js';
import adminRegistationRouters from './routes/adminRegistationRouters.js';
import leavesRouters from './routes/leavesRouters.js';
import employeeLeaveRouters from './routes/employeeLeaveRouters.js';
import { default as AuthRoutes } from './routes/Auth.routes.js';

dotenv.config();

const app = express();

// Use PORT from env or fallback
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
connect('mongodb+srv://admin:Admin@cluster0.upani9l.mongodb.net/employeeDB?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Failed:', err));

// Routes
app.use('/adminRegistation', adminRegistationRouters);
app.use('/employees', employeeRoutes);
app.use('/hrLeave', hrLeaveRoutes);
app.use('/employeeLeave', employeeLeaveRouters);
app.use('/employeeResignation', employeeResignationRouters);
app.use('/hrResign', hrResignationRouters);
app.use('/leaves', leavesRouters);
app.use('/Auth', AuthRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.FRONTEND_API_Base_URL}:${PORT}`);
});
