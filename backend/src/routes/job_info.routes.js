import express from 'express'
import { deleteall, deletejob, getjob, jobinfo, updatejob } from '../controller/jobinfo.controller.js'
import { protectedroute } from '../middleware/protected.middleware.js'

const router=express.Router()

router.post("/enter_jobs_info",protectedroute,jobinfo)
router.post("/job_list",protectedroute,getjob)
router.put("/job_update",protectedroute,updatejob)
router.delete("/job_delete",protectedroute,deletejob)
router.delete("/deleteall",protectedroute,deleteall)

export default router