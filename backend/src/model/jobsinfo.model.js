import mongoose from "mongoose";

const jobinfoschema=mongoose.Schema({
    useremail:{
        type:String,
    },
    Company_name:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
        required:true,
    },
    Location:{
        type:String,
        required:true,
    },
    Mode:{
        type:String,
        required:true,
    },
    Salary:{
        type:String,
        required:true,
    },
    Status:{
        type:String,
        required:true,
    },
},{timestamps:true})

export const job_info=mongoose.model("Job_info",jobinfoschema)