import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SiPivotaltracker } from "react-icons/si";
import Signup from './signup';
import { Changesignup } from '../features/signupSlice';
import { useSelector, useDispatch } from 'react-redux'
import { Changelogin } from '../features/loginSlice';
import Login from './login'
import { LuLogOut } from "react-icons/lu";
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi";
import {motion} from 'framer-motion'
import Sidebar from './Sidebar';
import { Changesidebar } from '../features/sidebarSlice';

const navbar = () => {
  const changesignup=useSelector((state)=>state.signup.value)
  const changelogin=useSelector((state)=>state.login.value)
  const changesidebar=useSelector((state)=>state.sidebar.value)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const [setscreensize, setSetscreensize] = useState({width:window.innerWidth})
  useEffect(() => {
    const handlescreensize=()=>{
      setSetscreensize({width:window.innerWidth})
    }
    window.addEventListener('resize',handlescreensize)
    return ()=>window.addEventListener('resize',handlescreensize)
  }, [])
  

  const handlesignup=()=>{
    {changelogin ? dispatch(Changelogin()): dispatch(Changesignup())}
  }

  const handlelogin=()=>{
    {changesignup ? dispatch(Changesignup()): dispatch(Changelogin())}
  }
  const handlesidebar=()=>{
    dispatch(Changesidebar())
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
    <div className=''>
      {changesidebar && <Sidebar />}
      <nav className='mb-5 md:mb-0 flex w-[100vw] justify-between items-center p-3'>
        <div className='flex justify-start items-center font-sans font-extrabold text-xl'>
          <SiPivotaltracker className='text-green-600' />
          <NavLink to="/">
            Job Tracker
          </NavLink>
        </div>
        {setscreensize.width<640 ? (
          <div onClick={handlesidebar} className='border-2 p-1'>
            <GiHamburgerMenu className='font-bold text-xl ' />
          </div>
        ):(
          <div className=' flex sm:w-60 justify-around font-bold'>
            <button onClick={handlesignup}  className='text-green-500 transition duration-300 ease-in-out hover:text-green-800 cursor-pointer hover:scale-110 '>Signup</button>
            <button onClick={handlelogin} className='rounded-full p-1 w-[30%] transition duration-300 ease-in-out cursor-pointer bg-green-500 text-white hover:bg-green-700 hover:text-white hover:scale-110'>Login</button>
            <LuLogOut onClick={handlelogout} className='size-8 mt-1 text-green-500 cursor-pointer hover:text-green-800 hover:scale-110 transition duration-300 ease-in-out' />
          </div>
        )}
      </nav>
      {changesignup && <Signup /> }
      {changelogin && <Login/> }
    </div>
  )
}

export default navbar
