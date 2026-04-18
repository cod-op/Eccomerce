import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex item-center justify-between py-2 px-[4%] ' >
        <img src={assets.logo} alt="" className='w-[max(10%,150px)]'/>
        <button onClick={()=>setToken('')} className='h-[40px] bg-gray-800 text-white px-5 py-2 mt-4  sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar