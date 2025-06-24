import React from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { Changelogin } from '../features/loginSlice';
import { Changesignup } from '../features/signupSlice';
import { motion } from 'framer-motion';

const signup = () => {
  const dispatch=useDispatch()
    const {
            register,
            handleSubmit,
            formState: { errors,isSubmitting },
          } = useForm()
    
    const onSubmit=async(data)=>{
        try {
          const response=await fetch("http://localhost:5000/api/user/signup",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
          })
          const res=await response.json()
          if(response.ok){
            return toast.error(res.message)
          }
          toast.success("Signup successfull")
          dispatch(Changelogin())
          dispatch(Changesignup())
        } catch (error) {
          console.log("Error in onsubmit function",error);
        }
        
    }
    
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      
        <motion.form initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} onSubmit={handleSubmit(onSubmit)} className='bg-white border-2 border-green-500 p-15 grid justify-center items-center'>
            <input className='placeholder:text-green-500 border-b-2 border-b-green-500 p-2 focus:outline-0 mb-5' type="text" placeholder='Full Name' defaultValue="" {...register("name",{required:true})} />
            {errors.name && <p className='text-red-500'>Enter your full name</p> }
            <input className='placeholder:text-green-500 border-b-2 border-b-green-500 p-2 focus:outline-0 mb-5' type="text" placeholder='Email' defaultValue="" {...register("email",{required:true})} />
            {errors.email && <p className='text-red-500'>Enter your email</p> }
            <input className='placeholder:text-green-500 border-b-2 border-b-green-500 p-2 focus:outline-0 mb-5' type="text" placeholder='Password' defaultValue="" {...register("password",{required:true})} />
            {errors.name && <p className='text-red-500'>Enter your password</p> }
            <input disabled={isSubmitting} className='bg-green-500 p-2 rounded-full mt-5 text-white cursor-pointer hover:bg-green-800' type="submit" value="Signup" />
        </motion.form>
        <Toaster position='top-center' reverseOrder={false} />
        {isSubmitting && <p className='text-red-500'>Submitiing...</p> }
      
    </div>
  )
}

export default signup
