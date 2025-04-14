import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SiPivotaltracker } from "react-icons/si";
import Signup from './signup';
import { Changesignup } from '../features/signupSlice';
import { useSelector, useDispatch } from 'react-redux'
import { Changelogin } from '../features/loginSlice';
import Login from './login'
import { LuLogOut } from "react-icons/lu";
import toast from 'react-hot-toast';

const navbar = () => {
  const changesignup=useSelector((state)=>state.signup.value)
  const changelogin=useSelector((state)=>state.login.value)
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const handlesignup=()=>{
    {changelogin ? dispatch(Changelogin()): dispatch(Changesignup())}
  }

  const handlelogin=()=>{
    {changesignup ? dispatch(Changesignup()): dispatch(Changelogin())}
  }
  const handlelogout=async () => {
    try {
      const respone=await fetch("http://localhost:5000/api/user/logout",{
        method:"POST",
        credentials:"include",
      })
      const res=await respone.json()
      if(!respone.ok){
        return toast.error(res.message)
      }
      toast.success(res.message)
      navigate('/')
    } catch (error) {
      console.log("Error in handlelogout function",error);
    }
  }
  
  return (
    <div className='font-sans'>
      <nav className='flex justify-between text-center h-12 mt-5 w-4xl m-auto'>
        <div className='flex justify-start items-center w-60 font-sans font-extrabold text-2xl'>
          <SiPivotaltracker className='text-green-600' /><NavLink to="/">
            Job Tracker
          </NavLink>
        </div>
        <div className='flex justify-around w-60 font-bold'>
            <button onClick={handlesignup}  className='text-green-500 transition duration-300 ease-in-out cursor-pointer hover:scale-110 '>Signup</button>
            <button onClick={handlelogin} className='rounded-full w-25 transition duration-300 ease-in-out cursor-pointer bg-green-500 text-white hover:bg-green-700 hover:text-white hover:scale-110'>Login</button>
            <LuLogOut onClick={handlelogout} className='size-8 mt-1 text-green-500 cursor-pointer hover:text-green-800 hover:scale-110 transition duration-300 ease-in-out' />
        </div>
      </nav>
      {changesignup && <Signup /> }
      {changelogin && <Login/> }
    </div>
  )
}

export default navbar
