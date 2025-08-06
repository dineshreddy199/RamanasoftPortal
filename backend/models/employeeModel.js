import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
    employeeId: { type: String, required: true, unique:true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true,default: "Employee" },
    designation: { type: String, required: true },
    mobile: { type: String, required: true, unique:true },
    password:{type:String, default:"123456"},
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

export default model('Employee', employeeSchema);
