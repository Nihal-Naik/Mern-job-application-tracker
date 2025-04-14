import React from 'react'
import Navbar from '../components/navbar'
import { useNavigate } from 'react-router-dom'
import Signup from '../components/signup'
import { useDispatch,useSelector } from 'react-redux'
import { Changelogin } from '../features/loginSlice'
import Login from '../components/login'

const home = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const displaysignup=useSelector((state)=>state.signup.value)

  
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
    <div>
        <Navbar />
        {displaysignup && <Signup /> }
        <article className='flex'>
          <section className='w-3xl h-100 mt-10 grid justify-between p-10 ml-30'>
            <h1 className='w-lg font-sans text-5xl font-bold '>Track Your Job <p className='text-green-500'>Applications</p> Easily</h1>
            <button onClick={handleauth} className='font-bold cursor-pointer transition duration-300 ease-in-out w-40 h-15 rounded-full bg-green-500 text-white hover:bg-green-700 hover:scale-110'>Start tracking</button>
          </section>
          <section className='w-3xl h-100 mt-10'>
            <img className='h-95 w-90 mt-2' src="https://plus.unsplash.com/premium_vector-1711987558365-a46a7aa8a1a2?w=356&dpr=2&q=80&h=540&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8am9ic3xlbnwwfHx8fDE3NDQyOTUyNjd8MA&ixlib=rb-4.0.3" alt="" />
          </section>
        </article>
    </div>
  )
}

export default home
