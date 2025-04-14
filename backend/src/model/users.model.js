import mongoose from "mongoose";

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        length:8,
    },
})

export const user=mongoose.model("user",userschema)