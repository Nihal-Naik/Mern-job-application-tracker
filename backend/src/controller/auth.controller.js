import { user } from '../model/users.model.js'
import bcrypt from 'bcrypt'
import { generatetoken } from '../lib/token.lib.js'

export const signup=async(req,res)=>{
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(400).json({ message: "All the fields are required" })

        const emailexist = await user.findOne({ email })
        if (emailexist) return res.status(400).json({ message: "Email exists" })

        const passlen = password.length
        if (passlen < 8) return res.status(400).json({ message: "Password should be atleast 8 characters long" })

        const salt = 10
        const hashedpassword = await bcrypt.hash(password, salt)

        const newuser = new user({ name, email, password: hashedpassword })
        await newuser.save()
        res.status(200).json({ message: "New user created successfully" })
    } catch (error) {
        console.log("User controller error ",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export const login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const checkemail=await user.findOne({email})
        if (!checkemail) return res.status(400).json({message:"Invalid credentails"})
        
        const checkpass=await bcrypt.compare(password,checkemail.password)
        if (!checkpass) return res.status(400).json({message:"Invalid credentials"})

        generatetoken(checkemail._id,res)
        res.status(200).json({message:"Login successfull"})
    } catch (error) {
        console.log("login controller error ",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export const logout=async(req,res)=>{
    try {
        res.cookie("job","",{
            maxAge:0
        })
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Logout controller error ",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const checkauth=(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkauth controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}