import { job_info } from "../model/jobsinfo.model.js"

export const getjob=async (req,res) => {
    const useremail=req.user.email
    
    try {
        const joblist=await job_info.find({useremail})
        if(!joblist) return res.status(400).json({message:"error in fetching list"})
        
        res.status(200).json({message:"List successfully retrieved",joblist:joblist})
    } catch (error) {
        console.log("error in getjob controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const jobinfo=async (req,res) => {
    const {Company_name,location,mode,role,salary,status}=req.body
    const useremail=req.user.email

    
    try {
        if(!Company_name||!salary||!location||!mode||!role||!status)
            return res.status(400).json({message:"Enter all the fields"})
        
        const newjob=new job_info({useremail,Company_name,Location:location,Salary:salary,Role:role,Mode:mode,Status:status})
        await newjob.save()
        res.status(200).json({message:"New job entry created successfully"})
    } catch (error) {
        console.log("error in jobinfo controller",error);
        res.status(500).json({message:"Internal server error"})
    }
    
}

export const updatejob=async(req,res)=>{
    const item=req.body
    
    try {
        const finditem=await job_info.findOne({_id:item._id})
        if(!finditem) return res.status(400).json({message:"Item not found"})
        
        const updateitem=await job_info.findOneAndUpdate({_id:item._id},{Company_name:item.name,Location:item.location,Salary:item.salary,Role:item.role,Mode:item.mode,Status:item.status})
        if(!updateitem) return res.status(400).json({message:"Error in updating item"})

        res.status(200).json({message:"Item updated successfully"})
    } catch (error) {
        console.log("error in update controller",error);
        res.status(500).json({mesaage:"Internal server error"})
    }
}

export const deletejob=async (req,res) => {
    const {id}=req.body
    // console.log(id);
    
    try {
        const finditem=await job_info.findOne({_id:id})
        if(!finditem) return res.status(400).json({message:"item not found"})
        
        const deleteitem=await job_info.findByIdAndDelete(id)
        if(!deleteitem) return res.status(400).json({message:"Item not deleted"})
        
        res.status(200).json({message:"Item deleted successfully"})
    } catch (error) {
        console.log("error in deletejob controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const deleteall=async (req,res) => {
    const useremail=req.user.email
    try {
        const itemexists=await job_info.find({useremail})
        if(!itemexists) return res.status(400).json({message:"There are no items"})
        
        const deleteAll=await job_info.deleteMany({useremail})
        if(!deleteAll) return res.status(400).json({mesaage:"Items not deleted"})
        
        res.status(200).json({message:"All items deleted"})
    } catch (error) {
        console.log("error in deleteall controller",error);
        res.status(500).json({mesaage:"Internal server error"})
    }
}