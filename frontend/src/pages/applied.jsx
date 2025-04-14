import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import {useForm} from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import Update from '../components/update';
import { useDispatch, useSelector } from 'react-redux';
import { Changechange } from '../features/changeSlice';

const applied = () => {
    const [job_list, setjob_list] = useState([])//for displaying job list
    const [inputdisplay, setInputdisplay] = useState(false)//toggles the input form hidden or display
    const [update, setUpdate] = useState(false)//toggle display for update component
    const [updatedetails, setUpdatedetails] = useState([])//send data to update
    const changeeffect=useSelector((state)=>state.change.value)//to run useeffect if anything updates or deletes in database
    const dispatch=useDispatch()

    useEffect(() => {
      getlist()
      
    }, [changeeffect])
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors,isSubmitting },
      } = useForm()

      const getlist=async () => {
        try {
          const job_response=await fetch("http://localhost:5000/api/jobtracker/job_list",{
            method:"POST",
            credentials:"include",
          })
          const list=await job_response.json()
          if(job_response.ok){
            setjob_list(list.joblist)
          }
        } catch (error) {
          console.log("Error occured in getlist function",error);
        }
      }

      const onSubmit = async(data) => {
        try {
          const response=await fetch("http://localhost:5000/api/jobtracker/enter_jobs_info",{
            method:"POST",
            headers:{"content-type": "application/json"},
            credentials:"include",
            body: JSON.stringify(data)
          })
          if(response.ok){
            toast.success("Successfully added the fields")
            getlist()
          }
          setInputdisplay(!inputdisplay)
          reset()
        } catch (error) {
          console.log("Error occured in onsubmit function",error)
        }
      }

      const changeadddisplay=()=>{
        setInputdisplay(!inputdisplay)
        reset()
        
      }

      const displayandupdate=(items) => {
        setUpdate(!update)
        setUpdatedetails(items)
      }

      const handledelete=async(id)=>{
        try {
          const response=await fetch("http://localhost:5000/api/jobtracker/job_delete",{
            method:"DELETE",
            headers:{"content-type":"application/json"},
            credentials:"include",
            body:JSON.stringify({id}),
          })
          const res=await response.json()
          if(!response.ok){
            return toast.error(res.message)
          }
          dispatch(Changechange())
          toast.success(res.message)
        } catch (error) {
          console.log("Error occured in handledelete",error);
        }
      }

      const handledeleteall=async () => {
        try {
          const response=await fetch("http://localhost:5000/api/jobtracker/deleteall",{
            method:"DELETE",
            credentials:"include",
          })
          const res=await response.json()
          if(!response.ok){
            return toast.error(res.message)
          }
          toast.success(res.message)
          dispatch(Changechange())
        } catch (error) {
          console.log("Error occured in handledeleteall",error);
        }
      }
      
  return (
    <div>
      <Navbar />
      {update && <Update updatedetails={updatedetails} setUpdate={setUpdate} updatestate={update}/> }
        {job_list.length!==0 && <table className='border-2 border-gray-300 text-center m-auto mt-10'>
          <tbody>
          <tr className=''>
            <th className='p-3'>Company name</th>
            <th className='p-3'>Location</th>
            <th className='p-3'>Role</th>
            <th className='p-3'>Mode</th>
            <th className='p-3'>Salary</th>
            <th className='p-3'>Status</th>
          </tr>
        {job_list.map((items) => (
          <tr className='even:bg-[#dddddd]' key={items._id}>
            <td className='p-3 w-47 ml-10'>{items.Company_name}</td>
            <td className='p-3 w-47'>{items.Location}</td>
            <td className='p-3 w-47'>{items.Role}</td>
            <td className={items.Mode === 'Remote' && 'p-3 w-47 bg-sky-400' || items.Mode === 'Hybrid' && 'w-47 p-3 bg-indigo-400' || items.Mode === 'Onsite' && 'w-47 p-3 bg-rose-400'}>{items.Mode}</td>
            <td className='w-47 p-3'>{items.Salary}</td>
            <td className={items.Status === 'Applied' && 'p-3 w-47 bg-amber-500' || items.Status === 'Selected' && 'w-47 p-3 bg-emerald-500' || items.Status === 'Rejected' && 'w-47 p-3 bg-red-500'}>{items.Status}</td>
            <td className='p-1'><span onClick={()=>handledelete(items._id)} className='cursor-pointer hover:bg-green-500 hover:scale-110'><AiFillDelete /></span> <span onClick={()=>displayandupdate(items)} className='cursor-pointer hover:bg-green-500 hover:scale-110'><RiPencilFill /></span></td>
          </tr>
          
        ))}
          </tbody>
        </table>}


        <button onClick={changeadddisplay} className='block ml-130 mt-10 p-2 w-35 rounded-full bg-green-500 text-white font-bold transition duration-300 hover:bg-green-800 hover:scale-110 cursor-pointer'>ADD</button>
        {job_list.length!==0 && <button onClick={handledeleteall} className='ml-127 mt-4 cursor-pointer transition duration-300 hover:bg-red-800 hover:scale-110 bg-red-600 w-40 rounded-full text-white font-bold p-2'>DELETE ALL</button>}
        
        {inputdisplay && <section className='absolute top-20 bg-white left-100 border-2 border-green-500'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid p-15 '>
          <input className='border-b-2 p-2 border-b-green-500 focus:outline-none w-60 m-auto text-center placeholder:text-center' type="text" defaultValue="" placeholder='Company' {...register("Company_name", { required: true })} />
          {errors.Company_name && <span className='text-red-500'>Enter the Company name</span>}
          <input className='border-b-2 p-2 border-b-green-500 focus:outline-none w-60 m-auto text-center placeholder:text-center' type="text" defaultValue="" placeholder='location' {...register("location", { required: true })} />
          {errors.location && <span className='text-red-500'>Enter the location</span>}
          <input className='border-b-2 p-2 border-b-green-500 focus:outline-none w-60 m-auto text-center placeholder:text-center' type="text" defaultValue="" placeholder='role' {...register("role", { required: true })} />
          {errors.role && <span className='text-red-500'>Enter the role</span>}

          <select className='border-b-2 p-2 border-b-green-500 text-gray-500 focus:outline-none w-60 m-auto' {...register("mode", { required: true })}>
            <option className='text-center' value="">
              mode
            </option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
          {errors.mode && <span className='text-red-500'>Enter the mode of working</span>}
          <input className='border-b-2 p-2 border-b-green-500 focus:outline-none w-60 m-auto text-center placeholder:text-center' type="text" defaultValue="" placeholder='salary' {...register("salary", { required: true })} />
          {errors.salary && <span className='text-red-500'>Enter the salary</span>}
          <select className='border-b-2 p-2 border-b-green-500 text-gray-500 focus:outline-none w-60 m-auto' {...register("status", { required: true })}>
            <option className='text-center' value="">
              status
            </option>
            <option value="Applied">Applied</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.status && <span className='text-red-500'>Enter the status</span>}
          <input disabled={isSubmitting} type="submit" value="submit" className='mt-10 m-auto block cursor-pointer transition duration-300 hover:scale-110 bg-green-500 w-30 text-white font-bold p-1 rounded-full hover:bg-green-800' />
        </form>
        </section>}
        <Toaster position='top-center' reverseOrder={false} />
        {isSubmitting && <p className='text-red-500 text-center'>Submitting...</p> }
    </div>
  )
}

export default applied
