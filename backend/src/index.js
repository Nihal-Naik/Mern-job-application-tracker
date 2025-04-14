import express from 'express'
import dotenv from 'dotenv'
import authrouter from './routes/auth.routes.js'
import { mongo } from './lib/db.lib.js'
import cookieparser from 'cookie-parser'
import jobrouter from './routes/job_info.routes.js'
import cors from 'cors'

dotenv.config()
const app=express()
const port=process.env.PORT

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use('/api/user',authrouter)

app.use('/api/jobtracker',jobrouter)


app.listen(port,()=>{
    console.log("Server started at port : ",port);
    mongo()
})