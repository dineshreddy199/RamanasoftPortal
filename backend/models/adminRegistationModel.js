import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const adminRegistationSchema = new Schema({
    employeeId: { type: String, required: true }, // Employee ID who requested the leave
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    designation: { type: String, required: true },
    mobile: { type: String, required: true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    leaveType: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

export const adminRegistation = model('AdminRegistation', adminRegistationSchema);
