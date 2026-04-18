import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  cartData:{
    type:Object,
    default:{}
   },
   address: {
     type: Object,
    default: { line1: '', line2: '' } 
  },
    phone:  { 
      type: String, 
      default: ""
     }
  }, {minimize:false,timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;