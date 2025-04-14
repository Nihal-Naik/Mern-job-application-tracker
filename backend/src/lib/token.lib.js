import jwt from 'jsonwebtoken'

export const generatetoken=(userid,res)=>{
    const token=jwt.sign({userid},process.env.SECRET,{expiresIn:"7d"})

    res.cookie("job",token,{
        maxAge:604800000,
        httpOnly:true,
        sameSite:"strict",
        secure:false,
    })    
}