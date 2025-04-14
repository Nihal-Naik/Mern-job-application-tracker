import React from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { Changelogin } from '../features/loginSlice';
import { useNavigate } from 'react-router-dom';
import { Changesignup } from '../features/signupSlice';
import { Changechange } from '../features/changeSlice';

const login = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {
            register,
            handleSubmit,
            formState: { errors,isSubmitting },
          } = useForm()
    
    const onSubmit=async(data)=>{
        try {
            const response=await fetch("http://localhost:5000/api/user/login",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(data),
                credentials:"include",
            })
            const res=await response.json()
            if(response.ok){
                toast.success("Login successfull")
                navigate('/applied')
                dispatch(Changelogin())
                dispatch(Changechange())
            }else{
                toast.error(res.message)
            }
        } catch (error) {
            console.log("Error in onsubmit function",error);
        }   
    }


    const displaylogin=()=>{
        dispatch(Changelogin())
        dispatch(Changesignup())
    }

    
  return (
    <div className='absolute w-sm right-100 border-2 border-green-500 h-80 bg-white top-20'>
      
        <form onSubmit={handleSubmit(onSubmit)} className='grid justify-center mt-15 scale-110'>
            <input className='placeholder:text-green-500 border-b-2 border-b-green-500 p-2 focus:outline-0 mb-5' type="text" placeholder='Email' defaultValue="" {...register("email",{required:true})} />
            {errors.email && <p className='text-red-500'>Enter your email</p> }
            <input className='placeholder:text-green-500 border-b-2 border-b-green-500 p-2 focus:outline-0 mb-5' type="text" placeholder='Password' defaultValue="" {...register("password",{required:true})} />
            {errors.name && <p className='text-red-500'>Enter your password</p> }
            <input disabled={isSubmitting} className='bg-green-500 p-2 rounded-full mt-5 text-white cursor-pointer hover:bg-green-800' type="submit" value="Login" />
        </form>
        <p className='text-gray-600 ml-20 mt-5'>Don't have an account? <span onClick={displaylogin} className='cursor-pointer text-green-500'>Signup</span></p>
        <Toaster position='top-center' reverseOrder={false} />
        {isSubmitting && <p className='text-red-500 ml-20'>Submitiing...</p> }
      
    </div>
  )
}

export default login
