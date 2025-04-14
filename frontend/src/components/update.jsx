import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Changechange } from '../features/changeSlice'


const update = ({updatedetails,setUpdate,updatestate}) => {
    const dispatch=useDispatch()
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    }=useForm()

    const onSubmit=async(data)=>{
        try {
          const response = await fetch("http://localhost:5000/api/jobtracker/job_update", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
          })
          const res = await response.json()
          if (!response.ok) {
            return toast.error(res.message)
          }
          toast.success(res.message)
          setUpdate(!updatestate)
          dispatch(Changechange())
        } catch (error) {
          console.log("Error in onsubmit function",error);
        }
    }
  return (
    <div className='absolute top-20 bg-white left-100 border-2 border-green-500'>
      <form onSubmit={handleSubmit(onSubmit)} className='grid p-15'>
          <input type="text" hidden defaultValue={updatedetails._id} {...register("_id")} />
          <input className='border-b-2 p-2 border-b-green-500 focus:outline-none w-60 m-auto text-center placeholder:text-center' type="text" defaultValue={updatedetails.Company_name} placeholder='Company' {...register("Company_name", { required: true })} />
          {errors.Company_name && <span className='text-red-500'>Enter the Company name</span>}
          <input className='border-b-2 p-2 border-b-green-500 focus:outline-none w-60 m-auto text-center placeholder:text-center' type="text" defaultValue={updatedetails.Location} placeholder='location' {...register("location", { required: true })} />
          {errors.location && <span className='text-red-500'>Enter the location</span>}
          <input className='border-b-2 p-2 border-b-green-500 focus:outline-none w-60 m-auto text-center placeholder:text-center' type="text" defaultValue={updatedetails.Role} placeholder='role' {...register("role", { required: true })} />
          {errors.role && <span className='text-red-500'>Enter the role</span>}

          <select defaultValue={updatedetails.Mode} className='border-b-2 p-2 border-b-green-500 text-gray-500 focus:outline-none w-60 m-auto' {...register("mode", { required: true })}>
            <option className='text-center' value="">
              mode
            </option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
          {errors.mode && <span className='text-red-500'>Enter the mode of working</span>}
          <input className='border-b-2 p-2 border-b-green-500 focus:outline-none w-60 m-auto text-center placeholder:text-center' type="text" defaultValue={updatedetails.Salary} placeholder='salary' {...register("salary", { required: true })} />
          {errors.salary && <span className='text-red-500'>Enter the salary</span>}
          <select defaultValue={updatedetails.Status} className='border-b-2 p-2 border-b-green-500 text-gray-500 focus:outline-none w-60 m-auto' {...register("status", { required: true })}>
            <option className='text-center' value="">
              status
            </option>
            <option value="Applied">Applied</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.status && <span className='text-red-500'>Enter the status</span>}
          <input disabled={isSubmitting} type="submit" value="Update" className='mt-10 m-auto block cursor-pointer transition duration-300 hover:scale-110 bg-green-500 w-30 text-white font-bold p-1 rounded-full hover:bg-green-800' />
      </form>
      {isSubmitting && <p className='text-red-500'>Updating....</p> }
    </div>
  )
}

export default update
