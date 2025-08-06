import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {type:String, required:true, unique:true},
    name: {type:String , required:true},
    password: {type:String, required:true},
    isVerified: {type:Boolean, default:false},
    verificationCode: {type:String},
}, {timestamps:true});

export const Usermodel = model('user', userSchema);
