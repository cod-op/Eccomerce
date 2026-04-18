import React, { useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios'


const Login = ({setToken}) => {

  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');



  
  const submitHandler= async(e)=>{
       try{
            e.preventDefault();
            const response=await axios.post(backendUrl+'/api/user/admin',{email,password});
          //   console.log(response);
          if(response.data.success){
              setToken(response.data.token);
              toast.success("Login Successful");
          }
          else{
               toast.error(response.data.message);
          }

       }catch(error){
             console.error(error);
            const msg = error.response?.data?.message || error.message || "An error occurred";
            toast.error(msg);
       }
  }


  return (
    <div className=' min-h-screen flex  items-center justify-center w-full'>
     <div className='bg-white shadow-lg rounded-lg px-8 py-6 max-w-md'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Admin Pannel</h1>
      <form  onSubmit={submitHandler}>

           <div className='mb-3 min-w-72'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email" placeholder='your@gmail.com' required   className='rounded w-full border-2 border-gray-400 outline-none'/>
           </div>

           <div className='mb-3 min-w-72'>
              <p className='text-sm font-medium text-gray-700 mb-2'> Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' required className='rounded w-full border-2 border-gray-400 outline-none '/>
           </div>

           <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">Login</button>

      </form>
     </div>
    </div>
  )
}

export default Login