import React from 'react'
import Navbar from '../components/navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Changelogin } from '../features/loginSlice'
import Login from '../components/login'

const home = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const displaylogin=useSelector((state)=>state.login.value)

  
  const handleauth=async () => {
    try {
      const response=await fetch("http://localhost:5000/api/user/checkauth",{
        method:"GET",
        credentials:"include",
      })
      
      if(!response.ok){
        return dispatch(Changelogin())
      }
      navigate('/applied')
    } catch (error) {
      console.log("Error in handleauth function",error);
    }
  }
  return (
    <section className=''>
        <Navbar />
        {displaylogin && <Login /> }
        {/* <div className=' grid grid-rows-5 justify-center md:flex md:justify-around w-full h-screen items-center'>
          <section className=' grid row-span-1 gap-10'>
            <h1 className=' font-sans text-2xl md:text-5xl font-bold '>Track Your Job <p className='text-green-500'>Applications</p> Easily</h1>
            <button onClick={handleauth} className='font-bold cursor-pointer p-3 transition duration-300 ease-in-out rounded-full bg-green-500 text-white hover:bg-green-700 hover:scale-110'>Start tracking</button>
          </section>

          <img className=' row-span-3 h-75 w-60 md:h-95 md:w-90 mt-2' src="https://plus.unsplash.com/premium_vector-1711987558365-a46a7aa8a1a2?w=356&dpr=2&q=80&h=540&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8am9ic3xlbnwwfHx8fDE3NDQyOTUyNjd8MA&ixlib=rb-4.0.3" alt="" />

        </div> */}
    </section>
  )
}

export default home
