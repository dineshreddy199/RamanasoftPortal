import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const leaveSchema = new Schema({
    employeeId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    designation: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'}
}, { timestamps: true });

export const leave = model('Leave', leaveSchema);
