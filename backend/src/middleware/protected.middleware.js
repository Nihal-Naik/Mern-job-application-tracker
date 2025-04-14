import jwt from 'jsonwebtoken'
import { user } from '../model/users.model.js'

export const protectedroute=async (req,res,next) => {
    try {
        const cookie=req.cookies.job
        
        if(!cookie) return res.status(400).json({message:"Unauthorized"})
        
        const verifycookie=jwt.verify(cookie,process.env.SECRET)
        if(!verifycookie) return res.status(400).json({
            message:"Unauthorised"
        })
        const checkuser=await user.findOne({_id:verifycookie.userid}).select("-password")
        if(!checkuser) return res.status(404).json({message:"User not found"})
        req.user=checkuser   
        next()
    } catch (error) {
        console.log("error in protected controller",error);
        res.status(500).json({messgae:"Internal server error"})
    }
}